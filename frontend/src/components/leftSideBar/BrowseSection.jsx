import PriButton from "../ui/PriButton";
import { LayoutGrid } from 'lucide-react';
import { BiLoaderCircle } from "react-icons/bi";
import { IoMdTrendingUp } from "react-icons/io";



function BrowseSection() {
  return (
    <div className="flex flex-col gap-1 pb-2">
      <PriButton content={"Discover"} Icon={<LayoutGrid strokeWidth={1.6} size={22}/>} />
      <PriButton content={"Browse"} Icon={<BiLoaderCircle strokeWidth={0.2} size={25}/>} />
      <PriButton content={"trend"} Icon={<IoMdTrendingUp strokeWidth={0.2} size={25}/>} />
    </div>
  );
}

export default BrowseSection;
