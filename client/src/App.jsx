import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FilterForm from './components/FilterForm';
import OutputPage from './components/OutputPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<FilterForm />} />
          <Route path="/output" element={<OutputPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
