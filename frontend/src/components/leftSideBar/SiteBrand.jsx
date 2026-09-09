import '../../App.css'
import logo from "../../assets/ribbitPlayerLogo.png"

function SiteBrand() {
  return (
    <div className=' flex gap-2 '>
        <div className="logo">
          <a href="#">
          <img src={logo} className="base h-24 object-cover w-28"   alt="logo of the website" />
          </a>
        </div>
    </div>
  )
}

export default SiteBrand