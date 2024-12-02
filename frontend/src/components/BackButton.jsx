import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";


function BackButton() {
  return (
    <div className="flex">
        <Link to={'/'}
        className='bg-sky-800 text-white px-4 py-1 rounded-lg'
        >
        <BsArrowLeft className="text-2xl" />
        </Link>
    </div>
  )
}

export default BackButton
