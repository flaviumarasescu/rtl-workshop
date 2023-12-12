import { NavLink } from "react-router-dom";

 const Nav = () => {
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/login">About</NavLink>
            </li>
            <li>
                <NavLink to="/signup">Contacts</NavLink>
            </li>
        </ul>
    );
}

export default Nav