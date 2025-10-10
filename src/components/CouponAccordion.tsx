import { PopupState } from "@/types/popup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface CouponAccordionProps {
  state: PopupState;
  onChange: (updates: Partial<PopupState>) => void;
}

export const CouponAccordion = ({ state, onChange }: CouponAccordionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label htmlFor="apply-coupon" className="text-sm font-medium">
          Aplicar cupom no popup
        </Label>
        <Switch
          id="apply-coupon"
          checked={state.applyCoupon}
          onCheckedChange={(checked) => onChange({ applyCoupon: checked })}
        />
      </div>

      {state.applyCoupon && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coupon-code" className="text-sm font-medium">
              Código do cupom
            </Label>
            <Input
              id="coupon-code"
              value={state.coupon.code}
              onChange={(e) =>
                onChange({
                  coupon: {
                    ...state.coupon,
                    code: e.target.value,
                  },
                })
              }
              placeholder="TYXTER10"
              className="rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price-original" className="text-sm font-medium">
                Preço do produto
              </Label>
              <Input
                id="price-original"
                value={state.priceOriginal}
                onChange={(e) => onChange({ priceOriginal: e.target.value })}
                placeholder="R$ 209,80"
                className="rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price-discount" className="text-sm font-medium">
                Preço com desconto
              </Label>
              <Input
                id="price-discount"
                value={state.priceDiscount}
                onChange={(e) => onChange({ priceDiscount: e.target.value })}
                placeholder="R$ 144,80"
                className="rounded-md"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-sm font-medium">
              Subtítulo
            </Label>
            <Input
              id="subtitle"
              value={state.subtitle}
              onChange={(e) => onChange({ subtitle: e.target.value })}
              placeholder="Use o cupom abaixo e finalize sua compra agora."
              className="rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};
