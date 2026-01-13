import "../index.css"
import Navbar from "../Components/Navbar"
import HeroSection from "../Components/HomeComponents/HeroSection"
import PersonalBusiness from "../Components/HomeComponents/Personal-Business"
import Partners from "../Components/HomeComponents/OurPartners"
import Features from "../Components/HomeComponents/Features"
import Lifestyle from "../Components/HomeComponents/Lifestyle"
import Everything from "../Components/HomeComponents/Everything"
import FrequentlyAskedQuestions from "../Components/HomeComponents/FAQ"

export default function Home() {

  return (
    <main className="bg-red-200">
      <Navbar />
      <HeroSection />
      <PersonalBusiness />
      <Partners />
      <Features />
      <Lifestyle />
      <Everything />
      <FrequentlyAskedQuestions />
    </main>
  )
}