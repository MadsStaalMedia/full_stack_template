import { NavLink } from "react-router";

export function NavMenu() {
    return (<div className="flex-col gap-2">
        <NavLink
            to="/"
            className={({ isActive }) =>`block px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "text-blue-500 bg-gray-200" : ""}`}
        >
            Hjem
        </NavLink>
        <NavLink
            to="/personale"
            className={({ isActive }) =>`block px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "text-blue-500 bg-gray-200" : ""}`}
            >
            Personale
        </NavLink>
        <NavLink
            to="/grupper"
            className={({ isActive }) =>`block px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "text-blue-500 bg-gray-200" : ""}`}
            >
            Personalegrupper
        </NavLink>
    </div>)
}