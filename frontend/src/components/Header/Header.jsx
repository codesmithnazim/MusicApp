import { useState } from "react";
import Searchbar from "./Searchbar";
import Cart from "./Cart";
import ProfileSection from "./ProfileSection";

function Header() {
  return (
    <div className="border-b border-b-partitioner flex justify-between px-10 py-3 items-center">
      {/* <div className={`${isDark? "dark":""} border-b border-b-muted flex justify-between px-10 py-3`}> */}
      <Searchbar />
      <div className="flex gap-5 justify-between items-center">
        <Cart />
        <ProfileSection />
      </div>
    </div>
  );
}

export default Header;
