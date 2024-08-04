import About from "../About/About";
import Experience from "../Experience/Experience";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Player from "../Player/Player";
import Portfolio from "../Portfolio/Portfolio";
import Skills from "../Skiils/Skills";

const Home = () => {
  return (
    <>
      <Player />
      <Hero name="Tim" title="Frontend Developer" nextSectionId="about" />
      <About id="about" />
      <Portfolio />
      <Experience />
      <Skills />
      <Footer />
    </>
  );
};

export default Home;
