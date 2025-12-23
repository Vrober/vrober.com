'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('vroberCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('vroberCart', JSON.stringify(cart));
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    }
  }, [cart, isLoading]);

  const addToCart = (service) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === service._id);

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === service._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...service, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (serviceId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== serviceId));
  };

  const updateQuantity = (serviceId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === serviceId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isLoading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
