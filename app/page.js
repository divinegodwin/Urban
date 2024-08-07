'use client'

import Navbar from "./components/Navbar";
import LandingPage from './LandingPage/page';
import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingItem = cart.find((cartItem) => cartItem.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div>
      
      <LandingPage />
     
      {/* Pass cart and addToCart to other components if needed */}
    </div>
  );
}
