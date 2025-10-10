import { PopupState } from "@/types/popup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CouponAccordion } from "./CouponAccordion";

interface PopupFormProps {
  state: PopupState;
  onChange: (updates: Partial<PopupState>) => void;
}

export const PopupForm = ({ state, onChange }: PopupFormProps) => {
  return (
    <div className="h-full overflow-y-auto">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="coupon">Cupom</TabsTrigger>
          <TabsTrigger value="styles">Cores & Tipografia</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Título
            </Label>
            <Input
              id="title"
              value={state.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="💥 Leve foco e descanso com R$65 OFF"
              className="rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image-url" className="text-sm font-medium">
              URL da Imagem
            </Label>
            <Input
              id="image-url"
              value={state.imageUrl}
              onChange={(e) => onChange({ imageUrl: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
              className="rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-label" className="text-sm font-medium">
              Texto do botão
            </Label>
            <Input
              id="cta-label"
              value={state.ctaLabel}
              onChange={(e) => onChange({ ctaLabel: e.target.value })}
              placeholder="Adicionar ao carrinho"
              className="rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta-url" className="text-sm font-medium">
              URL do produto recomendado <span className="text-primary">*</span>
            </Label>
            <Input
              id="cta-url"
              value={state.ctaUrl}
              onChange={(e) => onChange({ ctaUrl: e.target.value })}
              placeholder="https://seusite.com/produto"
              required
              className="rounded-md"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="show-after" className="text-sm font-medium">
              Mostrar popup após (segundos)
            </Label>
            <Input
              id="show-after"
              type="number"
              value={state.behavior.showAfterSeconds}
              onChange={(e) =>
                onChange({
                  behavior: {
                    ...state.behavior,
                    showAfterSeconds: parseInt(e.target.value) || 0,
                  },
                })
              }
              min="0"
              className="rounded-md"
            />
          </div>
        </TabsContent>

        <TabsContent value="coupon" className="space-y-4">
          <CouponAccordion state={state} onChange={onChange} />
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="popup-bg" className="text-sm font-medium">
                Cor de fundo do popup
              </Label>
              <div className="flex gap-3 items-center">
                <input
                  id="popup-bg"
                  type="color"
                  value={state.customColors.popupBackground}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        popupBackground: e.target.value,
                      },
                    })
                  }
                  className="w-16 h-10 rounded-md cursor-pointer border border-border"
                />
                <Input
                  value={state.customColors.popupBackground}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        popupBackground: e.target.value,
                      },
                    })
                  }
                  placeholder="#FFFFFF"
                  className="flex-1 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-bg" className="text-sm font-medium">
                Cor de fundo do botão
              </Label>
              <div className="flex gap-3 items-center">
                <input
                  id="cta-bg"
                  type="color"
                  value={state.customColors.ctaBackground}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        ctaBackground: e.target.value,
                      },
                    })
                  }
                  className="w-16 h-10 rounded-md cursor-pointer border border-border"
                />
                <Input
                  value={state.customColors.ctaBackground}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        ctaBackground: e.target.value,
                      },
                    })
                  }
                  placeholder="#2C928A"
                  className="flex-1 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coupon-bg" className="text-sm font-medium">
                Cor de fundo do cupom
              </Label>
              <div className="flex gap-3 items-center">
                <input
                  id="coupon-bg"
                  type="color"
                  value={state.customColors.couponBackground}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        couponBackground: e.target.value,
                      },
                    })
                  }
                  className="w-16 h-10 rounded-md cursor-pointer border border-border"
                />
                <Input
                  value={state.customColors.couponBackground}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        couponBackground: e.target.value,
                      },
                    })
                  }
                  placeholder="#FEF3C7"
                  className="flex-1 rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coupon-text" className="text-sm font-medium">
                Cor do texto do cupom
              </Label>
              <div className="flex gap-3 items-center">
                <input
                  id="coupon-text"
                  type="color"
                  value={state.customColors.couponTextColor}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        couponTextColor: e.target.value,
                      },
                    })
                  }
                  className="w-16 h-10 rounded-md cursor-pointer border border-border"
                />
                <Input
                  value={state.customColors.couponTextColor}
                  onChange={(e) =>
                    onChange({
                      customColors: {
                        ...state.customColors,
                        couponTextColor: e.target.value,
                      },
                    })
                  }
                  placeholder="#92400E"
                  className="flex-1 rounded-md"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
