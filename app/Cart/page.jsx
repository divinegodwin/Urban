"use client";
import supabase from "../supabaseClient";
import useUserAuth from "../Auth/useUserAuth";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../Loader";
const Cart = () => {
  const user = useUserAuth();

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user.id) return;
      try {
        const { data, error } = await supabase
          .from("Carts")
          .select()
          .eq("user_id", user.id);
        if (error) throw error;
        setCarts(data);
      } catch (error) {
        console.log("error occured fetching cart data", error);
      }
    };
    fetchCart();
  },[user]);

  const [orderQuantity, setOrderQuantity] = useState(1)
  const addQuantity = () =>{
      setOrderQuantity((previousQuantity)=> previousQuantity+1)
  }

 
  const removeQuantity = () =>{
    if(orderQuantity > 0){
    setOrderQuantity((previousQuantity)=> previousQuantity-1)
    }
    }
// get number of products
    const [totalProducts, setTotalProducts] = useState(0)
    useEffect(() => {
      const countUniqueProducts = () => {
        const uniqueProducts = new Set(carts.map(cart => cart.product_id));
        setTotalProducts(uniqueProducts.size);
      };
      countUniqueProducts();
    }, [carts]);
// get total number of prices
    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(()=>{
      const checkTotalPrice = () =>{
        const sumPrices = carts.reduce((acc, current)=> acc +current.price, 0)
        setTotalPrice(sumPrices)
      }
      checkTotalPrice()
    },[carts])

  return (
    <div>
      <Navbar />

      <div className="bg-[#F3FAE1] p-4 flex text-[#000] mt-[4.5rem] justify-between">
        <p>Subtotal</p>
        <p className="font-bold">{totalPrice}</p>
      </div>

      <div className="p-4">
       
          <p>Cart ({totalProducts})</p>
      
      </div>

      {carts && carts.length > 0 ? (
        <div className="h-[180px] w-[95%] rounded-lg m-auto p-2 bg-[#F3FAE1] ">
         
         <div className="float-right mr-4 mt-2">
           <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            class="main-grid-item-icon"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          </div>

          {carts.map((cart) => (
            <div className="flex mt-6">
              <div className="h-[80px] w-[80px] mt-6 ml-1">
                <img
                  src={cart.image_url}
                  className="w-full overflow-hidden"
                ></img>
              </div>
              <div className="flex-col gap-5 m-auto">
                <p>{cart.description}</p>
                <p className="text-md font-bold">
                  {cart.currency}
                  {cart.price}
                </p>
                <p className="text-[#1746c3]">Few units left </p>
              </div>

            </div>
          ))}
           <div className="flex gap-3 mt-2 float-right mr-4">
              <p className="text-md">Quantity</p>
              <svg
               onClick={removeQuantity}
               className="w-[30px]"
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
              <p className="text-lg">{orderQuantity}</p>
              <svg
              onClick={addQuantity}
              className="w-[30px] ml-1"
                data-slot="icon"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
            </div>
        </div>
      ) : (
        <p className="text-center mt-8">Loading carts....</p>
       
      )}
    </div>
  );
};

export default Cart;
