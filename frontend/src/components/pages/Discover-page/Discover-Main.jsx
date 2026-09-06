import Featured from "./components/Featured";
import RSBMain from "./components/rightSideBar/RSBMain";

function Discover() {
  return (
    <div className="discover-page flex flex-row p-8">
      <div className="flex-1 flex flex-col">
        <Featured />
      </div>
      <RSBMain />
    </div>
  );
}

export default Discover;
