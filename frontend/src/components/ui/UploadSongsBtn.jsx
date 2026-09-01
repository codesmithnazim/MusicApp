import { FiUpload } from "react-icons/fi";
import {  useNavigate } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeProvider";
import { useAuth } from "../../contexts/AuthProvider";
function UploadSongsBtn() {
  const { isDark } = useThemeContext();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const clickHandler = () => {
    if (!isAuthenticated) return navigate("/login");
    return navigate("/upload-song")
    
  };
  return (
    <div
      onClick={clickHandler}
      className={`${isDark ? "dark" : ""} text-foreground cursor-pointer flex justify-between items-center gap-2 border border-muted py-1 px-3 rounded-2xl`}
    >
      <FiUpload size={16} strokeWidth={1.8} color={`#ef1960`} />
      <span className="font-semibold">Songs</span>
    </div>
  );
}

export default UploadSongsBtn;
