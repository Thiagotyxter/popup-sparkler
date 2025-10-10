import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PopupState } from "@/types/popup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PopupPreviewProps {
  state: PopupState;
}

export const PopupPreview = ({ state }: PopupPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseType, setPurchaseType] = useState<"one-time" | "subscription">(
    state.enableOneTimePurchase ? "one-time" : "subscription"
  );
  const [selectedQuantity, setSelectedQuantity] = useState(state.quantityOptions[0]?.id || "");
  const [selectedPlan, setSelectedPlan] = useState(state.subscriptionPlans[0]?.id || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(state.coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCtaClick = () => {
    let url = state.ctaUrl;
    
    if (state.enableSubscription) {
      if (purchaseType === "one-time" && selectedQuantity) {
        const option = state.quantityOptions.find(o => o.id === selectedQuantity);
        url = option?.checkoutUrl || state.ctaUrl;
      } else if (purchaseType === "subscription" && selectedPlan) {
        const plan = state.subscriptionPlans.find(p => p.id === selectedPlan);
        url = plan?.checkoutUrl || state.ctaUrl;
      }
    }
    
    if (!url) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open(url, "_blank");
    }, 800);
  };

  const getCurrentPrice = () => {
    if (state.enableSubscription && purchaseType === "one-time" && selectedQuantity) {
      const option = state.quantityOptions.find(o => o.id === selectedQuantity);
      return option?.price ? `R$ ${option.price}` : state.priceDiscount;
    } else if (state.enableSubscription && purchaseType === "subscription" && selectedPlan) {
      const plan = state.subscriptionPlans.find(p => p.id === selectedPlan);
      return plan?.price ? `R$ ${plan.price}` : state.priceDiscount;
    }
    return state.priceDiscount;
  };


  return (
    <div 
      className="w-full max-w-md mx-auto rounded-lg shadow-card overflow-hidden"
      style={{ backgroundColor: state.customColors.popupBackground }}
    >
      {/* Headline */}
      <div className="p-6 pb-4">
        <h2 
          className="font-extrabold leading-tight"
          style={{
            fontFamily: state.typography.title.fontFamily,
            fontSize: state.typography.title.fontSize,
            color: state.typography.title.color,
          }}
        >
          {state.title}
        </h2>
        <p 
          className="mt-3 leading-relaxed"
          style={{
            fontFamily: state.typography.subtitle.fontFamily,
            fontSize: state.typography.subtitle.fontSize,
            color: state.typography.subtitle.color,
          }}
        >
          {state.subtitle}
        </p>
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
            className="relative rounded-lg p-3 transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: state.customColors.couponBackground,
              color: state.typography.coupon.color,
            }}
            onClick={handleCopy}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium flex-shrink-0">
                Clique para copiar
              </span>
              <div 
                className="font-bold tracking-wider text-center flex-1"
                style={{
                  fontFamily: state.typography.coupon.fontFamily,
                  fontSize: state.typography.coupon.fontSize,
                }}
              >
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
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Options */}
      {state.enableSubscription && (
        <div className="px-6 pb-4 space-y-3">
          {/* Purchase Type Buttons */}
          {state.enableOneTimePurchase && state.enableSubscriptionPlans && (
            <div className="flex gap-2">
              <Button
                variant={purchaseType === "one-time" ? "default" : "outline"}
                className="flex-1 rounded-lg"
                style={
                  purchaseType === "one-time"
                    ? { 
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        borderColor: "#e5e7eb"
                      }
                    : {}
                }
                onClick={() => setPurchaseType("one-time")}
              >
                Compre uma vez
              </Button>
              <Button
                variant={purchaseType === "subscription" ? "default" : "outline"}
                className="flex-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                style={
                  purchaseType === "subscription"
                    ? { 
                        backgroundColor: "#10b981",
                      }
                    : {}
                }
                onClick={() => setPurchaseType("subscription")}
              >
                Assine e economize
              </Button>
            </div>
          )}

          {/* Quantity Selector */}
          {purchaseType === "one-time" && state.quantityOptions.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Quantidade:</Label>
              <Select value={selectedQuantity} onValueChange={setSelectedQuantity}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a quantidade" />
                </SelectTrigger>
                <SelectContent>
                  {state.quantityOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.quantity} UNIDADE{option.quantity > 1 ? "S" : ""} {option.discount && `(${option.discount})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Subscription Plan Selector */}
          {purchaseType === "subscription" && state.subscriptionPlans.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Plano:</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o plano" />
                </SelectTrigger>
                <SelectContent>
                  {state.subscriptionPlans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} - R$ {plan.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Pricing */}
      <div className="px-6 pb-4">
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-emerald-950 dark:text-emerald-50">
              {getCurrentPrice()}
            </div>
            {state.enableSubscription && purchaseType === "subscription" && selectedPlan && (
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                por {state.subscriptionPlans.find(p => p.id === selectedPlan)?.interval.toLowerCase()}
              </p>
            )}
            {state.enableSubscription && purchaseType === "one-time" && selectedQuantity && (
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                {state.quantityOptions.find(o => o.id === selectedQuantity)?.quantity} unidade{state.quantityOptions.find(o => o.id === selectedQuantity)?.quantity > 1 ? 's' : ''}
              </p>
            )}
            {(!state.enableSubscription || (!selectedQuantity && !selectedPlan)) && (
              <div className="text-sm text-muted line-through">
                {state.priceOriginal}
              </div>
            )}
          </div>
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
