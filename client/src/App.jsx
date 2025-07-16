import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FilterForm from './components/FilterForm';
import OutputPage from './OutputPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OAuthCallbackPage from './OAuthCallbackPage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<FilterForm />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/auth/callback" element={<OAuthCallbackPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
