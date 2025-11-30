import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skull, BookOpen, Brain, Ghost } from "lucide-react";
import labBg from "@/assets/haunted-lab-bg.jpg";
import drCadaverson from "@/assets/dr-cadaverson.png";

interface HeroSectionProps {
  onEnterLab: () => void;
}

const HeroSection = ({ onEnterLab }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={labBg} 
          alt="Haunted Laboratory" 
          className="w-full h-full object-cover opacity-30 animate-flicker"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src={drCadaverson} 
              alt="Dr. Cadaverson" 
              className="w-32 h-32 object-contain animate-ghost-float glow-pulse"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-gothic font-black mb-6 text-toxic-green text-toxic animate-flicker">
            CADAVER'S CRYPT
          </h1>
          
          <p className="text-xl md:text-2xl font-gothic text-blood-red mb-4 text-haunted">
            The Resurrected Anatomy Lab
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-serif leading-relaxed">
            You've been trapped in Dr. Cadaverson's abandoned anatomy laboratory. 
            The ghost of the former professor haunts these halls, and the only way to escape 
            is to prove your medical knowledge through his chilling challenges...
          </p>
        </div>

        {/* Story Card */}
        <Card className="max-w-3xl mx-auto p-8 mb-12 bg-card/50 backdrop-blur-sm border-toxic-green/30 shadow-[0_0_30px_rgba(42,157,143,0.2)] animate-scale-in">
          <div className="flex items-start gap-4 mb-6">
            <Ghost className="w-8 h-8 text-toxic-green animate-glow-pulse flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-gothic font-bold text-foreground mb-3">
                *The laboratory door slams shut behind you...*
              </h2>
              <p className="text-muted-foreground font-serif leading-relaxed mb-4">
                The air grows cold as ethereal whispers echo through the darkness. 
                Flickering gas lamps cast dancing shadows across dusty anatomical charts. 
                A ghostly figure materializes before you—Dr. Cadaverson, deceased since 1897, 
                yet still passionate about anatomy education.
              </p>
              <blockquote className="border-l-4 border-blood-red pl-4 italic text-foreground font-serif">
                "Welcome, mortal... *rattling chains* I see you've stumbled into my domain. 
                The only way out is to prove your knowledge of the human form. 
                Succeed in my trials, and freedom is yours. 
                Fail... and you may join me in eternal study."
              </blockquote>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="haunted" 
              size="xl" 
              onClick={onEnterLab}
              className="font-gothic font-bold"
            >
              <Skull className="w-5 h-5 mr-2" />
              Enter the Laboratory
            </Button>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-toxic-green/50 transition-all duration-500 haunted-hover">
            <div className="flex flex-col items-center text-center">
              <Ghost className="w-12 h-12 text-toxic-green mb-4 animate-glow-pulse" />
              <h3 className="text-xl font-gothic font-bold text-foreground mb-2">
                Ghostly AI Tutor
              </h3>
              <p className="text-muted-foreground font-serif text-sm">
                Converse with Dr. Cadaverson's spirit. Ask anatomical questions, 
                receive haunting explanations, and unlock the mysteries of the human body.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-blood-red/50 transition-all duration-500 haunted-hover">
            <div className="flex flex-col items-center text-center">
              <Brain className="w-12 h-12 text-blood-red mb-4 animate-heartbeat" />
              <h3 className="text-xl font-gothic font-bold text-foreground mb-2">
                Haunted Anatomy
              </h3>
              <p className="text-muted-foreground font-serif text-sm">
                Explore 3D anatomical models with supernatural effects. 
                Witness organs pulse with eerie life and bones rattle with knowledge.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/30 backdrop-blur-sm border-border/50 hover:border-toxic-green/50 transition-all duration-500 haunted-hover">
            <div className="flex flex-col items-center text-center">
              <BookOpen className="w-12 h-12 text-toxic-green mb-4 animate-glow-pulse" />
              <h3 className="text-xl font-gothic font-bold text-foreground mb-2">
                Tombstone Trials
              </h3>
              <p className="text-muted-foreground font-serif text-sm">
                Face Dr. Cadaverson's challenges in rapid-fire quiz modes. 
                Each correct answer brings you closer to escape... or does it?
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
