import Navbar from "../components/shared/Navbar"
import "./index.css"
import SplitTextHeader from "../components/SplitText"

export default function App() {
  return (
    <div className="text-white relative min-h-screen bg-red-500 from-purple-600 to-blue-600">
      <Navbar />
      <div className="w-90.25">
        <SplitTextHeader />
      </div>
      <div className="p-8">
        
        {/* Add more content that will show through the glass */}
        <div className="">
          <p className="font-inter">Testing inter</p>
          <p className="font-neue">Testing haaas</p>
        </div>
      </div>
      <div className="w-full min-h-screen bg-yellow-300" />
      <div className="w-full min-h-screen bg-blue-300" />
      <div className="w-full min-h-screen bg-green-300" />
      <div className="w-full min-h-screen bg-cyan-300" />
    </div>
  )
}