import  { useContext, useState } from 'react'
import {playBarContext} from "./contexts"

function PlayerContextP({children}) {
  const [currentSong, setCurrentSong] = useState("")

  return (
    <playBarContext.Provider value={{currentSong, setCurrentSong}}>
        {children}
    </playBarContext.Provider>

  )
}

const usePlayBar=()=>{
     const context = useContext(playBarContext)
     return context
}

export default PlayerContextP
export {  usePlayBar }
