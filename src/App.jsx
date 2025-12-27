import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from "./screens/clients/LandingPage";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Spinner loading={loading} />
      {!loading && (
        <Routes>
          <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
