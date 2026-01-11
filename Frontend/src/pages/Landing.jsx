import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import Services from "./components/Services";
import Team from "./components/Team";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Membership from "./components/Membership";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSlider />
        <Services />
        <About />
        <Membership />
        <Reviews />
        <Team />
      </main>

      <Footer />
    </>
  );
}

export default App;