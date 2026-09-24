import Featured from "./components/Featured";
import RSBMain from "./components/rightSideBar/RSBMain";
import WhatIsNew from "./WhatIsNew";

function Discover() {
  return (
    <div className="discover-page flex flex-row  ">
      <div className="flex-1 flex flex-col p-8">
        <Featured />
        <WhatIsNew/>
      </div>
      <RSBMain />
    </div>
  );
}

export default Discover;
