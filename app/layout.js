import RegisterModal from "@/components/modals/RegisterModal";
import Navbar from "@/components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";


export const metadata = {
  title: "Airbnb",
  description: "Airbnb Clone",
};

const font = Nunito({
  subsets: ['latin'],
  weight: ["300", "400", "600", "700", "800", "900"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className} >
      <ToasterProvider />
      <RegisterModal />
      <Navbar />
        {children}
      </body>
    </html>
  );
}
