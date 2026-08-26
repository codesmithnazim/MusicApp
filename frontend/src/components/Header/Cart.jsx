import { PiShoppingCartSimple } from "react-icons/pi";
import  { useState } from 'react'

function Cart() {
    const [cartItems, setCartItems] = useState(0)
  return (
    <div className="relative">
    <PiShoppingCartSimple  size={22} />
    <div className={`absolute -top-3 left-2 bg-primary text-white text-[12px] p-2 w-5 h-5 rounded-full flex items-center justify-center`}>{cartItems}</div>
    </div>
  )
}

export default Cart