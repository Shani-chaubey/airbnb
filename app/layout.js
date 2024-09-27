import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Modal from "@/components/modals/Modal";


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
      <Modal isOpen title="Login Model" actionLabel="Submit" />
      <Navbar />
        {children}
      </body>
    </html>
  );
}
