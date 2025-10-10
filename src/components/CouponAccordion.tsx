import { PopupState } from "@/types/popup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CouponAccordionProps {
  state: PopupState;
  onChange: (updates: Partial<PopupState>) => void;
}

export const CouponAccordion = ({ state, onChange }: CouponAccordionProps) => {
  const [isOpen, setIsOpen] = useState(state.applyCoupon);

  const handleCouponToggle = (checked: boolean) => {
    onChange({ applyCoupon: checked });
    setIsOpen(checked);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch
            id="apply-coupon"
            checked={state.applyCoupon}
            onCheckedChange={handleCouponToggle}
          />
          <Label htmlFor="apply-coupon" className="font-medium cursor-pointer">
            Aplicar cupom no popup
          </Label>
        </div>
        {state.applyCoupon && (
          <CollapsibleTrigger asChild>
            <button
              className="p-1 hover:bg-surface rounded-md transition-colors"
              aria-label={isOpen ? "Recolher opções do cupom" : "Expandir opções do cupom"}
            >
              <ChevronDown
                className={`w-5 h-5 text-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
        )}
      </div>

      <CollapsibleContent className="space-y-4 animate-in slide-in-from-top-2">
        <div className="space-y-2">
          <Label htmlFor="coupon-code" className="text-sm font-medium">
            Código do cupom <span className="text-primary">*</span>
          </Label>
          <Input
            id="coupon-code"
            value={state.coupon.code}
            onChange={(e) =>
              onChange({
                coupon: { ...state.coupon, code: e.target.value },
              })
            }
            placeholder="TYXTER10"
            required
            className="rounded-md"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="copy-label" className="text-sm font-medium">
            Texto do cupom
          </Label>
          <Input
            id="copy-label"
            value={state.coupon.copyLabel}
            onChange={(e) =>
              onChange({
                coupon: { ...state.coupon, copyLabel: e.target.value },
              })
            }
            placeholder="Clique para copiar"
            className="rounded-md"
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="uppercase" className="font-medium">
            Transformar em UPPERCASE
          </Label>
          <Switch
            id="uppercase"
            checked={state.coupon.uppercase}
            onCheckedChange={(checked) =>
              onChange({
                coupon: { ...state.coupon, uppercase: checked },
              })
            }
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="auto-copy" className="font-medium">
            Copiar automaticamente ao clicar
          </Label>
          <Switch
            id="auto-copy"
            checked={state.coupon.autoCopyOnClick}
            onCheckedChange={(checked) =>
              onChange({
                coupon: { ...state.coupon, autoCopyOnClick: checked },
              })
            }
          />
        </div>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="show-savings" className="font-medium">
            Exibir economia
          </Label>
          <Switch
            id="show-savings"
            checked={state.coupon.showSavingsText}
            onCheckedChange={(checked) =>
              onChange({
                coupon: { ...state.coupon, showSavingsText: checked },
              })
            }
          />
        </div>

        {state.coupon.showSavingsText && (
          <div className="space-y-2 animate-in slide-in-from-top-1">
            <Label htmlFor="savings-text" className="text-sm font-medium">
              Texto de economia
            </Label>
            <Input
              id="savings-text"
              value={state.coupon.savingsText}
              onChange={(e) =>
                onChange({
                  coupon: { ...state.coupon, savingsText: e.target.value },
                })
              }
              placeholder="Você economiza R$65"
              className="rounded-md"
            />
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};
