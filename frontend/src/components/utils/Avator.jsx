import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

function Avator() {
  const [, setFirstChr] = useState("");
  const { user } = useAuth();

  if (user.profilePicture)
    return (
      <div className="w-9 h-9 rounded-full overflow-hidden">
        <img
          className="h-full w-full object-contain"
          src={`${user.profilePicture}`}
          alt={`${user.name}`}
        />
      </div>
    );

  const setColor = () => {
    const colors = [
      "#ec4899",
      "#8b5cf6",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
    ];
    const index = user.name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden">
      <div className={`w-full h-full  font-bold flex items-center justify-center`} style={{backgroundColor: setColor()}}>
        {user.name.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

export default Avator;
// console.log("user from the avator", user)
