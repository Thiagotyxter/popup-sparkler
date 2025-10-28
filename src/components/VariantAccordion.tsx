import { PopupState, Variant } from "@/types/popup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface VariantAccordionProps {
  state: PopupState;
  onChange: (updates: Partial<PopupState>) => void;
}

export const VariantAccordion = ({ state, onChange }: VariantAccordionProps) => {
  const handleAddVariant = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substring(7),
      name: "",
      url: "",
      isActive: true,
    };
    onChange({
      variants: [...state.variants, newVariant],
    });
  };

  const handleUpdateVariant = (index: number, updates: Partial<Variant>) => {
    const updatedVariants = [...state.variants];
    updatedVariants[index] = { ...updatedVariants[index], ...updates };
    onChange({ variants: updatedVariants });
  };

  const handleDeleteVariant = (index: number) => {
    onChange({
      variants: state.variants.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label className="text-base font-semibold">Tem variante?</Label>
          <p className="text-sm text-muted-foreground">
            Adicione variações do produto como cores, sabores, tamanhos, etc.
          </p>
        </div>
        <Switch
          checked={state.enableVariants}
          onCheckedChange={(checked) => onChange({ enableVariants: checked })}
        />
      </div>

      {state.enableVariants && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {state.variants.length === 0 
                ? "Nenhuma variante configurada" 
                : `${state.variants.length} variante${state.variants.length > 1 ? 's' : ''} configurada${state.variants.length > 1 ? 's' : ''}`}
            </p>
            <Button
              type="button"
              size="sm"
              onClick={handleAddVariant}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Variante
            </Button>
          </div>

          {state.variants.map((variant, index) => (
            <div
              key={variant.id}
              className="border-2 border-dashed rounded-lg p-4 space-y-3"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-sm">
                    Nome da variante {index + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={variant.isActive}
                      onCheckedChange={(checked) =>
                        handleUpdateVariant(index, { isActive: checked })
                      }
                    />
                    {variant.isActive && (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                        <span className="w-2 h-2 bg-green-600 rounded-full" />
                        Ativo
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteVariant(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Nome</Label>
                <Input
                  value={variant.name}
                  onChange={(e) =>
                    handleUpdateVariant(index, { name: e.target.value })
                  }
                  placeholder="Ex: Preto, Vermelho, Chocolate..."
                  maxLength={30}
                />
                <p className="text-xs text-muted-foreground">
                  Máximo de 30 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">URL da variante</Label>
                <Input
                  value={variant.url}
                  onChange={(e) =>
                    handleUpdateVariant(index, { url: e.target.value })
                  }
                  placeholder="https://seusite.com/produto?variant=..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
