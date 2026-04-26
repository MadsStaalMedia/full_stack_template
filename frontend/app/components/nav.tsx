import { NavLink } from "react-router";

export function NavMenu() {
    return (<div>
        <NavLink
            to="/personale"
            className={({ isActive }) => isActive ? "text-blue-500" : ""}
            >
            Personale
        </NavLink>
        <NavLink
            to="/grupper"
            className={({ isActive }) => isActive ? "text-blue-500" : ""}
            >
            Personalegrupper
        </NavLink>
    </div>)
}