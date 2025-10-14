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
    <div className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-ink mb-1">Configurações</h3>
        <p className="text-sm text-muted-light">Personalize seu popup em tempo real</p>
      </div>
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-6 bg-surface p-1 rounded-xl">
          <TabsTrigger 
            value="content"
            className="rounded-lg text-xs data-[state=active]:bg-tyxter-blue-bg data-[state=active]:text-tyxter-blue"
          >
            Conteúdo
          </TabsTrigger>
          <TabsTrigger 
            value="kits"
            className="rounded-lg text-xs data-[state=active]:bg-tyxter-blue-bg data-[state=active]:text-tyxter-blue"
          >
            Kits
          </TabsTrigger>
          <TabsTrigger 
            value="coupon"
            className="rounded-lg text-xs data-[state=active]:bg-tyxter-blue-bg data-[state=active]:text-tyxter-blue"
          >
            Cupom
          </TabsTrigger>
          <TabsTrigger 
            value="styles"
            className="rounded-lg text-xs data-[state=active]:bg-tyxter-blue-bg data-[state=active]:text-tyxter-blue"
          >
            Estilos
          </TabsTrigger>
        </TabsList>

        {/* CONTENT TAB */}
        <TabsContent value="content" className="space-y-5">
          <div className="space-y-4 p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              📝 Texto do Popup
            </h4>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-semibold text-ink">
                Título
              </Label>
              <Input
                id="title"
                value={state.title}
                onChange={(e) => onChange({ title: e.target.value })}
                placeholder="💥 Leve foco e descanso com R$65 OFF"
                className="rounded-xl border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-sm font-semibold text-ink">
                Subtítulo
              </Label>
              <Textarea
                id="subtitle"
                value={state.subtitle}
                onChange={(e) => onChange({ subtitle: e.target.value })}
                placeholder="Use o cupom abaixo e finalize sua compra agora."
                className="rounded-xl border-border resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-label" className="text-sm font-semibold text-ink">
                Texto do botão
              </Label>
              <Input
                id="cta-label"
                value={state.ctaLabel}
                onChange={(e) => onChange({ ctaLabel: e.target.value })}
                placeholder="Adicionar ao Carrinho"
                className="rounded-xl border-border"
              />
            </div>
          </div>

          <div className="space-y-4 p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              🖼️ Imagem e Produto
            </h4>
            <div className="space-y-2">
              <Label htmlFor="image-url" className="text-sm font-semibold text-ink">
                URL da Imagem
              </Label>
              <Input
                id="image-url"
                value={state.imageUrl}
                onChange={(e) => onChange({ imageUrl: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
                className="rounded-xl border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta-url" className="text-sm font-semibold text-ink">
                URL do Produto
              </Label>
              <Input
                id="cta-url"
                value={state.ctaUrl}
                onChange={(e) => onChange({ ctaUrl: e.target.value })}
                placeholder="https://seu-site.com/produto"
                className="rounded-xl border-border"
              />
            </div>
          </div>

          <div className="space-y-4 p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              ⏱️ Comportamento
            </h4>
            <div className="space-y-2">
              <Label htmlFor="delay" className="text-sm font-semibold text-ink">
                Delay de Exibição (segundos)
              </Label>
              <Input
                id="delay"
                type="number"
                min="0"
                value={state.behavior.showAfterSeconds}
                onChange={(e) => onChange({ 
                  behavior: { ...state.behavior, showAfterSeconds: Number(e.target.value) }
                })}
                className="rounded-xl border-border"
              />
            </div>
          </div>
        </TabsContent>

        {/* KITS TAB */}
        <TabsContent value="kits" className="space-y-5">
          <div className="space-y-4 p-4 bg-surface rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-ink">Variantes de Assinatura</h4>
                <p className="text-xs text-muted-light mt-1">Ative kits e planos</p>
              </div>
              <Switch
                checked={state.enableSubscription}
                onCheckedChange={(checked) => onChange({ enableSubscription: checked })}
              />
            </div>
          </div>

          {state.enableSubscription && (
            <>
              {/* One-time Purchase Toggle */}
              <div className="space-y-4 p-4 bg-surface rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-ink">Compra Única</h4>
                    <p className="text-xs text-muted-light mt-1">Permite comprar sem assinatura</p>
                  </div>
                  <Switch
                    checked={state.enableOneTimePurchase}
                    onCheckedChange={(checked) => onChange({ enableOneTimePurchase: checked })}
                  />
                </div>
              </div>

              {/* Quantity Options (Kits) */}
              {state.enableOneTimePurchase && (
                <div className="space-y-4 p-4 bg-surface rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-ink">Opções de Quantidade</h4>
                      <p className="text-xs text-muted-light mt-1">Kits (1, 2, 3 unidades)</p>
                    </div>
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
                      className="gap-2 bg-tyxter-blue hover:bg-tyxter-blue-hover text-white"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {state.quantityOptions.map((option, index) => (
                      <div key={option.id} className="border border-border rounded-xl p-4 space-y-3 bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-ink">Kit {index + 1}</span>
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

                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Qtd</Label>
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
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Preço (R$)</Label>
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
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Desconto</Label>
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
                              placeholder="+10%"
                              className="rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium">URL de Checkout</Label>
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
                            placeholder="https://checkout.com"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subscription Plans */}
              <div className="space-y-4 p-4 bg-surface rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-ink">Planos de Assinatura</h4>
                    <p className="text-xs text-muted-light mt-1">Mensal, anual, etc</p>
                  </div>
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
                        className="gap-2 bg-tyxter-blue hover:bg-tyxter-blue-hover text-white"
                      >
                        <Plus className="w-4 h-4" />
                        Plano
                      </Button>
                    )}
                  </div>
                </div>

                {state.enableSubscriptionPlans && (
                  <div className="space-y-3">
                    {state.subscriptionPlans.map((plan, index) => (
                      <div key={plan.id} className="border border-border rounded-xl p-4 space-y-3 bg-card">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-ink">Plano {index + 1}</span>
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

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Nome do Plano</Label>
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
                              className="rounded-lg"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Preço (R$)</Label>
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
                              placeholder="0,00"
                              className="rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Intervalo</Label>
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
                              <SelectTrigger className="rounded-lg">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Mês(es)">Mês</SelectItem>
                                <SelectItem value="Ano(s)">Ano</SelectItem>
                                <SelectItem value="Semana(s)">Semana</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium">Quantidade</Label>
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
                              className="rounded-lg"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium">URL de Checkout</Label>
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
                            placeholder="https://checkout.com"
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </TabsContent>

        {/* COUPON TAB */}
        <TabsContent value="coupon" className="space-y-5">
          <div className="space-y-4 p-4 bg-surface rounded-xl">
            <CouponAccordion state={state} onChange={onChange} />
          </div>
        </TabsContent>

        {/* STYLES TAB */}
        <TabsContent value="styles" className="space-y-5">
          <div className="space-y-4 p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              🎨 Cores
            </h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Fundo do Popup</Label>
                <Input
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
                  className="h-10 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Fundo do Cupom</Label>
                <Input
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
                  className="h-10 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Fundo do Botão</Label>
                <Input
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
                  className="h-10 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-4 bg-surface rounded-xl">
            <h4 className="text-sm font-bold text-ink flex items-center gap-2">
              ✍️ Tipografia
            </h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Fonte do Título</Label>
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
                  <SelectTrigger className="rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_OPTIONS.map((font) => (
                      <SelectItem key={font} value={font}>
                        {font}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Cor do Título</Label>
                <Input
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
                  className="h-10 rounded-lg"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
