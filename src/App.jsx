import "./index.css"
import Navbar from "../components/shared/Navbar"
import HeroSection from "../components/main/HeroSection"
import PersonalBusiness from "../components/main/Personal-Business-Section"

export default function App() {

  return (
    <main className="">
      <Navbar />
      <HeroSection />
      <PersonalBusiness />
      <div className="h-screen w-full bg-purple-500" />
    </main>
  )
}