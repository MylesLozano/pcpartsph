import { useState, useEffect } from "react";
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BuildPC from "./pages/BuildPC";
import Compare from "./pages/Compare";
import About from "./pages/About";
import BuildGuide from "./pages/BuildGuide";
import PartSelector from "./pages/PartSelector";
import PartDetail from "./pages/PartDetail";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("corporate");

  // Initialize theme from localStorage or default
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "corporate";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-base-200 transition-colors duration-300">
        <Header />
        <Navbar />

        {/* Theme selector */}
        <div className="fixed bottom-4 right-4 z-50">
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle m-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button
                  onClick={() => handleThemeChange("corporate")}
                  className={theme === "corporate" ? "active" : ""}
                >
                  Corporate
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={theme === "dark" ? "active" : ""}
                >
                  Dark
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleThemeChange("light")}
                  className={theme === "light" ? "active" : ""}
                >
                  Light
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleThemeChange("cupcake")}
                  className={theme === "cupcake" ? "active" : ""}
                >
                  Cupcake
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleThemeChange("cyberpunk")}
                  className={theme === "cyberpunk" ? "active" : ""}
                >
                  Cyberpunk
                </button>
              </li>
            </ul>
          </div>
        </div>

        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build" element={<BuildPC />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/about" element={<About />} />
            <Route path="/build-guide" element={<BuildGuide />} />
            <Route path="/part-selector/:type?" element={<PartSelector />} />
            <Route path="/part/:id" element={<PartDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
