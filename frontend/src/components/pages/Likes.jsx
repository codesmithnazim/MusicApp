import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthProvider"

function Likes() {
  const {isAuthenticated, user}= useAuth()
  if(!isAuthenticated){
     return <Navigate to={`/login`} replace />

  }
  return (
    <div>Likes Page</div>
  )
}

export default Likes