import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Bone, Activity, Eye, Skull, Droplet, Zap, Wind, Target } from "lucide-react";
import { toast } from "sonner";
import skeletonSystem from "@/assets/skeleton-system.jpg";
import muscleSystem from "@/assets/muscle-system.jpg";
import organSystem from "@/assets/organ-system.jpg";
import nervousSystem from "@/assets/nervous-system.jpg";
import circulatorySystem from "@/assets/circulatory-system.jpg";

const systems = [
  { 
    id: "skeletal", 
    name: "Skeletal System", 
    icon: Bone, 
    description: "206 bones forming the framework",
    image: skeletonSystem,
    parts: ["Skull", "Ribcage", "Spine", "Pelvis", "Femur", "Humerus"]
  },
  { 
    id: "muscular", 
    name: "Muscular System", 
    icon: Activity, 
    description: "Over 600 muscles for movement",
    image: muscleSystem,
    parts: ["Biceps", "Triceps", "Quadriceps", "Hamstrings", "Deltoids", "Pectorals"]
  },
  { 
    id: "nervous", 
    name: "Nervous System", 
    icon: Brain, 
    description: "Brain, spinal cord, and neural networks",
    image: nervousSystem,
    parts: ["Brain", "Spinal Cord", "Neurons", "Synapses", "Nerves", "Ganglia"]
  },
  { 
    id: "circulatory", 
    name: "Circulatory System", 
    icon: Heart, 
    description: "Heart, blood vessels, and blood flow",
    image: circulatorySystem,
    parts: ["Heart", "Arteries", "Veins", "Capillaries", "Blood", "Plasma"]
  },
  { 
    id: "respiratory", 
    name: "Respiratory System", 
    icon: Wind, 
    description: "Lungs and airways for gas exchange",
    image: organSystem,
    parts: ["Lungs", "Trachea", "Bronchi", "Alveoli", "Diaphragm", "Larynx"]
  },
  { 
    id: "digestive", 
    name: "Digestive System", 
    icon: Activity, 
    description: "Processing food and nutrients",
    image: organSystem,
    parts: ["Stomach", "Intestines", "Liver", "Pancreas", "Esophagus", "Colon"]
  },
  { 
    id: "urinary", 
    name: "Urinary System", 
    icon: Droplet, 
    description: "Waste filtration and removal",
    image: organSystem,
    parts: ["Kidneys", "Bladder", "Ureters", "Urethra", "Nephrons", "Renal Pelvis"]
  },
  { 
    id: "reproductive", 
    name: "Reproductive System", 
    icon: Heart, 
    description: "Organs of reproduction",
    image: organSystem,
    parts: ["Ovaries", "Testes", "Uterus", "Prostate", "Fallopian Tubes", "Vas Deferens"]
  },
  { 
    id: "lymphatic", 
    name: "Lymphatic System", 
    icon: Zap, 
    description: "Immune defense and fluid balance",
    image: circulatorySystem,
    parts: ["Lymph Nodes", "Spleen", "Thymus", "Tonsils", "Lymph Vessels", "Bone Marrow"]
  },
  { 
    id: "endocrine", 
    name: "Endocrine System", 
    icon: Target, 
    description: "Hormonal regulation network",
    image: nervousSystem,
    parts: ["Pituitary", "Thyroid", "Adrenal", "Pancreas", "Pineal", "Hypothalamus"]
  }
];

const AnatomyViewer = () => {
  const [activeSystem, setActiveSystem] = useState(systems[0].id);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"normal" | "xray" | "layers">("normal");

  const currentSystem = systems.find(s => s.id === activeSystem);

  if (!currentSystem) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skull className="w-12 h-12 text-toxic-green animate-glow-pulse" />
            <h1 className="text-4xl font-gothic font-bold text-toxic-green">
              Anatomical Collection
            </h1>
          </div>
          <p className="text-muted-foreground text-lg font-serif">
            Explore the haunted anatomy specimens in Dr. Cadaverson's laboratory
          </p>
        </div>

        {/* System Tabs */}
        <Tabs value={activeSystem} onValueChange={setActiveSystem} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto bg-coffin-black/40 p-2">
            {systems.map((system) => (
              <TabsTrigger 
                key={system.id} 
                value={system.id}
                className="data-[state=active]:bg-toxic-green/20 data-[state=active]:text-toxic-green"
              >
                <system.icon className="w-4 h-4" />
              </TabsTrigger>
            ))}
          </TabsList>

          {systems.map((system) => (
            <TabsContent key={system.id} value={system.id} className="mt-6">
              <Card className="bg-coffin-black/60 border-toxic-green/30 p-6 animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <system.icon className="w-8 h-8 text-blood-red animate-heartbeat" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-gothic font-bold text-toxic-green mb-2">
                      {system.name}
                    </h3>
                    <p className="text-muted-foreground font-serif">
                      {system.description}
                    </p>
                  </div>
                </div>

                {/* View Mode Selector */}
                <div className="flex gap-2 mb-4">
                  <Button 
                    size="sm"
                    variant={viewMode === "normal" ? "haunted" : "outline"}
                    onClick={() => {
                      setViewMode("normal");
                      toast.info("👁️ Normal view activated");
                    }}
                  >
                    Normal
                  </Button>
                  <Button 
                    size="sm"
                    variant={viewMode === "xray" ? "haunted" : "outline"}
                    onClick={() => {
                      setViewMode("xray");
                      toast.info("💀 X-Ray vision enabled...", { description: "Peering through the flesh..." });
                    }}
                  >
                    X-Ray
                  </Button>
                  <Button 
                    size="sm"
                    variant={viewMode === "layers" ? "haunted" : "outline"}
                    onClick={() => {
                      setViewMode("layers");
                      toast.info("🧬 Layer view activated...", { description: "Dissecting layer by layer..." });
                    }}
                  >
                    Layers
                  </Button>
                </div>

                {/* Interactive Anatomical View */}
                <div className="bg-background/40 rounded-lg p-4 border border-border/30 mb-4">
                  <div className="aspect-video bg-coffin-black/80 rounded-lg overflow-hidden relative group border border-toxic-green/20">
                    <img 
                      src={system.image} 
                      alt={system.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        viewMode === "xray" ? "grayscale invert opacity-80" : ""
                      } ${
                        viewMode === "layers" ? "blur-sm hover:blur-none" : ""
                      }`}
                    />
                    {viewMode === "xray" && (
                      <div className="absolute inset-0 bg-toxic-green/10 mix-blend-screen animate-glow-pulse" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-coffin-black/80 to-transparent" />
                    {selectedPart && (
                      <div className="absolute bottom-4 left-4 right-4 bg-coffin-black/90 border border-toxic-green/50 p-3 rounded-lg animate-fade-in">
                        <p className="text-toxic-green font-gothic text-lg">Selected: {selectedPart}</p>
                        <p className="text-muted-foreground text-sm font-serif mt-1">
                          Examining anatomical structure in detail...
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Clickable Body Parts */}
                <div className="bg-background/40 rounded-lg p-4 border border-border/30 mb-4">
                  <h4 className="font-gothic text-lg mb-3 text-foreground">Select Body Part</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {system.parts.map((part) => (
                      <Button
                        key={part}
                        size="sm"
                        variant={selectedPart === part ? "haunted" : "outline"}
                        onClick={() => {
                          setSelectedPart(part);
                          toast.success(`🔬 ${part} selected`, { 
                            description: `Analyzing ${part.toLowerCase()} structure...` 
                          });
                        }}
                        className="text-xs"
                      >
                        {part}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Interactive Controls */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="haunted" 
                    className="w-full"
                    onClick={() => {
                      toast.info("🦴 Rotating 3D model...", { description: "Examining from all angles..." });
                      setTimeout(() => {
                        toast.success("✨ Rotation complete!");
                      }, 1500);
                    }}
                  >
                    Rotate 360°
                  </Button>
                  <Button 
                    variant="haunted" 
                    className="w-full"
                    onClick={() => {
                      toast.info("🔍 Magnifying...", { description: "Revealing microscopic details..." });
                      setTimeout(() => {
                        toast.success("🔬 Cellular level reached!");
                      }, 1500);
                    }}
                  >
                    Zoom In
                  </Button>
                  <Button 
                    variant="haunted" 
                    className="w-full"
                    onClick={() => {
                      setSelectedPart(null);
                      toast.info("🔄 Resetting view...");
                    }}
                  >
                    Reset View
                  </Button>
                  <Button 
                    variant="crypt" 
                    className="w-full"
                    onClick={() => {
                      toast.success("📚 Knowledge absorbed!", { 
                        description: `${system.name} mastered! Dr. Cadaverson is impressed...` 
                      });
                    }}
                  >
                    Study Complete
                  </Button>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default AnatomyViewer;
