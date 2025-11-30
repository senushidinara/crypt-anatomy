import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollText, Ghost, Skull, BookOpen, Castle, Telescope, Flame, Moon, Sparkles, Clock } from "lucide-react";
import { toast } from "sonner";

const historicalCases = [
  { id: "plague", title: "The Black Death Chronicles", icon: Skull, era: "1347-1353", description: "Investigate the bubonic plague outbreak across medieval Europe" },
  { id: "cholera", title: "John Snow's Mystery", icon: Ghost, era: "1854", description: "Solve the Broad Street cholera outbreak in Victorian London" },
  { id: "smallpox", title: "Variolation Ventures", icon: Sparkles, era: "1796", description: "Study Edward Jenner's revolutionary smallpox vaccination" },
  { id: "anesthesia", title: "Ether Dome Discovery", icon: Moon, era: "1846", description: "Witness the first public demonstration of anesthesia" },
  { id: "germ", title: "Germ Theory Revolution", icon: Telescope, era: "1860s", description: "Explore Pasteur's groundbreaking microbiology work" },
  { id: "antiseptic", title: "Lister's Antiseptic Era", icon: Flame, era: "1867", description: "Learn about the introduction of antiseptic surgery" },
  { id: "radium", title: "Madame Curie's Curse", icon: Castle, era: "1898", description: "Discover radioactivity and its medical applications" },
  { id: "penicillin", title: "Fleming's Mold Mystery", icon: BookOpen, era: "1928", description: "Uncover the accidental discovery of penicillin" },
  { id: "dna", title: "Double Helix Haunting", icon: ScrollText, era: "1953", description: "Decode the structure of DNA with Watson and Crick" },
  { id: "transplant", title: "First Heart Transplant", icon: Clock, era: "1967", description: "Experience the world's first human heart transplant" }
];

const MedicalHistory = () => {
  const [activeCase, setActiveCase] = useState(historicalCases[0].id);
  const [completedCases, setCompletedCases] = useState<string[]>([]);

  const handleCaseComplete = (caseId: string) => {
    if (!completedCases.includes(caseId)) {
      setCompletedCases([...completedCases, caseId]);
      toast.success("📜 Historical case solved! Time traveler's wisdom gained...", {
        description: "Dr. Cadaverson nods approvingly from his portrait."
      });
    }
  };

  const currentCase = historicalCases.find(c => c.id === activeCase);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScrollText className="w-12 h-12 text-foreground animate-glow-pulse" />
            <h1 className="text-4xl font-gothic font-bold text-foreground">
              Medical History Archives
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-serif">
            Journey through time to witness the greatest moments in medical history
          </p>
        </div>

        {/* Historical Cases Tabs */}
        <Tabs value={activeCase} onValueChange={setActiveCase} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-coffin-black/40 p-2">
            {historicalCases.map((case_) => (
              <TabsTrigger 
                key={case_.id} 
                value={case_.id}
                className="data-[state=active]:bg-foreground/20 data-[state=active]:text-foreground relative"
              >
                <case_.icon className="w-4 h-4" />
                {completedCases.includes(case_.id) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-toxic-green rounded-full animate-pulse" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {historicalCases.map((case_) => (
            <TabsContent key={case_.id} value={case_.id} className="mt-6">
              <Card className="bg-coffin-black/60 border-foreground/30 p-6 animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <case_.icon className="w-8 h-8 text-foreground animate-glow-pulse" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-gothic font-bold text-foreground">
                        {case_.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-blood-red/20 text-blood-red border border-blood-red/30">
                        {case_.era}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-serif">
                      {case_.description}
                    </p>
                  </div>
                </div>

                {/* Historical Case Content */}
                <div className="space-y-4">
                  {/* Time Portal */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-3 text-foreground">Historical Documentation</h4>
                    <div className="aspect-video bg-coffin-black/80 rounded-lg flex items-center justify-center border border-foreground/20 mb-4 overflow-hidden relative">
                      <case_.icon className="w-24 h-24 text-foreground/30 animate-glow-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-toxic-green/5 to-transparent animate-pulse" />
                    </div>
                    <p className="text-sm text-muted-foreground font-serif mb-4">
                      Step through the time portal and immerse yourself in this pivotal moment in medical history. 
                      Study the original documents, witness the breakthrough discoveries, and understand the context 
                      that shaped modern medicine.
                    </p>
                    
                    {/* Interactive Elements */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <Button 
                        variant="haunted" 
                        className="w-full"
                        onClick={() => toast.info("📖 Reading historical documents...", { description: "The aged papers reveal their secrets..." })}
                      >
                        Read Documents
                      </Button>
                      <Button 
                        variant="haunted" 
                        className="w-full"
                        onClick={() => toast.info("🔬 Examining evidence...", { description: "Scientific methods of the era unfold..." })}
                      >
                        Examine Evidence
                      </Button>
                      <Button 
                        variant="haunted" 
                        className="w-full"
                        onClick={() => toast.info("👥 Meeting historical figures...", { description: "The pioneers of medicine speak..." })}
                      >
                        Meet Pioneers
                      </Button>
                      <Button 
                        variant="haunted" 
                        className="w-full"
                        onClick={() => toast.info("⚗️ Recreating experiments...", { description: "History repeats itself in your hands..." })}
                      >
                        Recreate Experiment
                      </Button>
                    </div>

                    {/* Historical Context */}
                    <div className="bg-coffin-black/60 rounded-lg p-3 border border-foreground/20 mb-4">
                      <h5 className="font-gothic text-sm text-toxic-green mb-2">Historical Context</h5>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>• Medical practices and beliefs of the era</p>
                        <p>• Societal impact and public reaction</p>
                        <p>• Scientific methods and technology available</p>
                        <p>• Long-term influence on modern medicine</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="haunted" 
                        className="flex-1"
                        onClick={() => toast.info("📝 Taking notes...", { description: "Documenting discoveries in your journal..." })}
                      >
                        Take Notes
                      </Button>
                      <Button 
                        variant="crypt" 
                        className="flex-1"
                        onClick={() => handleCaseComplete(case_.id)}
                      >
                        Complete Study
                      </Button>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-2 text-foreground">Legacy & Impact</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground font-serif">
                      <li>• Understand the breakthrough that changed medical practice</li>
                      <li>• Appreciate the courage of medical pioneers</li>
                      <li>• Connect historical discoveries to modern applications</li>
                      <li>• Learn from both successes and failures of the past</li>
                    </ul>
                  </div>

                  {/* Timeline */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-2 text-foreground">Timeline of Events</h4>
                    <div className="space-y-3">
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="flex gap-3 items-start">
                          <div className="w-8 h-8 rounded-full bg-toxic-green/20 border border-toxic-green flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-toxic-green font-gothic">{step}</span>
                          </div>
                          <div className="text-sm">
                            <p className="text-foreground font-gothic mb-1">Key Event {step}</p>
                            <p className="text-muted-foreground text-xs">Significant milestone in the historical case</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Progress */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground font-serif">
            Historical Cases Completed: {completedCases.length} / {historicalCases.length}
          </p>
          <div className="w-full max-w-md mx-auto mt-2 h-2 bg-coffin-black/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground animate-glow-pulse transition-all duration-500"
              style={{ width: `${(completedCases.length / historicalCases.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
