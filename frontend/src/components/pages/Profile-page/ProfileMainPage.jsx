// import { BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";
// import { BsTiktok } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { Outlet, useParams } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import ProfileTab from "../../ui/ProfileTab";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../../services/users.service";
import { useAuth } from "../../../contexts/AuthProvider.jsx";
import FollowButton from "../../ui/FollowButton.jsx";
import { useState } from "react";
import ShareCard from "../../ui/ShareCard.jsx";
import Avator from "../../utils/Avator.jsx";

function ProfileMainPage() {
  const [showShare, setShowShare] = useState(false);
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const { data } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => usersService.getProfile(id),
    staleTime: 3 * 60 * 1000,
  });

  const profileDetails = data?.profileDetails;

  const uploadPicHandler = () => {
    const img = document.createElement("input");
    // img.name="profilePicture"
    img.type = "file";
    img.accept = "image/*";
    img.click();
    img.addEventListener("change", async () => {
      if (img.files) {
        console.log(img.files);
        try {
          const { profilePicture } = await usersService.updateProfilePicture(
            id,
            img.files[0],
          );
          profileDetails.profilePicture = profilePicture;
          // user.profilePicture= profilePicture
          setUser((prev) => {
            return { ...prev, profilePicture: profilePicture };
          });
        } catch (error) {
          console.error("error while uploading the profile picture ", error);
        }
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 font-tiktok ">
      <div className="bio flex gap-4 border border-red-400 items-start">
        <div className="picAndEditPencil relative">
          <Avator user={profileDetails} size={40} />
          {user?.id === id && (
            <FaPencil
              className="absolute bottom-8 right-0 rotate-27 cursor-pointer"
              onClick={uploadPicHandler}
              size={20}
            />
          )}
        </div>
        <div className="bio flex flex-col gap-3 w-130">
          <div className="name text-[22px] font-semibold">
            {profileDetails?.name}
          </div>
          <div className="short-def">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ullam
            consectetur libero at eaque temporibus soluta asperiores, quam
            tenetur magni.
          </div>
          <div className=" links grid gap-x-3 text-foreground  grid-cols-[80px_30px_30px_30px_30px_30px]  grid-rows-[30px_15px] w-80  gap-y-2 items-center content-center">
            {user?.id === profileDetails?.id ? (
              <button className="text-primary bg-background  py-1 w-fit row-span-2 self-start border border-primary rounded-md font-medium px-5">
                Edit
              </button>
            ) : (
              <FollowButton artist={profileDetails} />
            )}
            <button
              className="text-foreground cursor-pointer "
              onClick={() => setShowShare(true)}
            >
              {<CiShare2 strokeWidth={0.8} />}
            </button>
          </div>
        </div>
      </div>
      {showShare && (
        <ShareCard user={profileDetails} onclose={() => setShowShare(false)} />
      )}
      <div className="flex flex-col gap-2">
        <div className="links flex gap-10 ">
          <ProfileTab to={"songs"} name={"songs"} />
          <ProfileTab to={"followers"} name={"followers"} />
          <ProfileTab to={"favorites"} name={"favorites"} />
        </div>
        <div className="w-full border-t border-t-partitioner"></div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileMainPage;
