import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useSongsQueue } from "../../contexts/songsQueue";
function UploadSongsBtn() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { setSongsList } = useSongsQueue();

  const clickHandler = () => {
    if (!isAuthenticated) return navigate("/login");
    setSongsList([]);
    return navigate("/upload-song");
  };
  return (
    <div
      onClick={clickHandler}
      className={`text-foreground cursor-pointer flex justify-between items-center gap-0.5 border border-muted py-0.5 px-1.5 rounded-2xl sm:px-2.5  `}
    >
      <FiUpload size={14} strokeWidth={1.5} color={`#ef1960`} />
      <span className="font-semibold text-[8px] sm:text-sm">Songs</span>
    </div>
  );
}

export default UploadSongsBtn;
