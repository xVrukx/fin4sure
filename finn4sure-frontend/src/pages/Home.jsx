import Hero from "../components/ui/Hero";
import LoanProductsGrid from "../components/ui/LoanProductsGrid";
import BankCarousel from "../components/ui/carousal";
import { AboutCareersSection } from "./Aboutcareerssection ";

export default function Home() {
  return (
    <>
      <Hero />
      <LoanProductsGrid />
      <BankCarousel />
      <AboutCareersSection/>
      
    </>
  );
}