import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
import { BsTiktok } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { Outlet, useParams } from "react-router-dom";
import ProfileTab from "../../ui/ProfileTab";

function ProfileMainPage() {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-5">
      <div className="bio flex gap-4 border border-red-400 ">
        <div className="pic">
          <img
            src="../../../../Upload Music.png"
            alt="the profile picture"
            className="h-40 w-40 rounded-full border border-white object-contain"
          />
        </div>
        <div className="bio flex flex-col gap-3 w-130">
          <div className="name">Ali zaman Khan</div>
          <div className="short-def">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ullam
            consectetur libero at eaque temporibus soluta asperiores, quam
            tenetur magni.
          </div>
          <div className="links grid gap-x-2 text-foreground  grid-cols-[80px_30px_30px_30px_30px_30px]  grid-rows-2 w-80 border border-red-800 items-center gap-y-2 content-start">
            <button className="bg-primary text-white px-3 rounded-sm py-1 w-fit row-span-2 self-start">
              Follow{" "}
            </button>
            <a href="https:/wow.com" className="text-foreground" size={30}>
              {<BiLogoFacebook />}
            </a>
            <a href="https:/.com" className="text-foreground" size={20}>
              {<BsTiktok />}
            </a>
            <a href="https:/wow.com" className="text-foreground" size={30}>
              {<BiLogoLinkedin />}
            </a>
            <a href="https:/.com" className="text-foreground" size={20}>
              {<BsTiktok />}
            </a>
            <a href="https:/wow.com" className="text-foreground" size={30}>
              {<BiLogoLinkedin />}
            </a>
            <a
              href="https:/wow.com"
              className="text-foreground rotate-"
              size={35}
            >
              {<CiShare2 strokeWidth={0.8} />}
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="links flex gap-10 ">
          <ProfileTab to={"songs"} name={"songs"}/>
          <ProfileTab to={"followers"} name={"followers"} />
          <ProfileTab to={"followings"} name={"followings"} />
        </div>
        <div className="w-full border-t border-t-partitioner"></div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileMainPage;
