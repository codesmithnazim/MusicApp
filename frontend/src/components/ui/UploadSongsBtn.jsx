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
      className={`text-foreground cursor-pointer flex justify-between items-center gap-2 border border-muted py-1 px-3 rounded-2xl`}
    >
      <FiUpload size={16} strokeWidth={1.8} color={`#ef1960`} />
      <span className="font-semibold">Songs</span>
    </div>
  );
}

export default UploadSongsBtn;
