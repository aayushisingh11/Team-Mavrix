import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

interface Activity {
  id?: number;
  time: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  price?: number;
  location?: string;
  rating?: number;
  bookable?: boolean;
  coordinates?: [number, number];
  localGuide?: string;
  quantity?: number;
}

interface CartContextType {
  cart: Activity[];
  addToCart: (activity: Activity) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Activity[]>([]);

  const addToCart = (activity: Activity) => {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.title === activity.title && item.time === activity.time);
    
    if (existingItem) {
      // If exists, increase quantity
      updateQuantity(existingItem.id!, (existingItem.quantity || 1) + 1);
      toast.success(`Increased quantity of ${activity.title}`);
    } else {
      // If new item, add to cart
      const cartItem = {
        ...activity,
        id: Date.now() + Math.random(),
        quantity: 1
      };
      setCart(prevCart => [...prevCart, cartItem]);
      toast.success(`${activity.title} added to cart!`);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Cart cleared');
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}