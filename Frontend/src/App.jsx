import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Landing from './components/Pages/Landing';
import Footer from './components/footer/Footer';
import Registration from './components/registration/Registration';
import TestPage1 from './components/testpages/TestPage1';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/userlogin" element={<Registration />} />
        <Route path="/testpage1" element={<TestPage1 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
