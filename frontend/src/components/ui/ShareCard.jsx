import { useState } from "react";
import { CiHeart, CiPlay1 } from "react-icons/ci";
import { GoPerson } from "react-icons/go";

export default function ShareCard({ user, onclose }) {
  const [copied, setCopied] = useState(false);

  console.log("user details from the share card componennt ", user )

  const url = `${window.location.origin}/user/${user.id}/songs`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onclose}
    >
      <div
        className="w-[90%] max-w-105 rounded-xl bg-neutral-900 p-6 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-4 text-lg font-semibold">Share</h3>

        <div className="mb-5 flex items-center gap-4">
          <img
            src={user?.profilePicture}
            alt={`${user?.name} profile picture`}
            className="size-22 rounded-lg object-cover object-center"
          />
          <div>
            <p className="font-bold">{user?.name}</p>
            {/* <p className="mt-1 text-neutral-400">{user.artist}</p> */}
            <div className="flex  items-center gap-3 text-xs">
            <div className="flex items-center gap-0.5 cursor-pointer" title={`${user?.totalFollowers} followers`}><GoPerson/> {user?.totalFollowers}</div>
            <div className="flex items-center gap-0.5 cursor-pointer" title={`${user?.likes} likes`}><CiHeart/> {user?.likes}</div>
            <div className="flex items-center gap-0.5 cursor-pointer" title={`${user?.totalSongs} songs`}><CiPlay1/> {user?.totalSongs}</div>

            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
            className="flex-1 rounded-md bg-neutral-800 p-2.5 text-sm outline-none"
          />
          <button
            onClick={copy}
            className="rounded-md bg-white px-4 font-semibold text-black hover:bg-neutral-200 cursor-pointer"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}