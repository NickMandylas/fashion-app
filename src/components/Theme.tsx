import { BaseTheme, createText, createTheme } from "@shopify/restyle";

const theme: BaseTheme = {
  colors: {
    primary: "#2CB9B0",
    title: "#0C0D34",
    body: "rgba(12, 13, 52, 0.7)",
    white: "white",
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {},
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: "SFProText-Bold",
      color: "white",
      textAlign: "center",
    },
    title: {
      fontSize: 28,
      fontFamily: "SFProText-SemiBold",
      color: "title",
    },
    title2: {
      fontSize: 22,
      lineHeight: 28,
      fontFamily: "SFProText-SemiBold",
      color: "title",
    },
    body: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: "SFProText-Regular",
      color: "body",
    },
  },
};

export type Theme = typeof theme;
export const Text = createText<Theme>();
export default theme;
