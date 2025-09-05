import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { CartProvider } from './components/CartContext';
import { SplitwiseProvider } from './components/SplitwiseContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <SplitwiseProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          {isLoggedIn ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <LoginPage onLogin={handleLogin} />
          )}
        </div>
      </CartProvider>
    </SplitwiseProvider>
  );
}
