import { NavLink } from "react-router";

export function NavMenu() {
    return (<NavLink
            to="/personale"
            className={({ isActive }) => isActive ? "text-blue-500" : ""}
            >
            Personale
        </NavLink>)
}