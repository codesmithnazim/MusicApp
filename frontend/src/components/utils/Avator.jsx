import { Link } from "react-router-dom";

function Avator({ user, size = 9 }) {
  const sizeMap = {
    6: "w-6 h-6",
    8: "w-8 h-8",
    9: "w-9 h-9",
    10: "w-10 h-10",
    12: "w-12 h-12",
    16: "w-16 h-16",
    40: "w-40 h-40",
  };

  const sizeClasses= sizeMap[size]

  console.log(
    "inspecting avator for the artists name ",
    user,
    " the height and width of the profile pic = ",
    size,
  );
  if (user?.profilePicture)
    return (
      <Link
        className={`inline-block ${sizeClasses} rounded-full overflow-hidden`}
        key={user.id}
        to={`/user/${user?.details?.id ?? user?.id}/songs`}
      >
        <img
          className={`inline-block h-full w-full object-cover object-center`}
          src={`${user.profilePicture}`}
          alt={`${user.name || user?.details?.name}`}
        />
      </Link>
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
    const index =
      user?.name?.charCodeAt(0) % colors.length ||
      user?.details?.name?.charCodeAt(0) % colors.length ||
      0;
    return colors[index];
  };
  return (
    <Link
      className={`inline-block  ${sizeClasses}   rounded-full overflow-hidden`}
      key={user?.id || user?.details?.id}
      to={`/user/${user?.details?.id ?? user?.id}/songs`}
    >
      <div
        className={`w-full h-full  font-bold flex items-center justify-center text-white w-`}
        style={{ backgroundColor: setColor() }}
      >
        {user?.name?.charAt(0).toUpperCase() ||
          user?.details?.name?.charAt(0).toUpperCase()}
      </div>
    </Link>
  );
}

export default Avator;
// console.log("user from the avator", user)
