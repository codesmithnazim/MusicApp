import Featured from "./components/Featured";
import RSBMain from "./components/rightSideBar/RSBMain";
import WhatIsNew from "./WhatIsNew";

// Discover-Main.jsx
function Discover() {
  return (
    <div className="discover-page flex flex-col min-w-0 w-full max-w-full overflow-x-hidden border-2 border-red-700 xl:flex-row">
      <div className="flex flex-col  w-full p-3 border border-blue-700 lg:w-5/6">
        <Featured />
        <WhatIsNew />
      </div>
      <RSBMain />
    </div>
  );
}

export default Discover;
