import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/home';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Home />
  </StrictMode>
);
