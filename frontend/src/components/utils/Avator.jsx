// import { useAuth } from "../../contexts/AuthProvider";

function Avator({user}) {
  // const { user } = useAuth();
  
  console.log('inspecting avator for the artists name ', user)
  if (user?.profilePicture)
    return (
      <div className="w-9 h-9 rounded-full overflow-hidden" key={user.id}>
        <img
          className="h-full w-full object-cover object-top-right"
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
    const index = user?.name?.charCodeAt(0) % colors.length || user?.details?.name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden" key={user.id}>
      <div className={`w-full h-full  font-bold flex items-center justify-center text-white`} style={{backgroundColor: setColor()}}>
        {user?.name?.charAt(0).toUpperCase() || user?.details?.name?.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

export default Avator;
// console.log("user from the avator", user)
