import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Syringe, Heart, Brain, Bone, Eye, Stethoscope, Activity, Zap, Target, Timer } from "lucide-react";
import { toast } from "sonner";

const surgeries = [
  { id: "cardiac", title: "Cardiac Resurrection", icon: Heart, description: "Perform heart surgery on a vampire patient", difficulty: "Expert" },
  { id: "neuro", title: "Brain Extraction", icon: Brain, description: "Delicate neurosurgery on a zombie specimen", difficulty: "Master" },
  { id: "orthopedic", title: "Bone Reconstruction", icon: Bone, description: "Repair skeletal injuries in werewolf victims", difficulty: "Advanced" },
  { id: "ophthalmic", title: "Eye of Newt", icon: Eye, description: "Restore vision in cursed witch patients", difficulty: "Intermediate" },
  { id: "trauma", title: "Emergency Trauma", icon: Zap, description: "Stabilize critical injuries from haunted accidents", difficulty: "Expert" },
  { id: "thoracic", title: "Chest Cavity Expedition", icon: Stethoscope, description: "Open thoracic surgery on ghost patients", difficulty: "Advanced" },
  { id: "vascular", title: "Vessel Voyage", icon: Activity, description: "Repair blood vessels in vampire feeding victims", difficulty: "Intermediate" },
  { id: "transplant", title: "Organ Exchange", icon: Target, description: "Frankenstein-style organ transplantation", difficulty: "Master" },
  { id: "minimally", title: "Spectral Laparoscopy", icon: Syringe, description: "Minimally invasive ghostly procedures", difficulty: "Advanced" },
  { id: "emergency", title: "Midnight Emergency", icon: Timer, description: "Time-critical procedures under moonlight", difficulty: "Expert" }
];

const SurgerySuite = () => {
  const [activeSurgery, setActiveSurgery] = useState(surgeries[0].id);
  const [completedSurgeries, setCompletedSurgeries] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes

  const handleSurgeryComplete = (surgeryId: string) => {
    if (!completedSurgeries.includes(surgeryId)) {
      setCompletedSurgeries([...completedSurgeries, surgeryId]);
      toast.success("⚰️ Surgery successful! The patient rises again...", {
        description: "Your surgical prowess echoes through the operating theater."
      });
    }
  };

  const currentSurgery = surgeries.find(s => s.id === activeSurgery);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Syringe className="w-12 h-12 text-blood-red animate-heartbeat" />
            <h1 className="text-4xl font-gothic font-bold text-blood-red">
              Surgical Operating Suite
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-serif">
            Perform life-or-death procedures in the haunted operating theater
          </p>
        </div>

        {/* Surgery Tabs */}
        <Tabs value={activeSurgery} onValueChange={setActiveSurgery} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-coffin-black/40 p-2">
            {surgeries.map((surgery) => (
              <TabsTrigger 
                key={surgery.id} 
                value={surgery.id}
                className="data-[state=active]:bg-blood-red/20 data-[state=active]:text-blood-red relative"
              >
                <surgery.icon className="w-4 h-4" />
                {completedSurgeries.includes(surgery.id) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-toxic-green rounded-full animate-pulse" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {surgeries.map((surgery) => (
            <TabsContent key={surgery.id} value={surgery.id} className="mt-6">
              <Card className="bg-coffin-black/60 border-blood-red/30 p-6 animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <surgery.icon className="w-8 h-8 text-blood-red animate-heartbeat" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-gothic font-bold text-blood-red">
                        {surgery.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-toxic-green/20 text-toxic-green border border-toxic-green/30">
                        {surgery.difficulty}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-serif">
                      {surgery.description}
                    </p>
                  </div>
                </div>

                {/* Surgery Content */}
                <div className="space-y-4">
                  {/* Operating Theater */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-gothic text-lg text-foreground">Operating Theater</h4>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-blood-red animate-pulse" />
                        <span className="text-blood-red font-mono text-sm">
                          {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    <div className="aspect-video bg-coffin-black/80 rounded-lg flex items-center justify-center border border-blood-red/20 mb-4">
                      <surgery.icon className="w-24 h-24 text-blood-red/30 animate-heartbeat" />
                    </div>
                    <p className="text-sm text-muted-foreground font-serif mb-4">
                      The patient lies on the operating table, their life in your hands. 
                      Time is critical. Make precise incisions, manage blood loss, and complete the procedure.
                    </p>
                    
                    {/* Surgical Instruments */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <Button 
                        variant="haunted" 
                        size="sm"
                        onClick={() => toast.info("🔪 Scalpel selected", { description: "Make a precise incision..." })}
                      >
                        Scalpel
                      </Button>
                      <Button 
                        variant="haunted" 
                        size="sm"
                        onClick={() => toast.info("🩸 Managing blood", { description: "Controlling hemorrhage..." })}
                      >
                        Cauterize
                      </Button>
                      <Button 
                        variant="haunted" 
                        size="sm"
                        onClick={() => toast.info("🧵 Suturing", { description: "Closing the wound..." })}
                      >
                        Suture
                      </Button>
                      <Button 
                        variant="haunted" 
                        size="sm"
                        onClick={() => toast.info("💉 Administering", { description: "Injecting medication..." })}
                      >
                        Inject
                      </Button>
                    </div>

                    {/* Vital Signs */}
                    <div className="bg-coffin-black/60 rounded-lg p-3 border border-blood-red/20 mb-4">
                      <h5 className="font-gothic text-sm text-blood-red mb-2">Patient Vitals</h5>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-muted-foreground">Heart Rate</p>
                          <p className="text-blood-red font-mono animate-pulse">72 BPM</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Blood Pressure</p>
                          <p className="text-toxic-green font-mono">120/80</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">O2 Saturation</p>
                          <p className="text-toxic-green font-mono">98%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="haunted" 
                        className="flex-1"
                        onClick={() => toast.warning("⏸️ Surgery paused", { description: "Time stops for no one..." })}
                      >
                        Pause
                      </Button>
                      <Button 
                        variant="crypt" 
                        className="flex-1"
                        onClick={() => handleSurgeryComplete(surgery.id)}
                      >
                        Complete Surgery
                      </Button>
                    </div>
                  </div>

                  {/* Procedure Steps */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-2 text-foreground">Procedure Steps</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground font-serif list-decimal list-inside">
                      <li>Administer anesthesia and prepare sterile field</li>
                      <li>Make initial incision following anatomical landmarks</li>
                      <li>Control bleeding and maintain clear surgical site</li>
                      <li>Perform primary surgical objective</li>
                      <li>Close layers systematically and check hemostasis</li>
                    </ol>
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Progress */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground font-serif">
            Completed Surgeries: {completedSurgeries.length} / {surgeries.length}
          </p>
          <div className="w-full max-w-md mx-auto mt-2 h-2 bg-coffin-black/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blood-red animate-pulse transition-all duration-500"
              style={{ width: `${(completedSurgeries.length / surgeries.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgerySuite;
