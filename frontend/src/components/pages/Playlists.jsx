import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthProvider";

function Playlists() {
  const { isAuthenticated, setUser } = useAuth();
    if(!isAuthenticated){
     return <Navigate to={`/login`} replace />

  }
  return (
    <div>Playlists page</div>
  )
}

export default Playlists