import { PiShoppingCartSimple } from "react-icons/pi";
import  { useState } from 'react'

function Cart() {
    const [cartItems, setCartItems] = useState(0)
  return (
    <div className="relative">
    <PiShoppingCartSimple  className="text-xs sm:text-sm"/>
    <div className={`absolute -top-3 left-2 bg-primary text-white text-[8px] p-1.5 w-2 h-2 rounded-full flex items-center justify-center `}>{cartItems}</div>
    </div>
  )
}

export default Cart