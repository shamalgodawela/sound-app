import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sound from "./pages/sound";
import Soundeffect from "./pages/Soundeffect";




export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        
     
        <Route path="/" element={<Sound />} />
        <Route path="/eff" element={<Soundeffect />} />

        

        
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
