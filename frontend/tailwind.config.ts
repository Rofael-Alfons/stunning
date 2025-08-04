import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'shimmer': 'shimmer 2s infinite linear',
      },
    },
  },
} satisfies Config;