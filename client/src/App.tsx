import FeatureSection from "./components/Feature-Section";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";



export default function App() {
  return (
    <div className="">
      <div className='grid-background'></div>
      <NavBar />
      <HeroSection />

      <FeatureSection />
    </div>
  )
}
