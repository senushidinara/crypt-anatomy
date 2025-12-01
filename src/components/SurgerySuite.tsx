import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Scissors, Heart, Brain, Bone, Eye, Syringe, Stethoscope, Activity, Droplet, Zap } from "lucide-react";
import { toast } from "sonner";
import surgeryRoom from "@/assets/surgery-room.jpg";

const activities = [
  { id: "cardiac", title: "Cardiac Resurrection", icon: Heart, description: "Perform heart surgery on a vampire patient" },
  { id: "neuro", title: "Brain Extraction", icon: Brain, description: "Delicate neurosurgery on a zombie specimen" },
  { id: "orthopedic", title: "Bone Reconstruction", icon: Bone, description: "Repair skeletal injuries in werewolf victims" },
  { id: "ophthalmic", title: "Eye of Newt", icon: Eye, description: "Restore vision in cursed witch patients" },
  { id: "trauma", title: "Emergency Trauma", icon: Zap, description: "Stabilize critical injuries from haunted accidents" },
  { id: "thoracic", title: "Chest Cavity Expedition", icon: Stethoscope, description: "Open thoracic surgery on ghost patients" },
  { id: "vascular", title: "Vessel Voyage", icon: Activity, description: "Repair blood vessels in vampire feeding victims" },
  { id: "transplant", title: "Organ Exchange", icon: Scissors, description: "Frankenstein-style organ transplantation" },
  { id: "minimally", title: "Spectral Laparoscopy", icon: Syringe, description: "Minimally invasive ghostly procedures" },
  { id: "emergency", title: "Midnight Emergency", icon: Droplet, description: "Time-critical procedures under moonlight" }
];

const SurgerySuite = () => {
  const [activeActivity, setActiveActivity] = useState(activities[0].id);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const [surgeryPhase, setSurgeryPhase] = useState<"prep" | "incision" | "procedure" | "closure">("prep");
  const [vitals, setVitals] = useState({ heartRate: 72, bloodPressure: "120/80", oxygen: 98 });

  const handleActivityComplete = (activityId: string) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
      toast.success("⚰️ Surgery successful! The patient lives again...", {
        description: "Your surgical prowess echoes through the operating theater."
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
            <Scissors className="w-12 h-12 text-blood-red animate-heartbeat" />
            <h1 className="text-4xl font-gothic font-bold text-blood-red">
              Surgical Operating Suite
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-serif">
            Perform life-or-death procedures in the haunted operating theater
          </p>
        </div>

        {/* Activity Tabs */}
        <Tabs value={activeActivity} onValueChange={setActiveActivity} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-coffin-black/40 p-2">
            {activities.map((activity) => (
              <TabsTrigger 
                key={activity.id} 
                value={activity.id}
                className="data-[state=active]:bg-blood-red/20 data-[state=active]:text-blood-red relative"
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
              <Card className="bg-coffin-black/60 border-blood-red/30 p-6 animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <activity.icon className="w-8 h-8 text-blood-red animate-heartbeat" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-gothic font-bold text-blood-red mb-2">
                      {activity.title}
                    </h3>
                    <p className="text-muted-foreground font-serif">
                      {activity.description}
                    </p>
                  </div>
                </div>

                {/* Activity Content */}
                <div className="space-y-4">
                  {/* Surgery Phase Progress */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {(["prep", "incision", "procedure", "closure"] as const).map((phase) => (
                      <div key={phase} className={`flex-1 h-2 rounded-full transition-all ${
                        surgeryPhase === phase ? "bg-blood-red animate-pulse" : 
                        ["prep", "incision", "procedure", "closure"].indexOf(surgeryPhase) > 
                        ["prep", "incision", "procedure", "closure"].indexOf(phase) 
                          ? "bg-toxic-green" : "bg-border"
                      }`} />
                    ))}
                  </div>

                  {/* Vital Signs Monitor */}
                  <div className="bg-coffin-black/80 border border-blood-red/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blood-red font-gothic">VITAL SIGNS MONITOR</span>
                      <Activity className="w-5 h-5 text-blood-red animate-heartbeat" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-gothic text-toxic-green">{vitals.heartRate}</div>
                        <div className="text-xs text-muted-foreground">BPM</div>
                      </div>
                      <div>
                        <div className="text-2xl font-gothic text-toxic-green">{vitals.bloodPressure}</div>
                        <div className="text-xs text-muted-foreground">BP</div>
                      </div>
                      <div>
                        <div className="text-2xl font-gothic text-toxic-green">{vitals.oxygen}%</div>
                        <div className="text-xs text-muted-foreground">O₂</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-3 text-foreground capitalize">
                      {surgeryPhase === "prep" && "Surgical Preparation"}
                      {surgeryPhase === "incision" && "Making Incision"}
                      {surgeryPhase === "procedure" && "Main Procedure"}
                      {surgeryPhase === "closure" && "Closing Incision"}
                    </h4>
                    
                    <div className="aspect-video bg-coffin-black/80 rounded-lg overflow-hidden border border-toxic-green/20 mb-4 relative">
                      <img 
                        src={surgeryRoom} 
                        alt="Surgery room"
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          surgeryPhase === "procedure" ? "brightness-125 saturate-150" : ""
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-coffin-black via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-coffin-black/90 border border-blood-red/50 rounded-lg p-3">
                          <p className="text-sm text-foreground font-serif">
                            {surgeryPhase === "prep" && "Sterilize instruments and prepare the surgical field..."}
                            {surgeryPhase === "incision" && "Make precise incision along marked guidelines..."}
                            {surgeryPhase === "procedure" && "Execute main surgical procedure with extreme care..."}
                            {surgeryPhase === "closure" && "Suture layers methodically from deep to superficial..."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {surgeryPhase === "prep" && (
                        <>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              toast.info("🧤 Scrubbing in...", { description: "Sterile field established..." });
                            }}
                          >
                            Scrub In
                          </Button>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setSurgeryPhase("incision");
                              toast.success("✅ Ready for surgery", { description: "All systems ready..." });
                            }}
                          >
                            Begin Surgery
                          </Button>
                        </>
                      )}
                      {surgeryPhase === "incision" && (
                        <>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setVitals({...vitals, heartRate: 68});
                              toast.info("💉 Anesthesia administered", { description: "Patient sedated..." });
                            }}
                          >
                            Anesthesia
                          </Button>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setSurgeryPhase("procedure");
                              toast.info("🔪 Incision made", { description: "Accessing surgical site..." });
                            }}
                          >
                            Make Incision
                          </Button>
                        </>
                      )}
                      {surgeryPhase === "procedure" && (
                        <>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setVitals({...vitals, heartRate: vitals.heartRate + 5});
                              toast.warning("⚠️ Vitals fluctuating", { description: "Adjusting..." });
                            }}
                          >
                            Monitor Vitals
                          </Button>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setSurgeryPhase("closure");
                              toast.success("✨ Procedure complete", { description: "Beginning closure..." });
                            }}
                          >
                            Finish Procedure
                          </Button>
                        </>
                      )}
                      {surgeryPhase === "closure" && (
                        <>
                          <Button 
                            variant="haunted" 
                            className="w-full"
                            onClick={() => {
                              setSurgeryPhase("prep");
                              setVitals({ heartRate: 72, bloodPressure: "120/80", oxygen: 98 });
                              toast.info("🔄 Resetting for new procedure");
                            }}
                          >
                            Start Over
                          </Button>
                          <Button 
                            variant="crypt" 
                            className="w-full"
                            onClick={() => {
                              handleActivityComplete(activity.id);
                              setSurgeryPhase("prep");
                              setVitals({ heartRate: 72, bloodPressure: "120/80", oxygen: 98 });
                            }}
                          >
                            Complete Surgery
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Learning Points */}
                  <div className="bg-background/40 rounded-lg p-4 border border-border/30">
                    <h4 className="font-gothic text-lg mb-2 text-foreground">Surgical Objectives</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground font-serif">
                      <li>• Maintain sterile technique throughout procedure</li>
                      <li>• Monitor patient vitals continuously</li>
                      <li>• Execute surgical steps with precision</li>
                      <li>• Manage complications swiftly and effectively</li>
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
            Completed: {completedActivities.length} / {activities.length} surgeries
          </p>
          <div className="w-full max-w-md mx-auto mt-2 h-2 bg-coffin-black/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blood-red animate-pulse transition-all duration-500"
              style={{ width: `${(completedActivities.length / activities.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgerySuite;
