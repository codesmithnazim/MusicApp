import { useAuth } from "../../contexts/AuthProvider"

function Avator() {
    const {user}= useAuth()
    console.log("user from the avator", user)
  return (
    <div>Avator</div>
  )
}

export default Avator