import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuildPC from './pages/BuildPC';
import Compare from './pages/Compare';
import About from './pages/About';
import BuildGuide from './pages/BuildGuide';
import PartSelector from './pages/PartSelector';

function App() {  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <Navbar />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build" element={<BuildPC />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="/guides" element={<BuildGuide />} />
            <Route path="/parts" element={<PartSelector />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
