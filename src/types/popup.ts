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

  behavior: {
    showAfterSeconds: number;
  };

  customColors: {
    popupBackground: string;
    ctaBackground: string;
    couponBackground: string;
    couponTextColor: string;
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
  behavior: {
    showAfterSeconds: 5,
  },
  customColors: {
    popupBackground: "#FFFFFF",
    ctaBackground: "#2C928A",
    couponBackground: "#FEF3C7",
    couponTextColor: "#92400E",
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
