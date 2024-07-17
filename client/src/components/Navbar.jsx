import { Link } from 'react-router-dom'
import './navbaar.css'
export default function Navbar() {
    return (
<nav>
    {/* <Link to='/'>Home</Link> */}
    <Link to='/'>Login</Link>
    <Link to='/register'>Register</Link>
</nav>
    )
}