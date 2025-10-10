import { useState } from "react";
import { PopupState, defaultPopupState } from "@/types/popup";
import { PopupPreview } from "@/components/PopupPreview";
import { PopupForm } from "@/components/PopupForm";

const Index = () => {
  const [popupState, setPopupState] = useState<PopupState>(defaultPopupState);

  const handleStateChange = (updates: Partial<PopupState>) => {
    setPopupState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-xl sm:text-2xl text-ink">
                Tyxter Popup Builder
              </h1>
              <p className="text-sm text-muted mt-0.5">
                Crie popups de alta conversão em tempo real
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Edição ao vivo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Preview Panel */}
          <section className="order-1 lg:order-1">
            <div className="sticky top-24">
              <div className="mb-4">
                <h2 className="font-display font-bold text-lg text-ink mb-1">
                  Pré-visualização
                </h2>
                <p className="text-sm text-muted">
                  Veja as mudanças em tempo real
                </p>
              </div>
              <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6 lg:p-8">
                <PopupPreview state={popupState} />
              </div>
            </div>
          </section>

          {/* Form Panel */}
          <section className="order-2 lg:order-2">
            <div className="mb-4">
              <h2 className="font-display font-bold text-lg text-ink mb-1">
                Configurações
              </h2>
              <p className="text-sm text-muted">
                Personalize seu popup
              </p>
            </div>
            <div className="bg-card rounded-xl shadow-card p-6">
              <PopupForm state={popupState} onChange={handleStateChange} />
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Sticky Indicator */}
      <div className="lg:hidden fixed bottom-4 right-4 flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-lg border border-border">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-medium text-ink">Ao vivo</span>
      </div>
    </div>
  );
};

export default Index;
