import { Link } from 'react-router-dom'
import '../../App.css'
import logo from "../../assets/ribbitPlayerLogo.png"

function SiteBrand({leftNavBarRef}) {
  return (
    <div className=' flex gap-2 '>
        <div className="logo">
          <Link href="/">
          <img src={logo} className="base h-24 object-cover w-28"   alt="logo of the website" />
          </Link>
        </div>
    </div>
  )
}

export default SiteBrand