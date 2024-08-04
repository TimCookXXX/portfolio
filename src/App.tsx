import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Intro from "./components/Intro/Intro";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const hasSeenPreview = sessionStorage.getItem("hasSeenPreview");
    if (hasSeenPreview) {
      setShowContent(true);
    }
  }, []);

  const handlePreviewComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      <Intro onComplete={handlePreviewComplete} />
      {showContent && <Home />}
    </>
  );
};

export default App;
