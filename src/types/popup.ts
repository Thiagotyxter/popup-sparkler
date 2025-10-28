export type Variant = {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
};

export type QuantityOption = {
  id: string;
  quantity: number;
  price: string;
  discount: string;
  checkoutUrl: string;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: string;
  interval: string;
  intervalCount: number;
  checkoutUrl: string;
};

export type PopupState = {
  title: string;
  subtitle: string;
  imageUrl: string;
  priceOriginal: string;
  priceDiscount: string;
  ctaLabel: string;
  ctaUrl: string;

  applyCoupon: boolean;
  coupon: {
    code: string;
  };

  // Variantes
  enableVariants: boolean;
  variants: Variant[];

  // Kits e Assinaturas
  enableSubscription: boolean;
  enableOneTimePurchase: boolean;
  quantityOptions: QuantityOption[];
  enableSubscriptionPlans: boolean;
  subscriptionPlans: SubscriptionPlan[];

  behavior: {
    showAfterSeconds: number;
  };

  customColors: {
    popupBackground: string;
    ctaBackground: string;
    couponBackground: string;
    couponTextColor: string;
    priceBoxBackground: string;
    priceBoxTextColor: string;
  };

  typography: {
    title: {
      fontFamily: string;
      fontSize: string;
      color: string;
    };
    subtitle: {
      fontFamily: string;
      fontSize: string;
      color: string;
    };
    coupon: {
      fontFamily: string;
      fontSize: string;
      color: string;
    };
  };
};

export const defaultPopupState: PopupState = {
  title: "💥 Leve foco e descanso com R$65 OFF",
  subtitle: "Use o cupom abaixo e finalize sua compra agora.",
  imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
  priceOriginal: "R$ 209,80",
  priceDiscount: "R$ 144,80",
  ctaLabel: "Adicionar ao carrinho",
  ctaUrl: "https://pulsionperformance.com/products/day-n-night",
  applyCoupon: true,
  coupon: {
    code: "TYXTER10",
  },
  enableVariants: false,
  variants: [],
  enableSubscription: false,
  enableOneTimePurchase: true,
  quantityOptions: [],
  enableSubscriptionPlans: false,
  subscriptionPlans: [],
  behavior: {
    showAfterSeconds: 5,
  },
  customColors: {
    popupBackground: "#FFFFFF",
    ctaBackground: "#2C928A",
    couponBackground: "#FEF3C7",
    couponTextColor: "#92400E",
    priceBoxBackground: "#D1FAE5",
    priceBoxTextColor: "#065F46",
  },
  typography: {
    title: {
      fontFamily: "Montserrat",
      fontSize: "28px",
      color: "#111111",
    },
    subtitle: {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#666666",
    },
    coupon: {
      fontFamily: "Montserrat",
      fontSize: "24px",
      color: "#92400E",
    },
  },
};
