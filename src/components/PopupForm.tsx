import { PopupState, QuantityOption, SubscriptionPlan } from "@/types/popup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";
import { CouponAccordion } from "./CouponAccordion";

const FONT_OPTIONS = [
  "Abel", "Abril Fatface", "Alegreya", "Alegreya Sans", "Amatic SC", "Arvo",
  "Barlow", "Barlow Condensed", "Barlow Semi Condensed", "Bellefair", "Belleza",
  "Bitter", "Cabin", "Cagliostro", "Cardo", "Cormorant", "Cormorant Garamond",
  "Cormorant Infant", "Cormorant SC", "Cormorant Upright", "Crimson Text",
  "DM Serif Display", "DM Serif Text", "EB Garamond", "Exo", "Exo 2",
  "Fira Code", "Fira Mono", "Fira Sans", "Francois One", "Gentium Book Basic",
  "Halant", "Hind", "Hind Guntur", "Hind Madurai", "IM Fell DW Pica",
  "IM Fell English", "IM Fell French Canon", "IM Fell French Canon SC",
  "IM Fell Great Primer", "IM Fell Great Primer SC", "Inconsolata", "Inknut Antiqua",
  "Inter", "Inter Tight", "Italiana", "Josefin Sans", "Josefin Slab", "Jura",
  "Karla", "Lato", "Libre Baskerville", "Libre Franklin", "Lobster", "Lora",
  "M PLUS 1p", "Marcellus", "Marcellus SC", "Martel", "Martel Sans",
  "Merriweather", "Merriweather Sans", "Montserrat", "Montserrat Alternates",
  "Montserrat Subrayada", "Neuton", "Noto Sans", "Noto Serif", "Old Standard TT",
  "Open Sans", "Oswald", "Overpass", "Poppins", "PT Serif", "PT Serif Caption",
  "Quicksand", "Raleway", "Rasa", "Roboto", "Roboto Condensed", "Roboto Slab",
  "Rubik", "Rubik Mono One", "Satisfy", "Spectral", "Spectral SC", "Tinos",
  "Ubuntu", "Vollkorn", "Vollkorn SC", "Work Sans", "Zilla Slab"
];

interface PopupFormProps {
  state: PopupState;
  onChange: (updates: Partial<PopupState>) => void;
}

export const PopupForm = ({ state, onChange }: PopupFormProps) => {
  return (
    <div className="h-full overflow-y-auto">
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="kits">Kits</TabsTrigger>
          <TabsTrigger value="coupon">Cupom</TabsTrigger>
          <TabsTrigger value="styles">Estilos</TabsTrigger>
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

        <TabsContent value="kits" className="space-y-6">
          {/* Variantes de Assinatura */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Variantes de Assinatura</Label>
              <Switch
                checked={state.enableSubscription}
                onCheckedChange={(checked) => onChange({ enableSubscription: checked })}
              />
            </div>
            {state.enableSubscription && (
              <p className="text-sm text-muted-foreground">
                Permite que o cliente escolha entre compra única ou assinatura.
              </p>
            )}
          </div>

          {state.enableSubscription && (
            <>
              {/* Opção de Compra Única */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Opção de Compra Única</Label>
                  <Switch
                    checked={state.enableOneTimePurchase}
                    onCheckedChange={(checked) => onChange({ enableOneTimePurchase: checked })}
                  />
                </div>
              </div>

              {/* Opções de Quantidade (Kits) */}
              {state.enableOneTimePurchase && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Opções de Quantidade</Label>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        const newOption: QuantityOption = {
                          id: Math.random().toString(36).substring(7),
                          quantity: 1,
                          price: "",
                          discount: "",
                          checkoutUrl: "",
                        };
                        onChange({
                          quantityOptions: [...state.quantityOptions, newOption],
                        });
                      }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>

                  {state.quantityOptions.map((option, index) => (
                    <div key={option.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">Opção {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            onChange({
                              quantityOptions: state.quantityOptions.filter((_, i) => i !== index),
                            });
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-2">
                          <Label className="text-xs">Qtd</Label>
                          <Input
                            type="number"
                            value={option.quantity}
                            onChange={(e) => {
                              const updated = [...state.quantityOptions];
                              updated[index] = {
                                ...updated[index],
                                quantity: parseInt(e.target.value) || 1,
                              };
                              onChange({ quantityOptions: updated });
                            }}
                            min="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Preço (R$)</Label>
                          <Input
                            value={option.price}
                            onChange={(e) => {
                              const updated = [...state.quantityOptions];
                              updated[index] = {
                                ...updated[index],
                                price: e.target.value,
                              };
                              onChange({ quantityOptions: updated });
                            }}
                            placeholder="0,00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Desconto</Label>
                          <Input
                            value={option.discount}
                            onChange={(e) => {
                              const updated = [...state.quantityOptions];
                              updated[index] = {
                                ...updated[index],
                                discount: e.target.value,
                              };
                              onChange({ quantityOptions: updated });
                            }}
                            placeholder="+10%OFF"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs">URL de Checkout</Label>
                        <Input
                          value={option.checkoutUrl}
                          onChange={(e) => {
                            const updated = [...state.quantityOptions];
                            updated[index] = {
                              ...updated[index],
                              checkoutUrl: e.target.value,
                            };
                            onChange({ quantityOptions: updated });
                          }}
                          placeholder="URL para esta quantidade"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Planos de Assinatura */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Planos de Assinatura</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={state.enableSubscriptionPlans}
                      onCheckedChange={(checked) => onChange({ enableSubscriptionPlans: checked })}
                    />
                    {state.enableSubscriptionPlans && (
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          const newPlan: SubscriptionPlan = {
                            id: Math.random().toString(36).substring(7),
                            name: "",
                            price: "",
                            interval: "Mês(es)",
                            intervalCount: 1,
                            checkoutUrl: "",
                          };
                          onChange({
                            subscriptionPlans: [...state.subscriptionPlans, newPlan],
                          });
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Adicionar Plano
                      </Button>
                    )}
                  </div>
                </div>

                {state.enableSubscriptionPlans && state.subscriptionPlans.map((plan, index) => (
                  <div key={plan.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Plano {index + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          onChange({
                            subscriptionPlans: state.subscriptionPlans.filter((_, i) => i !== index),
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Nome do Plano</Label>
                        <Input
                          value={plan.name}
                          onChange={(e) => {
                            const updated = [...state.subscriptionPlans];
                            updated[index] = {
                              ...updated[index],
                              name: e.target.value,
                            };
                            onChange({ subscriptionPlans: updated });
                          }}
                          placeholder="Mensal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Preço (R$)</Label>
                        <Input
                          value={plan.price}
                          onChange={(e) => {
                            const updated = [...state.subscriptionPlans];
                            updated[index] = {
                              ...updated[index],
                              price: e.target.value,
                            };
                            onChange({ subscriptionPlans: updated });
                          }}
                          placeholder="39.90"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs">Intervalo</Label>
                        <Select
                          value={plan.interval}
                          onValueChange={(value) => {
                            const updated = [...state.subscriptionPlans];
                            updated[index] = {
                              ...updated[index],
                              interval: value,
                            };
                            onChange({ subscriptionPlans: updated });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mês(es)">Mês(es)</SelectItem>
                            <SelectItem value="Ano(s)">Ano(s)</SelectItem>
                            <SelectItem value="Semana(s)">Semana(s)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">A cada</Label>
                        <Input
                          type="number"
                          value={plan.intervalCount}
                          onChange={(e) => {
                            const updated = [...state.subscriptionPlans];
                            updated[index] = {
                              ...updated[index],
                              intervalCount: parseInt(e.target.value) || 1,
                            };
                            onChange({ subscriptionPlans: updated });
                          }}
                          min="1"
                          placeholder="1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">URL de Checkout</Label>
                      <Input
                        value={plan.checkoutUrl}
                        onChange={(e) => {
                          const updated = [...state.subscriptionPlans];
                          updated[index] = {
                            ...updated[index],
                            checkoutUrl: e.target.value,
                          };
                          onChange({ subscriptionPlans: updated });
                        }}
                        placeholder="URL para este plano"
                      />
                    </div>

                    <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                      Preview: {plan.name || "Nome do Plano"} - R$ {plan.price || "0.00"} a cada {plan.intervalCount} {plan.interval.toLowerCase()}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="coupon" className="space-y-4">
          <CouponAccordion state={state} onChange={onChange} />
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          {/* Typography Section */}
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-base font-semibold mb-4">Tipografia do Título</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title-font" className="text-sm font-medium">
                    Fonte
                  </Label>
                  <Select
                    value={state.typography.title.fontFamily}
                    onValueChange={(value) =>
                      onChange({
                        typography: {
                          ...state.typography,
                          title: { ...state.typography.title, fontFamily: value },
                        },
                      })
                    }
                  >
                    <SelectTrigger id="title-font" className="h-12" style={{ fontFamily: state.typography.title.fontFamily }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem 
                          key={font} 
                          value={font} 
                          className="h-10 text-base cursor-pointer"
                          style={{ fontFamily: font }}
                        >
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title-size" className="text-sm font-medium">
                    Tamanho (px)
                  </Label>
                  <Input
                    id="title-size"
                    type="number"
                    value={parseInt(state.typography.title.fontSize)}
                    onChange={(e) =>
                      onChange({
                        typography: {
                          ...state.typography,
                          title: { ...state.typography.title, fontSize: `${e.target.value}px` },
                        },
                      })
                    }
                    placeholder="28"
                    min="8"
                    max="100"
                    className="rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title-color" className="text-sm font-medium">
                    Cor
                  </Label>
                  <div className="flex gap-3 items-center">
                    <input
                      id="title-color"
                      type="color"
                      value={state.typography.title.color}
                      onChange={(e) =>
                        onChange({
                          typography: {
                            ...state.typography,
                            title: { ...state.typography.title, color: e.target.value },
                          },
                        })
                      }
                      className="w-16 h-10 rounded-md cursor-pointer border border-border"
                    />
                    <Input
                      value={state.typography.title.color}
                      onChange={(e) =>
                        onChange({
                          typography: {
                            ...state.typography,
                            title: { ...state.typography.title, color: e.target.value },
                          },
                        })
                      }
                      placeholder="#111111"
                      className="flex-1 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-base font-semibold mb-4">Tipografia do Subtítulo</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subtitle-font" className="text-sm font-medium">
                    Fonte
                  </Label>
                  <Select
                    value={state.typography.subtitle.fontFamily}
                    onValueChange={(value) =>
                      onChange({
                        typography: {
                          ...state.typography,
                          subtitle: { ...state.typography.subtitle, fontFamily: value },
                        },
                      })
                    }
                  >
                    <SelectTrigger id="subtitle-font" className="h-12" style={{ fontFamily: state.typography.subtitle.fontFamily }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem 
                          key={font} 
                          value={font} 
                          className="h-10 text-base cursor-pointer"
                          style={{ fontFamily: font }}
                        >
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle-size" className="text-sm font-medium">
                    Tamanho (px)
                  </Label>
                  <Input
                    id="subtitle-size"
                    type="number"
                    value={parseInt(state.typography.subtitle.fontSize)}
                    onChange={(e) =>
                      onChange({
                        typography: {
                          ...state.typography,
                          subtitle: { ...state.typography.subtitle, fontSize: `${e.target.value}px` },
                        },
                      })
                    }
                    placeholder="16"
                    min="8"
                    max="100"
                    className="rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle-color" className="text-sm font-medium">
                    Cor
                  </Label>
                  <div className="flex gap-3 items-center">
                    <input
                      id="subtitle-color"
                      type="color"
                      value={state.typography.subtitle.color}
                      onChange={(e) =>
                        onChange({
                          typography: {
                            ...state.typography,
                            subtitle: { ...state.typography.subtitle, color: e.target.value },
                          },
                        })
                      }
                      className="w-16 h-10 rounded-md cursor-pointer border border-border"
                    />
                    <Input
                      value={state.typography.subtitle.color}
                      onChange={(e) =>
                        onChange({
                          typography: {
                            ...state.typography,
                            subtitle: { ...state.typography.subtitle, color: e.target.value },
                          },
                        })
                      }
                      placeholder="#666666"
                      className="flex-1 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b pb-4">
              <h3 className="text-base font-semibold mb-4">Tipografia do Cupom</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="coupon-font" className="text-sm font-medium">
                    Fonte
                  </Label>
                  <Select
                    value={state.typography.coupon.fontFamily}
                    onValueChange={(value) =>
                      onChange({
                        typography: {
                          ...state.typography,
                          coupon: { ...state.typography.coupon, fontFamily: value },
                        },
                      })
                    }
                  >
                    <SelectTrigger id="coupon-font" className="h-12" style={{ fontFamily: state.typography.coupon.fontFamily }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {FONT_OPTIONS.map((font) => (
                        <SelectItem 
                          key={font} 
                          value={font} 
                          className="h-10 text-base cursor-pointer"
                          style={{ fontFamily: font }}
                        >
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coupon-size" className="text-sm font-medium">
                    Tamanho (px)
                  </Label>
                  <Input
                    id="coupon-size"
                    type="number"
                    value={parseInt(state.typography.coupon.fontSize)}
                    onChange={(e) =>
                      onChange({
                        typography: {
                          ...state.typography,
                          coupon: { ...state.typography.coupon, fontSize: `${e.target.value}px` },
                        },
                      })
                    }
                    placeholder="24"
                    min="8"
                    max="100"
                    className="rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coupon-color" className="text-sm font-medium">
                    Cor
                  </Label>
                  <div className="flex gap-3 items-center">
                    <input
                      id="coupon-color"
                      type="color"
                      value={state.typography.coupon.color}
                      onChange={(e) =>
                        onChange({
                          typography: {
                            ...state.typography,
                            coupon: { ...state.typography.coupon, color: e.target.value },
                          },
                        })
                      }
                      className="w-16 h-10 rounded-md cursor-pointer border border-border"
                    />
                    <Input
                      value={state.typography.coupon.color}
                      onChange={(e) =>
                        onChange({
                          typography: {
                            ...state.typography,
                            coupon: { ...state.typography.coupon, color: e.target.value },
                          },
                        })
                      }
                      placeholder="#92400E"
                      className="flex-1 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colors Section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold mb-4">Cores</h3>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
