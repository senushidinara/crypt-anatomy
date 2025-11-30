import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Ghost, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import drCadaverson from "@/assets/dr-cadaverson.png";

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

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // TODO: Integrate with Lovable AI
      // For now, simulating a spooky response
      setTimeout(() => {
        const responses = [
          "*The ghost materializes with a knowing smile...* \n\nAh, an excellent question about the brachial plexus! This network of nerves, dear student, emerges from the spinal cord like ethereal tendrils... Let me explain its haunting complexity...",
          "*Skeletal fingers point to an anatomical chart...* \n\nThe cardiovascular system, much like the rivers of the underworld, flows through channels both great and small. The heart, that cursed organ that ceased beating in my chest so long ago...",
          "*Cobwebs shimmer as ancient knowledge awakens...* \n\nYour inquiry touches upon the very essence of what makes us mortal! The nervous system—ah, what a marvel of biological architecture...",
          "*A cold wind blows through the laboratory...* \n\nIntriguing question, mortal! In my decades of study, both in life and in death, I've found that understanding begins with observation..."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: randomResponse
        }]);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("The spirits are restless... Try again, mortal.");
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="bg-card/50 backdrop-blur-sm border-toxic-green/30 shadow-[0_0_30px_rgba(42,157,143,0.2)] animate-fade-in">
        {/* Header */}
        <div className="border-b border-border/50 p-6">
          <div className="flex items-center gap-4">
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
