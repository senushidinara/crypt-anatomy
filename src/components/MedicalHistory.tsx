import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookOpen, Scroll, Skull, Ghost, Castle, Flame, Moon, Cross, Feather, Hourglass } from "lucide-react";
import { toast } from "sonner";
import medicalHistory from "@/assets/medical-history.jpg";

const activities = [
  { id: "plague", title: "The Black Death", icon: Skull, description: "Investigate the bubonic plague outbreak across medieval Europe" },
  { id: "cholera", title: "John Snow's Mystery", icon: Ghost, description: "Solve the Broad Street cholera outbreak in Victorian London" },
  { id: "smallpox", title: "Variolation Ventures", icon: Feather, description: "Study Edward Jenner's revolutionary smallpox vaccination" },
  { id: "anesthesia", title: "Ether Dome Discovery", icon: Moon, description: "Witness the first public demonstration of anesthesia" },
  { id: "germ", title: "Germ Theory Revolution", icon: Flame, description: "Explore Pasteur's groundbreaking microbiology work" },
  { id: "antiseptic", title: "Lister's Antiseptic Era", icon: Cross, description: "Learn about the introduction of antiseptic surgery" },
  { id: "radium", title: "Madame Curie's Curse", icon: Castle, description: "Discover radioactivity and its medical applications" },
  { id: "penicillin", title: "Fleming's Mold Mystery", icon: BookOpen, description: "Uncover the accidental discovery of penicillin" },
  { id: "dna", title: "Double Helix Haunting", icon: Scroll, description: "Decode the structure of DNA with Watson and Crick" },
  { id: "transplant", title: "First Heart Transplant", icon: Hourglass, description: "Experience the world's first human heart transplant" }
];

const MedicalHistory = () => {
  const [activeActivity, setActiveActivity] = useState(activities[0].id);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [discoveredFacts, setDiscoveredFacts] = useState<string[]>([]);

  const handleActivityComplete = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
      toast.success("📜 Historical case solved!", {
        description: "Time traveler's wisdom gained... Dr. Cadaverson nods approvingly."
      });
    }
  };

  const currentActivity = activities.find(a => a.id === activeActivity);

  if (!currentActivity) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scroll className="w-12 h-12 text-foreground animate-glow-pulse" />
            <h1 className="text-4xl font-gothic font-bold text-foreground">
              Medical History Archives
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-serif">
            Journey through time to witness the greatest moments in medical history
          </p>
        </div>

        {/* Activity Tabs */}
        <Tabs value={activeActivity} onValueChange={setActiveActivity} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-coffin-black/40 p-2">
            {activities.map((activity) => (
              <TabsTrigger 
                key={activity.id} 
                value={activity.id}
                className="data-[state=active]:bg-foreground/20 data-[state=active]:text-foreground relative"
              >
                <activity.icon className="w-4 h-4" />
                {completedActivities.includes(activity.id) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-toxic-green rounded-full animate-pulse" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {activities.map((activity) => (
            <TabsContent key={activity.id} value={activity.id} className="mt-6">
              <Card className="bg-coffin-black/60 border-foreground/30 p-6 animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <activity.icon className="w-8 h-8 text-foreground animate-glow-pulse" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-gothic font-bold text-foreground mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-muted-foreground font-serif">
                      {activity.description}
                    </p>
                  </div>
                </div>

                {/* Activity Content */}
                <div className="space-y-4">
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-gothic text-lg text-foreground">Historical Archive</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Scroll className="w-4 h-4" />
                        <span>Page {currentPage} of 5</span>
                      </div>
                    </div>
                    
                    <div className="aspect-video bg-coffin-black/80 rounded-lg overflow-hidden border border-toxic-green/20 mb-4 relative group">
                      <img 
                        src={medicalHistory} 
                        alt="Medical history manuscript"
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coffin-black via-transparent to-transparent" />
                      
                      {/* Interactive hotspots */}
                      <div className="absolute inset-0">
                        <button
                          className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full border-2 border-toxic-green/50 hover:border-toxic-green hover:bg-toxic-green/20 transition-all animate-glow-pulse"
                          onClick={() => {
                            setDiscoveredFacts([...discoveredFacts, "Ancient surgical technique discovered"]);
                            toast.success("📚 Knowledge unlocked!", { description: "Ancient surgical technique revealed..." });
                          }}
                        />
                        <button
                          className="absolute top-1/2 right-1/3 w-12 h-12 rounded-full border-2 border-toxic-green/50 hover:border-toxic-green hover:bg-toxic-green/20 transition-all animate-glow-pulse"
                          onClick={() => {
                            setDiscoveredFacts([...discoveredFacts, "Historical case study documented"]);
                            toast.success("🔍 Discovery made!", { description: "Historical case study found..." });
                          }}
                        />
                      </div>

                      {discoveredFacts.length > 0 && (
                        <div className="absolute top-4 right-4 bg-coffin-black/90 border border-toxic-green/50 rounded-lg p-2 animate-fade-in">
                          <div className="text-toxic-green text-xs font-gothic">
                            {discoveredFacts.length} discoveries
                          </div>
                        </div>
                      )}
                    </div>

                    {discoveredFacts.length > 0 && (
                      <div className="bg-coffin-black/60 border border-toxic-green/30 rounded-lg p-3 mb-4 animate-fade-in">
                        <p className="text-toxic-green font-gothic mb-2 text-sm">Discovered Knowledge:</p>
                        <ul className="space-y-1">
                          {discoveredFacts.map((fact, idx) => (
                            <li key={idx} className="text-xs text-muted-foreground font-serif flex items-start gap-2">
                              <Feather className="w-3 h-3 text-toxic-green mt-0.5 flex-shrink-0" />
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground font-serif mb-4">
                      Delve into the dusty archives of medical history. Click on highlighted areas to uncover hidden knowledge.
                      Navigate through pages to discover the secrets of {activity.title.toLowerCase()}.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="haunted" 
                        className="w-full"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage(currentPage - 1);
                          toast.info("📖 Turning page back...", { description: "Revisiting ancient knowledge..." });
                        }}
                      >
                        Previous Page
                      </Button>
                      <Button 
                        variant="haunted" 
                        className="w-full"
                        disabled={currentPage === 5}
                        onClick={() => {
                          setCurrentPage(currentPage + 1);
                          toast.info("📖 Turning page...", { description: "New secrets await..." });
                        }}
                      >
                        Next Page
                      </Button>
                      <Button 
                        variant="haunted" 
                        className="w-full"
                        onClick={() => {
                          const newFact = `Historical insight from page ${currentPage}`;
                          setDiscoveredFacts([...discoveredFacts, newFact]);
                          toast.success("📝 Notes taken", { description: "Knowledge recorded..." });
                        }}
                      >
                        Take Notes
                      </Button>
                      <Button 
                        variant="crypt" 
                        className="w-full"
                        onClick={() => {
                          handleActivityComplete(activity.id);
                          setCurrentPage(1);
                          setDiscoveredFacts([]);
                        }}
                      >
                        Archive Complete
                      </Button>
                    </div>
                  </div>

                  {/* Learning Points */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-2 text-foreground">Legacy & Impact</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground font-serif">
                      <li>• Understand the breakthrough that changed medical practice</li>
                      <li>• Appreciate the courage of medical pioneers</li>
                      <li>• Connect historical discoveries to modern applications</li>
                      <li>• Learn from both successes and failures of the past</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Progress */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground font-serif">
            Completed: {completedActivities.length} / {activities.length} historical cases
          </p>
          <div className="w-full max-w-md mx-auto mt-2 h-2 bg-coffin-black/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-foreground animate-glow-pulse transition-all duration-500"
              style={{ width: `${(completedActivities.length / activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
