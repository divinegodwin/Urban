"use client";
import Image from "next/image";
import Link from "next/link";

const Cart = ({ cart }) => {
  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col mt-[8rem]">
        <Image
          className="m-auto"
          src="/empty.png"
          height={500}
          width={500}
          alt="empty cart"
        />
        <div className="flex justify-center">
          <Link href="/Products">
            <button className="w-[200px] h-[60px] text-white text-lg  bg-[#1746c3] rounded-xl p-4">
              continue shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="cart flex-1">
      <h2>Your Cart</h2>

      <ul>
        {cart.map((item) => (
          <li key={item.id} className="flex items-center">
            <img src={item.image} alt={item.title} className="w-20 h-20" />
            <div className="ml-4">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
