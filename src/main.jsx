import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';

const App = () => (
  <div className="min-h-screen bg-dark-900 flex items-center justify-center">
    <div className="glass-card p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold text-primary mb-4 text-center font-poppins">
        School Management System
      </h1>
      <p className="text-text-secondary text-center mb-6">
        Advanced platform for modern educational institutions
      </p>
      <div className="flex gap-4 justify-center">
        <button className="btn-primary">Get Started</button>
        <button className="btn-secondary">Learn More</button>
      </div>
    </div>
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);