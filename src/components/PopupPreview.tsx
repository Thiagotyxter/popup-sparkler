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

  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#1F6E68' : '#E6F4F1';
  };

  const handleCopyCoupon = () => {
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

  const extractSavings = () => {
    const original = parseFloat(state.priceOriginal.replace(/[^\d,]/g, "").replace(",", "."));
    const discount = parseFloat(state.priceDiscount.replace(/[^\d,]/g, "").replace(",", "."));
    if (!isNaN(original) && !isNaN(discount)) {
      const savings = original - discount;
      return `R$ ${savings.toFixed(2).replace(".", ",")}`;
    }
    return "R$ 65,00";
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
            className="rounded-md p-4 cursor-pointer transition-all duration-200 hover:shadow-hover group text-center"
            style={{ backgroundColor: state.customColors.couponBackground }}
            onClick={state.coupon.autoCopyOnClick ? handleCopyCoupon : undefined}
            role="button"
            tabIndex={0}
            aria-label={`Cupom: ${state.coupon.code}`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-full">
                <p 
                  className="text-xs mb-1 opacity-70"
                  style={{ color: getContrastColor(state.customColors.couponBackground) }}
                >
                  {state.coupon.copyLabel}
                </p>
                <p
                  className={`font-display font-bold text-lg tracking-wide ${
                    state.coupon.uppercase ? "uppercase" : ""
                  }`}
                  style={{ color: getContrastColor(state.customColors.couponBackground) }}
                >
                  {state.coupon.code}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyCoupon();
                }}
                className="p-2 rounded-md hover:bg-black/10 transition-colors"
                aria-label="Copiar cupom"
              >
                {copied ? (
                  <Check 
                    className="w-5 h-5 animate-in zoom-in duration-200" 
                    style={{ color: getContrastColor(state.customColors.couponBackground) }}
                  />
                ) : (
                  <Copy 
                    className="w-5 h-5" 
                    style={{ color: getContrastColor(state.customColors.couponBackground) }}
                  />
                )}
              </button>
            </div>
            {copied && (
              <p
                className="text-xs font-medium mt-2 animate-in fade-in slide-in-from-bottom-1"
                style={{ color: getContrastColor(state.customColors.couponBackground) }}
                role="status"
                aria-live="polite"
              >
                ✓ Copiado!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Pricing */}
      <div className="px-6 pb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-muted line-through text-sm">{state.priceOriginal}</span>
          <span className="text-ink font-bold text-2xl">{state.priceDiscount}</span>
        </div>
        {state.applyCoupon && state.coupon.showSavingsText && (
          <p className="text-primary text-sm font-medium mt-1">
            {state.coupon.savingsText || `Você economiza ${extractSavings()}`}
          </p>
        )}
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
