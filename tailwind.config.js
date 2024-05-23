/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    screens: {
      pn: "130px",
      vs: "200px",
      ss: "360px",
      pp: "500px",
      sm: "821px",
      md: "1180px",
      lg: "1440px",
      xl: "1536px",
    },
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
      },
      backgroundImage: {
        bggg: "url('./assets/image/memberback.png')",
        prosite: "url('./assets/image/prositepopup.png')",
        loginbg: "url('./assets/image/loginbg.png')",
        membership: "url('./assets/image/somem.png')",
        customerlight: "url('./assets/image/customerlight.png')",
        customerdark: "url('./assets/image/customer.png')",
        locationlight: "url('./assets/image/locationlight.png')",
        locationdark: "url('./assets/image/location.png')",
        communitymemberdark: "url('./assets/image/community-member.png')",
        communitymemberlight: "url('./assets/image/members.png')",
        premiumM: "url('./assets/image/premiumM.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        'gradient-start': '#A2FACF',
        'gradient-end': '#64ACFF',
        'gradient-month-1': '#4880FF',
        'gradient-month-2': '#EC009C',
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}