import { useState } from "react";
import { PopupState, defaultPopupState } from "@/types/popup";
import { PopupPreview } from "@/components/PopupPreview";
import { PopupForm } from "@/components/PopupForm";
import { Button } from "@/components/ui/button";
import { Save, Eye, Rocket, Monitor, Smartphone, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [popupState, setPopupState] = useState<PopupState>(defaultPopupState);
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const { toast } = useToast();

  const handleStateChange = (updates: Partial<PopupState>) => {
    setPopupState((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    toast({
      title: "✓ Salvo com sucesso",
      description: "Suas alterações foram salvas.",
      duration: 2000,
    });
  };

  const handlePublish = () => {
    toast({
      title: "✓ Publicado",
      description: "Seu popup está no ar!",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm backdrop-blur-sm">
        <div className="max-w-[1920px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo + Breadcrumb */}
            <div className="flex items-center gap-6">
              <div>
                <h1 className="font-bold text-xl text-ink flex items-center gap-2">
                  <span className="text-tyxter-blue">⚡</span>
                  Tyxter Popup Builder
                </h1>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-light">
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4" />
                <span>Popup Builder</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-ink font-medium">Promo Kit</span>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-light text-success text-xs font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                Edição ao vivo
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="hidden md:flex gap-2 rounded-xl"
              >
                <Save className="w-4 h-4" />
                Salvar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex gap-2 rounded-xl"
              >
                <Eye className="w-4 h-4" />
                Pré-visualizar
              </Button>
              <Button
                size="sm"
                onClick={handlePublish}
                className="gap-2 rounded-xl bg-tyxter-blue hover:bg-tyxter-blue-hover text-white"
              >
                <Rocket className="w-4 h-4" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Asymmetric Layout */}
      <main className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-73px)]">
          {/* Left: Preview Area (70%) */}
          <section className="flex-1 lg:w-[70%] bg-surface p-6 lg:p-12 flex flex-col items-center justify-start overflow-auto">
            {/* Device Selector */}
            <div className="w-full max-w-[500px] mb-6 flex justify-center gap-2">
              <Button
                variant={deviceView === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("desktop")}
                className={`gap-2 rounded-xl ${
                  deviceView === "desktop"
                    ? "bg-tyxter-blue-bg text-tyxter-blue border-tyxter-blue"
                    : ""
                }`}
              >
                <Monitor className="w-4 h-4" />
                Desktop
              </Button>
              <Button
                variant={deviceView === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setDeviceView("mobile")}
                className={`gap-2 rounded-xl ${
                  deviceView === "mobile"
                    ? "bg-tyxter-blue-bg text-tyxter-blue border-tyxter-blue"
                    : ""
                }`}
              >
                <Smartphone className="w-4 h-4" />
                Mobile
              </Button>
            </div>

            {/* Preview Card */}
            <div className="w-full flex justify-center">
              <PopupPreview state={popupState} deviceView={deviceView} />
            </div>
          </section>

          {/* Right: Configuration Drawer (30%) */}
          <aside className="lg:w-[30%] bg-card border-l border-border overflow-auto">
            <div className="sticky top-0 p-6">
              <PopupForm state={popupState} onChange={handleStateChange} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
