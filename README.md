### **Feature: Sistema de Popup Promocional com Cupom Personalizável**

#### **Objetivo**
Implementar um popup modal configurável para exibir ofertas promocionais com cupom de desconto, permitindo customização completa de conteúdo, comportamento e aparência visual.

---

#### **Especificações Técnicas**

##### **1. Estrutura de Dados (TypeScript)**

O popup utiliza o seguinte tipo de estado (`src/types/popup.ts`):

```typescript
export type PopupState = {
  // Conteúdo principal
  title: string;                    // Título do popup com suporte a destaque de preços
  subtitle: string;                 // Texto descritivo/CTA
  imageUrl: string;                 // URL da imagem do produto
  priceOriginal: string;            // Preço original (com formatação)
  priceDiscount: string;            // Preço com desconto (com formatação)
  ctaLabel: string;                 // Texto do botão de ação
  ctaUrl: string;                   // URL de destino do botão (obrigatório)

  // Sistema de cupom
  applyCoupon: boolean;             // Toggle para exibir/ocultar cupom
  coupon: {
    code: string;                   // Código do cupom (sempre em UPPERCASE na exibição)
  };

  // Comportamento
  behavior: {
    showAfterSeconds: number;       // Delay para exibição do popup (em segundos)
  };

  // Customização visual
  customColors: {
    popupBackground: string;        // Cor de fundo do popup (hex)
    ctaBackground: string;          // Cor de fundo do botão CTA (hex)
    couponBackground: string;       // Cor de fundo do cupom (hex)
    couponTextColor: string;        // Cor do texto do cupom (hex)
  };
};
```

##### **2. Componentes React**

**A) `PopupForm` (`src/components/PopupForm.tsx`)**
- Formulário de configuração com 3 tabs:
  - **Conteúdo**: Título, imagem, URL do produto, botão CTA, delay de exibição
  - **Cupom**: Código, preços (original/desconto), subtítulo customizável
  - **Cores & Tipografia**: Color pickers para todas as cores customizáveis

**B) `CouponAccordion` (`src/components/CouponAccordion.tsx`)**
- Switch para ativar/desativar cupom
- Campos condicionais (aparecem apenas se cupom ativado):
  - Código do cupom
  - Preço original
  - Preço com desconto
  - Subtítulo (texto padrão: "Use o cupom abaixo e finalize sua compra agora.")

**C) `PopupPreview` (`src/components/PopupPreview.tsx`)**
- Preview em tempo real do popup
- Funcionalidades:
  - Cópia do cupom para clipboard ao clicar (com feedback visual)
  - Código sempre em UPPERCASE
  - Texto fixo "Clique para copiar" na esquerda
  - Ícone de copiar/check na direita
  - Animação de check (1.5s) após cópia bem-sucedida
  - Botão CTA com loading state (800ms)
  - Tratamento de erro para imagem (fallback)

##### **3. Funcionalidades Implementadas**

**Copy to Clipboard:**
```typescript
const handleCopy = () => {
  navigator.clipboard.writeText(state.coupon.code);
  setCopied(true);
  setTimeout(() => setCopied(false), 1500);
};
```

**Layout do Cupom:**
- Estrutura: `[Texto "Clique para copiar" | Código (centralizado) | Ícone Copy/Check]`
- Código sempre em UPPERCASE via `.toUpperCase()`
- Sem bordas pontilhadas
- Cores totalmente customizáveis (background + text)

**Botão CTA:**
- Loading state de 800ms antes de abrir URL
- Desabilitado se URL não informada
- Abre em nova aba (`_blank`)

##### **4. Regras de Negócio**

1. **Campo obrigatório**: `ctaUrl` é obrigatório (marcado com `*`)
2. **Cupom condicional**: Todos os campos do cupom só aparecem se `applyCoupon === true`
3. **Uppercase automático**: O código do cupom SEMPRE é exibido em maiúsculas, independente de como foi digitado
4. **Feedback visual**: 
   - Ícone muda de Copy para Check após cópia
   - Botão CTA mostra "Adicionando…" durante loading
5. **Responsividade**: Layout adaptável para mobile/desktop

##### **5. Estilos e Design System**

- Utiliza **Tailwind CSS** com tokens semânticos do design system
- Cores principais vêm de `customColors` (aplicadas via inline styles)
- Classes Tailwind para espaçamento, bordas, transições
- Animações: `transition-all duration-300`, `hover:scale-110`

##### **6. Estrutura de Arquivos**

```
src/
├── types/
│   └── popup.ts                 # Definições de tipos e estado padrão
├── components/
│   ├── PopupForm.tsx            # Formulário principal (tabs)
│   ├── CouponAccordion.tsx      # Seção de configuração do cupom
│   └── PopupPreview.tsx         # Preview do popup
└── pages/
    └── Index.tsx                # Página principal (integra form + preview)
```

##### **7. Dependências**

- `react` - Framework principal
- `lucide-react` - Ícones (Copy, Check)
- `@radix-ui/react-tabs` - Sistema de tabs
- Componentes UI customizados (shadcn/ui): Input, Label, Textarea, Switch, Button

##### **8. Fluxo de Dados**

```
Index.tsx (estado principal)
    ↓
PopupForm (atualiza estado via onChange)
    ├── Tab Conteúdo
    ├── Tab Cupom → CouponAccordion
    └── Tab Cores
    ↓
PopupPreview (recebe estado via props, read-only)
```

---

#### **Tarefas de Implementação**

1. ✅ Criar tipos TypeScript (`popup.ts`)
2. ✅ Implementar `PopupForm` com sistema de tabs
3. ✅ Implementar `CouponAccordion` com campos condicionais
4. ✅ Implementar `PopupPreview` com funcionalidade de cópia
5. ✅ Integrar color pickers para customização
6. ✅ Adicionar validações (URL obrigatória)
7. ✅ Implementar loading states e feedback visual
8. ✅ Garantir responsividade mobile

#### **Próximos Passos (Sugestões)**

- [ ] Persistir configuração no localStorage ou banco de dados
- [ ] Adicionar analytics de conversão (cliques no CTA, cópias do cupom)
- [ ] Implementar A/B testing de diferentes configurações
- [ ] Adicionar preview de diferentes resoluções
- [ ] Exportar código HTML/JavaScript para embedding
- [ ] Sistema de templates pré-configurados

---

#### **Notas Importantes**

- O código já está 100% funcional e testado
- Todas as cores usam hex codes (compatível com color pickers nativos)
- O sistema é totalmente type-safe (TypeScript)
- Layout segue boas práticas de acessibilidade (aria-labels, roles)
