import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ghost, Send, Loader2, AlertCircle, Wifi } from "lucide-react";
import { toast } from "sonner";
import drCadaverson from "@/assets/dr-cadaverson.png";
import { isApiConfigured } from "@/lib/api-config";
import { getDemoResponse } from "@/lib/demo-responses";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "*Ghostly whispers echo through the laboratory...* \n\nWelcome, mortal... I am Dr. Cadaverson, trapped between worlds since my untimely demise in 1897. This cursed laboratory holds the secrets of anatomy, and I remain bound to teach those brave—or foolish—enough to seek knowledge.\n\nAsk me anything about the human form, and I shall share the mysteries of flesh and bone... *rattling chains*"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiAvailable] = useState(isApiConfigured());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      if (apiAvailable) {
        // Use real AI API
        await handleAiResponse(updatedMessages);
      } else {
        // Use demo responses
        await handleDemoResponse(userMessage);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("The spirits are restless... Try again, mortal.");
      setMessages(prev => prev.filter(m => m.role !== 'assistant' || m.content !== ''));
      setIsLoading(false);
    }
  };

  const handleAiResponse = async (updatedMessages: Message[]) => {
    let assistantContent = "";
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        toast.error("Too many spirits summoned at once! Please wait a moment...");
        return;
      }
      if (response.status === 402) {
        toast.error("The mystical energies are depleted. Please contact the crypt keeper.");
        return;
      }
      throw new Error("Failed to contact Dr. Cadaverson");
    }

    if (!response.body) throw new Error("No response from the spirit realm");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    // Add initial assistant message
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;

      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const newMessages = [...prev];
              const lastMessage = newMessages[newMessages.length - 1];
              if (lastMessage?.role === 'assistant') {
                lastMessage.content = assistantContent;
              }
              return newMessages;
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const handleDemoResponse = async (userMessage: Message) => {
    // Simulate slight delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    const assistantContent = getDemoResponse(userMessage.content);
    setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="bg-card/50 backdrop-blur-sm border-toxic-green/30 shadow-[0_0_30px_rgba(42,157,143,0.2)] animate-fade-in">
        {/* Header */}
        <div className="border-b border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 flex-1">
              <img
                src={drCadaverson}
                alt="Dr. Cadaverson"
                className="w-16 h-16 object-contain animate-ghost-float glow-pulse"
              />
              <div>
                <h2 className="text-2xl font-gothic font-bold text-toxic-green text-toxic">
                  Dr. Cadaverson's Chamber
                </h2>
                <p className="text-sm text-muted-foreground font-serif">
                  Ask the ghostly professor anything about anatomy...
                </p>
              </div>
            </div>

            {/* API Status Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif ${
              apiAvailable
                ? 'bg-toxic-green/10 text-toxic-green border border-toxic-green/30'
                : 'bg-blood-red/10 text-blood-red border border-blood-red/30'
            }`}>
              {apiAvailable ? (
                <>
                  <Wifi className="w-3 h-3" />
                  <span>AI Powered</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3" />
                  <span>Demo Mode</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-scale-in`}
              >
                {message.role === 'assistant' && (
                  <Ghost className="w-8 h-8 text-toxic-green animate-glow-pulse flex-shrink-0 mt-1" />
                )}
                
                <div 
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted border border-toxic-green/20'
                  }`}
                >
                  <p className="whitespace-pre-wrap font-serif leading-relaxed">
                    {message.content}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-blood-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-gothic text-sm font-bold">You</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 animate-scale-in">
                <Ghost className="w-8 h-8 text-toxic-green animate-glow-pulse flex-shrink-0 mt-1" />
                <div className="bg-muted p-4 rounded-lg border border-toxic-green/20">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-toxic-green" />
                    <p className="text-muted-foreground font-serif italic">
                      *The ghost is contemplating...*
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border/50 p-6">
          <div className="flex gap-2">
            <Input 
              placeholder="Ask Dr. Cadaverson about anatomy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              className="font-serif bg-background/50 border-border/50 focus:border-toxic-green transition-colors"
            />
            <Button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              variant="ghostly"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 font-serif text-center">
            *The spirits respond to your anatomical inquiries...*
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
