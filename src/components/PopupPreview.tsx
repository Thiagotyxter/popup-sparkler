import { useState } from "react";
import { Copy, Check, ShoppingCart, Tag } from "lucide-react";
import { PopupState } from "@/types/popup";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PopupPreviewProps {
  state: PopupState;
  deviceView: "desktop" | "mobile";
}

export const PopupPreview = ({ state, deviceView }: PopupPreviewProps) => {
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


  const maxWidth = deviceView === "desktop" ? "max-w-md" : "max-w-sm";
  const fontSize = deviceView === "desktop" ? "text-2xl" : "text-xl";

  return (
    <div className={`w-full ${maxWidth} mx-auto animate-fade-in-up`}>
      <div 
        className="rounded-2xl shadow-premium overflow-hidden"
        style={{ backgroundColor: state.customColors.popupBackground }}
      >
        {/* Headline */}
        <div className="p-8 pb-4">
          <h2 
            className={`font-extrabold leading-tight ${fontSize}`}
            style={{
              fontFamily: state.typography.title.fontFamily,
              fontSize: deviceView === "desktop" ? state.typography.title.fontSize : undefined,
              color: state.typography.title.color,
            }}
          >
            {state.title}
          </h2>
          <p 
            className="mt-3 leading-relaxed text-base opacity-80"
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
        <div className="px-8 pb-5">
          <div className="relative w-full aspect-square bg-gradient-to-br from-tyxter-blue/10 to-tyxter-blue-light/5 rounded-2xl overflow-hidden shadow-md">
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

        {/* Coupon Block - Premium pill design */}
        {state.applyCoupon && state.coupon.code && (
          <div className="px-8 pb-5">
            <div
              className="relative rounded-xl p-4 transition-all duration-200 cursor-pointer hover:shadow-md group"
              style={{
                backgroundColor: state.customColors.couponBackground,
                color: state.typography.coupon.color,
              }}
              onClick={handleCopy}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Tag className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Seu cupom
                  </span>
                </div>
                <div 
                  className="font-extrabold tracking-widest text-center flex-1 text-lg"
                  style={{
                    fontFamily: state.typography.coupon.fontFamily,
                    fontSize: state.typography.coupon.fontSize,
                  }}
                >
                  {state.coupon.code.toUpperCase()}
                </div>
                <button
                  className="flex-shrink-0 transition-transform hover:scale-110 group-hover:rotate-6"
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
          <div className="px-8 pb-5 space-y-4">
            {/* Purchase Type Buttons */}
            {state.enableOneTimePurchase && state.enableSubscriptionPlans && (
              <div className="flex gap-3">
                <Button
                  variant={purchaseType === "one-time" ? "default" : "outline"}
                  className="flex-1 rounded-xl py-3 font-semibold transition-all"
                  style={
                    purchaseType === "one-time"
                      ? { 
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                          border: "none"
                        }
                      : {}
                  }
                  onClick={() => setPurchaseType("one-time")}
                >
                  Compre uma vez
                </Button>
                <Button
                  variant={purchaseType === "subscription" ? "default" : "outline"}
                  className="flex-1 rounded-xl py-3 font-semibold transition-all"
                  style={
                    purchaseType === "subscription"
                      ? { 
                          backgroundColor: "#10b981",
                          color: "#ffffff",
                          border: "none"
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
                <Label className="text-sm font-semibold">Quantidade:</Label>
                <Select value={selectedQuantity} onValueChange={setSelectedQuantity}>
                  <SelectTrigger className="w-full rounded-xl py-6">
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
                <Label className="text-sm font-semibold">Plano:</Label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger className="w-full rounded-xl py-6">
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

        {/* Pricing Block - Premium green box */}
        <div className="px-8 pb-6">
          <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200 shadow-sm">
            <div className="text-center space-y-2">
              <div className="text-5xl font-extrabold text-emerald-950">
                {getCurrentPrice()}
              </div>
              {state.enableSubscription && purchaseType === "subscription" && selectedPlan && (
                <p className="text-sm font-medium text-emerald-700">
                  por {state.subscriptionPlans.find(p => p.id === selectedPlan)?.interval.toLowerCase()}
                </p>
              )}
              {state.enableSubscription && purchaseType === "one-time" && selectedQuantity && (
                <p className="text-sm font-medium text-emerald-700">
                  {state.quantityOptions.find(o => o.id === selectedQuantity)?.quantity} unidade{state.quantityOptions.find(o => o.id === selectedQuantity)?.quantity > 1 ? 's' : ''}
                </p>
              )}
              {(!state.enableSubscription || (!selectedQuantity && !selectedPlan)) && state.priceOriginal && (
                <div className="text-base text-muted-light line-through opacity-60">
                  {state.priceOriginal}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Button - Premium gradient */}
        <div className="px-8 pb-8">
          <Button
            onClick={handleCtaClick}
            disabled={!state.ctaUrl || isLoading}
            className="w-full text-white font-bold text-lg py-7 rounded-2xl shadow-premium hover:shadow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            style={{ 
              backgroundColor: state.customColors.ctaBackground,
            }}
            title={!state.ctaUrl ? "Informe a URL do produto" : ""}
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {isLoading ? "Adicionando ao carrinho…" : state.ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};
