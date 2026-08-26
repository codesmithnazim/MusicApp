import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useThemeContext } from "../../contexts/ThemeContext";

function Header() {
  const [query, setQuery] = useState("");
  const { isDark } = useThemeContext();
  const changeInput = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className=" p-5 border-b border-b-zinc-200 flex">
      <div
        className={`${isDark ? "dark" : ""} searchBar flex items-center gap-3 h-7 w-100 p-5 bg-sbBackground backdrop-blur-lg  border-white/20 rounded-lg`}
      >
        <CiSearch
          size={24}
          className={`${isDark ? "dark" : ""} text-foreground`}
        />
        <input
          className={`${isDark ? "dark" : ""} flex-1 outline-none`}
          type="text"
          value={query}
          onChange={changeInput}
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default Header;
