import { Nunito, Montserrat_Alternates } from 'next/font/google'

const nunito = Nunito({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})
const montserrat = Montserrat_Alternates({
  weight: '400',
  subsets: ['latin'],

  variable: '--font-montserrat',
})
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./redux/Providers";
import TokenDataWrapper from "./utilsHelper/Tokenwrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workspace",
  description: "Created By Grovyo Platforms Ltd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${montserrat.variable} select-none ${nunito.variable}`}>
        <Providers>
          <TokenDataWrapper>{children}</TokenDataWrapper>
        </Providers>
        {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
      </body>
    </html>
  );
}
