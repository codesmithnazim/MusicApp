import '../../App.css'
import logo from "../../assets/logo.png"

function SiteBrand() {
  return (
    <div className='mx-auto flex gap-2 '>
        <div className="logo">
          <a href="#">
          <img src={logo} className="base h-25 object-cover" width={120}  alt="logo of the website" />
          </a>
        </div>
    </div>
  )
}

export default SiteBrand