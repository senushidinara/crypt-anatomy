import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Microscope, Skull, Heart, Droplet, Bone, Bug, Zap, Moon, Flame, Shield } from "lucide-react";
import { toast } from "sonner";
import pathologyImage from "@/assets/pathology-necrosis.jpg";

const activities = [
  { id: "necrosis", title: "Necrosis Nightmare", icon: Skull, description: "Identify different types of cell death in cursed tissues" },
  { id: "tumor", title: "Tumor Terror", icon: Heart, description: "Classify benign vs malignant growths from haunted specimens" },
  { id: "inflammation", title: "Inflammation Inferno", icon: Flame, description: "Diagnose acute vs chronic inflammatory patterns" },
  { id: "blood", title: "Blood Curse Analysis", icon: Droplet, description: "Identify blood cell disorders in vampire victims" },
  { id: "bone", title: "Bone Disease Detective", icon: Bone, description: "Diagnose skeletal pathologies in ancient remains" },
  { id: "infection", title: "Infection Investigation", icon: Bug, description: "Identify pathogens in zombie outbreak scenarios" },
  { id: "metabolic", title: "Metabolic Mysteries", icon: Zap, description: "Solve cases of metabolic disorders in werewolf transformations" },
  { id: "autoimmune", title: "Autoimmune Anomalies", icon: Shield, description: "Diagnose autoimmune conditions in cursed patients" },
  { id: "genetic", title: "Genetic Ghosts", icon: Moon, description: "Identify hereditary diseases in haunted family lines" },
  { id: "toxicology", title: "Toxicology Tales", icon: Microscope, description: "Analyze poison effects in suspicious deaths" }
];

const PathologyLab = () => {
  const [activeActivity, setActiveActivity] = useState(activities[0].id);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [analysisStage, setAnalysisStage] = useState<"specimen" | "microscope" | "diagnosis">("specimen");
  const [findings, setFindings] = useState<string[]>([]);

  const handleActivityComplete = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
      toast.success("🦴 Activity completed! Dr. Cadaverson is impressed...", {
        description: "Your pathology skills grow stronger in the darkness."
      });
    }
  };

  const currentActivity = activities.find(a => a.id === activeActivity);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Microscope className="w-12 h-12 text-toxic-green animate-glow-pulse" />
            <h1 className="text-4xl font-gothic font-bold text-toxic-green">
              Pathology Laboratory
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-serif">
            Investigate diseased tissues and cursed specimens in Dr. Cadaverson's pathology lab
          </p>
        </div>

        {/* Activity Tabs */}
        <Tabs value={activeActivity} onValueChange={setActiveActivity} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-coffin-black/40 p-2">
            {activities.map((activity) => (
              <TabsTrigger 
                key={activity.id} 
                value={activity.id}
                className="data-[state=active]:bg-toxic-green/20 data-[state=active]:text-toxic-green relative"
              >
                <activity.icon className="w-4 h-4" />
                {completedActivities.includes(activity.id) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blood-red rounded-full animate-pulse" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {activities.map((activity) => (
            <TabsContent key={activity.id} value={activity.id} className="mt-6">
              <Card className="bg-coffin-black/60 border-toxic-green/30 p-6 animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <activity.icon className="w-8 h-8 text-blood-red animate-heartbeat" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-gothic font-bold text-toxic-green mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-muted-foreground font-serif">
                      {activity.description}
                    </p>
                  </div>
                </div>

                {/* Activity Content */}
                <div className="space-y-4">
                  {/* Stage Indicator */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {(["specimen", "microscope", "diagnosis"] as const).map((stage, idx) => (
                      <div key={stage} className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          analysisStage === stage 
                            ? "border-toxic-green bg-toxic-green/20 text-toxic-green" 
                            : "border-border text-muted-foreground"
                        }`}>
                          {idx + 1}
                        </div>
                        <span className="text-sm font-gothic capitalize">{stage}</span>
                        {idx < 2 && <span className="text-muted-foreground">→</span>}
                      </div>
                    ))}
                  </div>

                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-3 text-foreground">
                      {analysisStage === "specimen" && "Specimen Collection"}
                      {analysisStage === "microscope" && "Microscopic Analysis"}
                      {analysisStage === "diagnosis" && "Final Diagnosis"}
                    </h4>
                    
                    <div className="aspect-video bg-coffin-black/80 rounded-lg overflow-hidden border border-toxic-green/20 mb-4 relative group">
                      <img 
                        src={pathologyImage} 
                        alt="Pathology specimen"
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          analysisStage === "microscope" ? "scale-150 brightness-110" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coffin-black/80 to-transparent" />
                      {analysisStage === "microscope" && (
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-toxic-green rounded-full animate-glow-pulse" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-toxic-green/50 rounded-full animate-ping" />
                        </div>
                      )}
                    </div>

                    {findings.length > 0 && (
                      <div className="bg-coffin-black/60 border border-blood-red/30 rounded-lg p-3 mb-4 animate-fade-in">
                        <p className="text-blood-red font-gothic mb-2">Findings Detected:</p>
                        <ul className="space-y-1">
                          {findings.map((finding, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground font-serif flex items-start gap-2">
                              <span className="text-toxic-green">•</span>
                              {finding}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground font-serif mb-4">
                      {analysisStage === "specimen" && "Collect and prepare the tissue specimen for examination. Click areas of interest to mark them."}
                      {analysisStage === "microscope" && "Examine cellular structures under high magnification. Identify pathological changes."}
                      {analysisStage === "diagnosis" && "Based on your findings, formulate a diagnosis and submit your conclusion."}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {analysisStage === "specimen" && (
                        <>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setFindings([...findings, "Abnormal cell morphology detected"]);
                              toast.info("🔬 Specimen marked", { description: "Suspicious area identified..." });
                            }}
                          >
                            Mark Area
                          </Button>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setAnalysisStage("microscope");
                              toast.success("🧪 Moving to microscope", { description: "Preparing high-power analysis..." });
                            }}
                          >
                            To Microscope
                          </Button>
                        </>
                      )}
                      {analysisStage === "microscope" && (
                        <>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setFindings([...findings, "Necrotic tissue identified", "Inflammatory infiltrate present"]);
                              toast.info("🔍 Scanning cells...", { description: "Pathological changes revealed..." });
                            }}
                          >
                            Scan Cells
                          </Button>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setAnalysisStage("diagnosis");
                              toast.success("📊 Analysis complete", { description: "Ready for diagnosis..." });
                            }}
                          >
                            To Diagnosis
                          </Button>
                        </>
                      )}
                      {analysisStage === "diagnosis" && (
                        <>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setAnalysisStage("specimen");
                              setFindings([]);
                              toast.info("🔄 Restarting analysis");
                            }}
                          >
                            Start Over
                          </Button>
                          <Button 
                            variant="crypt" 
                            className="w-full"
                            onClick={() => {
                              handleActivityComplete(activity.id);
                              setAnalysisStage("specimen");
                              setFindings([]);
                            }}
                          >
                            Submit Diagnosis
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Learning Points */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-2 text-foreground">Key Learning Points</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground font-serif">
                      <li>• Understand the pathophysiology of disease processes</li>
                      <li>• Identify characteristic cellular and tissue changes</li>
                      <li>• Differentiate between normal and pathological states</li>
                      <li>• Apply clinical correlation to laboratory findings</li>
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
            Completed: {completedActivities.length} / {activities.length} activities
          </p>
          <div className="w-full max-w-md mx-auto mt-2 h-2 bg-coffin-black/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-toxic-green animate-glow-pulse transition-all duration-500"
              style={{ width: `${(completedActivities.length / activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PathologyLab;
