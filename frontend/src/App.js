import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "./App.css";
import { Intro } from "./components/site/Intro";
import { Nav } from "./components/site/Nav";
import { Hero } from "./components/site/Hero";
import { Stats, Vision, Approach, Impact, Stories, Partners, Banner, Involved } from "./components/site/Sections";
import { Interventions } from "./components/site/Interventions";
import { Footer } from "./components/site/Footer";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
};

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Vision />
      <Approach />
      <Interventions />
      <Impact />
      <Stories />
      <Partners />
      <Involved />
      <Banner />
    </main>
  );
}

function App() {
  useLenis();
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollTop />
        <Intro />
        <Nav />
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
