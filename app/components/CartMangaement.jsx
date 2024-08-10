import { useState, useEffect } from 'react';
import Products from './Products';
import Cart from './Cart';
import supabase from '../supabaseClient';

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState('')

  useEffect(()=>{
    const getUser = async () =>{
      const{data:{user}} = await supabase.auth.getUser()
      if(user){
          setUser(user)
      }
    }
    getUser()
  })

  const addToCart = async(product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if(existingItem){
      try{
          const{data, error} = await supabase.from('cart').update({quantity: existingItem.quantity+1}).eq('id', existingItem.id)
      }catch{

      }
    }
  };

  return (
    <div>
      <Products addToCart={addToCart} />
      <Cart cart={cart} />
    </div>
  );
};

export default App;
