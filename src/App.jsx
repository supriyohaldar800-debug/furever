// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import PetCare from './pages/Petcare';
import Shop from './pages/Shop';
import Vet from './pages/Vet';
import CareDetails from './components/PetCare/CareDetails';
import CareSection from './components/PetCare/CareSection';
import CreateProductForm from './components/Shop/CreateProductForm';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pet-care" element={<PetCare />} />
             <Route path="/care/:petType" element={<CareSection />} />
            <Route path="/care/:petType/:section" element={<CareDetails />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/create" element={<CreateProductForm />} />
            <Route path="/vet" element={<Vet />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}

export default App;