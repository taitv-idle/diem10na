import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import StudentLookup from './pages/StudentLookup';
import BulkSearch from './pages/BulkSearch';
import Statistics from './pages/Statistics';
import TopScores from './pages/TopScores';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lookup" element={<StudentLookup />} />
            <Route path="/bulk-search" element={<BulkSearch />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/top-scores" element={<TopScores />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 