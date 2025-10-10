import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PopupState } from "@/types/popup";
import { Button } from "@/components/ui/button";

interface PopupPreviewProps {
  state: PopupState;
}

export const PopupPreview = ({ state }: PopupPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(state.coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCtaClick = () => {
    if (!state.ctaUrl) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open(state.ctaUrl, "_blank");
    }, 800);
  };


  return (
    <div 
      className="w-full max-w-md mx-auto rounded-lg shadow-card overflow-hidden"
      style={{ backgroundColor: state.customColors.popupBackground }}
    >
      {/* Headline */}
      <div className="p-6 pb-4">
        <h2 className="font-display font-extrabold text-2xl md:text-3xl leading-tight text-ink">
          {state.title.split("R$").map((part, idx) =>
            idx === 0 ? (
              part
            ) : (
              <span key={idx} className="text-primary">
                R${part}
              </span>
            )
          )}
        </h2>
        <p className="mt-3 text-muted text-base md:text-lg leading-relaxed">{state.subtitle}</p>
      </div>

      {/* Image */}
      <div className="px-6 pb-4">
        <div className="relative w-full aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl overflow-hidden">
          <img
            src={state.imageUrl}
            alt="Produto"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop";
            }}
          />
        </div>
      </div>

      {/* Coupon Block */}
      {state.applyCoupon && state.coupon.code && (
        <div className="px-6 pb-4">
          <div
            className="relative rounded-lg border-2 border-dashed border-border p-3 transition-all duration-300 hover:border-primary cursor-pointer"
            style={{
              backgroundColor: state.customColors.couponBackground,
              color: state.customColors.couponTextColor,
            }}
            onClick={handleCopy}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium flex-shrink-0">
                Clique para copiar
              </span>
              <div className="text-2xl font-bold tracking-wider text-center flex-1">
                {state.coupon.code.toUpperCase()}
              </div>
              <button
                className="flex-shrink-0 transition-transform hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                aria-label="Copiar código"
              >
                {copied ? (
                  <Check className="w-5 h-5" style={{ color: state.customColors.couponTextColor }} />
                ) : (
                  <Copy className="w-5 h-5" style={{ color: state.customColors.couponTextColor }} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="px-6 pb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-muted line-through text-sm">{state.priceOriginal}</span>
          <span className="text-ink font-bold text-2xl">{state.priceDiscount}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <Button
          onClick={handleCtaClick}
          disabled={!state.ctaUrl || isLoading}
          className="w-full text-primary-foreground font-display font-bold text-base py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: state.customColors.ctaBackground,
            ...(state.ctaUrl && !isLoading && {
              '--tw-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            })
          } as React.CSSProperties}
          title={!state.ctaUrl ? "Informe a URL do produto" : ""}
        >
          {isLoading ? "Adicionando…" : state.ctaLabel}
        </Button>
      </div>
    </div>
  );
};
