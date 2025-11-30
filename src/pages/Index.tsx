import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skull, FlaskConical, MessageSquare, Brain, BookOpen } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";
import AnatomyViewer from "@/components/AnatomyViewer";
import QuizSection from "@/components/QuizSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'chat' | 'anatomy' | 'quiz'>('home');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Atmospheric Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-coffin-black via-background to-coffin-black opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 animate-pulse"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(42, 157, 143, 0.3) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skull className="w-8 h-8 text-blood-red animate-glow-pulse" />
              <h1 className="text-2xl font-gothic font-bold text-toxic-green text-toxic">
                Cadaver's Crypt
              </h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('home')}
                className={activeSection === 'home' ? 'text-toxic-green' : ''}
              >
                <FlaskConical className="w-4 h-4 mr-2" />
                Lab
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('chat')}
                className={activeSection === 'chat' ? 'text-toxic-green' : ''}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Dr. Cadaverson
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('anatomy')}
                className={activeSection === 'anatomy' ? 'text-toxic-green' : ''}
              >
                <Brain className="w-4 h-4 mr-2" />
                Anatomy
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setActiveSection('quiz')}
                className={activeSection === 'quiz' ? 'text-toxic-green' : ''}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Trials
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {activeSection === 'home' && <HeroSection onEnterLab={() => setActiveSection('chat')} />}
        {activeSection === 'chat' && <ChatInterface />}
        {activeSection === 'anatomy' && <AnatomyViewer />}
        {activeSection === 'quiz' && <QuizSection />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm font-serif">
            Trapped in Dr. Cadaverson's anatomy lab since 1897... 
            <span className="text-blood-red ml-2 animate-flicker">Will you escape?</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
