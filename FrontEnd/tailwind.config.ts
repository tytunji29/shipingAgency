import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'DmSansRegular': ['DMSansRegular', 'sans-serif'],
        'DmSansMedium': ['DMSansMedium', 'sans-serif'],
        'DmSansSemiBold': ['DMSansSemiBold', 'sans-serif'],
        'DmSansBold': ['DMSansBold', 'sans-serif'],
        'DMSansExtraBold18': ['DMSansExtraBold18', 'sans-serif'],
        'DMSansExtraBold24': ['DMSansExtraBold24', 'sans-serif'],
        'HankenRegular': ['HankenRegular', 'sans-serif'],
        'HankenMedium': ['HankenMedium', 'sans-serif'],
        'HankenSemiBold': ['HankenSemiBold', 'sans-serif'],
        'HankenBold': ['HankenBold', 'sans-serif'],
        'HankenExtraBold': ['HankenExtraBold', 'sans-serif'],
        'HankenBlack': ['HankenBlack', 'sans-serif'],

      }

    },
  },
  plugins: [],
} satisfies Config;
