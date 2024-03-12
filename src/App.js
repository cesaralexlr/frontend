import './App.css';

import React from 'react';
import { DarkModeProvider } from './components/DarkModeContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import MedicationForm from './components/MedicationForm';
import Navbar from './components/Navbar';
import PrivacyDisclosure from './components/PrivacyDisclosure';


function App() {
  return (
    <DarkModeProvider>
      <div className="flex flex-col h-screen">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/medication" element={<MedicationForm />} />
            <Route path="/" element={<PrivacyDisclosure />} />
          </Routes>
        </Router>
      </div>
    </DarkModeProvider>
  );
}

export default App;
