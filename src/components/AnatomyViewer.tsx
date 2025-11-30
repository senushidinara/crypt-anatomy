import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Heart, Skull, Activity, Eye, Zap } from "lucide-react";
import skeletonPointer from "@/assets/skeleton-pointer.png";

interface AnatomyPart {
  id: string;
  name: string;
  description: string;
  icon: any;
  spookyFact: string;
}

const anatomyParts: AnatomyPart[] = [
  {
    id: 'brain',
    name: 'The Haunted Brain',
    description: 'The cerebrum, with its ghostly folds and mysterious neural pathways, controls consciousness and cognition. In Dr. Cadaverson\'s time, the brain was believed to house the soul...',
    icon: Brain,
    spookyFact: '*whispers* Did you know the brain can survive 6 minutes after the heart stops? A liminal space between life and death...'
  },
  {
    id: 'heart',
    name: 'The Cursed Heart',
    description: 'This tireless organ, beating roughly 100,000 times per day in the living, creates a rhythm that echoes through eternity. Four chambers pump the crimson rivers of life...',
    icon: Heart,
    spookyFact: '*chains rattle* The heart has its own electrical system and can continue beating even outside the body. Quite unsettling, isn\'t it?'
  },
  {
    id: 'skeleton',
    name: 'The Bone Framework',
    description: 'The 206 bones of the adult skeleton form the architecture of the mortal form. These calcium structures endure long after flesh has returned to dust...',
    icon: Skull,
    spookyFact: '*eerie creaking* Bones are constantly remodeling themselves. In a sense, we all possess our very own haunted framework...'
  },
  {
    id: 'nerves',
    name: 'The Electric Web',
    description: 'The nervous system sends electrical impulses at speeds up to 270 mph, connecting brain to body in a supernatural network of sensation and control...',
    icon: Zap,
    spookyFact: '*ghostly spark* These electrical signals continue briefly after death, causing the infamous post-mortem twitches that terrified my colleagues...'
  }
];

const AnatomyViewer = () => {
  const [selectedPart, setSelectedPart] = useState<AnatomyPart>(anatomyParts[0]);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-gothic font-bold text-toxic-green text-toxic mb-3">
            The Anatomy Collection
          </h2>
          <p className="text-muted-foreground font-serif text-lg">
            *Dusty anatomical specimens glow with eerie light...*
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Viewer Area */}
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-toxic-green/30 shadow-[0_0_30px_rgba(42,157,143,0.2)] animate-scale-in">
            <div className="aspect-square bg-muted/30 rounded-lg border border-border/50 flex items-center justify-center relative overflow-hidden group">
              {/* Placeholder for 3D Model */}
              <div className="absolute inset-0 bg-gradient-to-br from-blood-red/5 via-transparent to-toxic-green/5 animate-flicker" />
              
              <div 
                className="relative z-10 transition-transform duration-700 ease-in-out"
                style={{
                  transform: isHovering ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <img 
                  src={skeletonPointer}
                  alt="Anatomical Skeleton"
                  className="w-full max-w-md mx-auto glow-pulse cursor-pointer"
                />
              </div>

              {/* Floating Particles Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-toxic-green rounded-full animate-ghost-float opacity-30"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 4}s`
                    }}
                  />
                ))}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-xs text-muted-foreground font-serif italic">
                  *Click and hover to explore the specimen...*
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              <Button variant="crypt" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                Rotate View
              </Button>
              <Button variant="crypt" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Layer View
              </Button>
              <Button variant="crypt" size="sm">
                <Zap className="w-4 h-4 mr-2" />
                Animate
              </Button>
            </div>
          </Card>

          {/* Information Panel */}
          <div className="space-y-6">
            <Tabs defaultValue={selectedPart.id} className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 bg-muted/30 p-2">
                {anatomyParts.map((part) => (
                  <TabsTrigger
                    key={part.id}
                    value={part.id}
                    onClick={() => setSelectedPart(part)}
                    className="data-[state=active]:bg-toxic-green data-[state=active]:text-coffin-black transition-all duration-300"
                  >
                    <part.icon className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">{part.name.split(' ')[1]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {anatomyParts.map((part) => (
                <TabsContent key={part.id} value={part.id} className="animate-fade-in">
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="flex items-start gap-4 mb-4">
                      <part.icon className="w-8 h-8 text-toxic-green animate-glow-pulse flex-shrink-0" />
                      <div>
                        <h3 className="text-2xl font-gothic font-bold text-foreground mb-2">
                          {part.name}
                        </h3>
                        <p className="text-muted-foreground font-serif leading-relaxed">
                          {part.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blood-red/10 border border-blood-red/20 rounded-lg">
                      <p className="text-sm text-foreground font-serif italic leading-relaxed">
                        {part.spookyFact}
                      </p>
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Button variant="ghostly" size="sm" className="flex-1">
                        <Brain className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                      <Button variant="crypt" size="sm" className="flex-1">
                        <Activity className="w-4 h-4 mr-2" />
                        Test Knowledge
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Additional Info Card */}
            <Card className="p-6 bg-card/30 backdrop-blur-sm border-blood-red/20 animate-fade-in">
              <h4 className="font-gothic font-bold text-lg text-blood-red mb-3 flex items-center gap-2">
                <Skull className="w-5 h-5" />
                Dr. Cadaverson's Notes
              </h4>
              <p className="text-sm text-muted-foreground font-serif italic leading-relaxed">
                "These anatomical specimens have been preserved since my mortal days. 
                Each structure tells a story of biological marvel and medical mystery. 
                Click on different regions to reveal their secrets... 
                *the specimens seem to pulse with an otherworldly energy*"
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnatomyViewer;
