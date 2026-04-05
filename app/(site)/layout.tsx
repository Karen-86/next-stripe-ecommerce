import { Header, Footer } from "@/components/index";
import CartSheet from "./CartSheet";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CartSheet />
      <Footer />
    </>
  );
}


