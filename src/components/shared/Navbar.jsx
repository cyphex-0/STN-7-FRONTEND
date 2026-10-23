import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { getToken, clearToken } from "../../utils/auth";
import { getMe } from "../../services/auth.api";

export default function Navbar() {
    const navigate = useNavigate();
    const token = getToken();
    const [me, setMe] = useState(null);

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-primary font-semibold"
            : "text-base-content/70 hover:text-primary transition-colors";

    const handleLogout = () => {
        clearToken();
        setMe(null);
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        const loadMe = async () => {
            if (!token) return setMe(null);
            try {
                const res = await getMe();
                setMe(res.data);
            } catch {
                clearToken();
                setMe(null);
            }
        };
        loadMe();
    }, [token]);

    const initials = me?.name
        ? me.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
        : "U";

    return (
        <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
            <div className="navbar max-w-6xl mx-auto px-2">

                {/* LEFT: Logo */}
                <div className="navbar-start">
                    <Logo />
                </div>

                {/* CENTER: Desktop menu */}
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal gap-1">
                        <li><NavLink className={navLinkClass} to="/" end>Home</NavLink></li>
                        <li><NavLink className={navLinkClass} to="/courses">Courses</NavLink></li>

                        {/* ✅ Dashboard when logged in OR when dev_bypass is active */}
                        {(token && me) ? (
                            <li>
                                <NavLink
                                    className={navLinkClass}
                                    to={me.role === "admin" ? "/admin" : "/student"}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        ) : (localStorage.getItem("dev_bypass") === "true") ? (
                            <>
                                <li><NavLink className={navLinkClass} to="/student">Student Portal</NavLink></li>
                                <li><NavLink className={navLinkClass} to="/admin">Admin Portal</NavLink></li>
                            </>
                        ) : null}
                    </ul>
                </div>

                {/* RIGHT */}
                <div className="navbar-end gap-2">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Desktop buttons if NOT logged in */}
                    {!token && (
                        <div className="hidden md:flex gap-2">
                            <Link to="/login" className="btn btn-sm btn-ghost cursor-pointer">Login</Link>
                            <Link to="/register" className="btn btn-sm btn-primary cursor-pointer">Enroll Now</Link>
                        </div>
                    )}

                    {/* Desktop avatar if logged in */}
                    {token && me && (
                        <div className="hidden md:block dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar focus:outline-none">
                                <div className="w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-primary/20">
                                    {initials}
                                </div>
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu z-50 mt-3 p-2 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-300"
                            >
                                <div className="px-3 py-2 border-b border-base-200 mb-1">
                                    <p className="font-semibold text-base-content text-sm">{me.name}</p>
                                    <p className="text-xs text-base-content/70 truncate">{me.email}</p>
                                    <span className="badge badge-xs badge-outline mt-1.5 capitalize">{me.role}</span>
                                </div>

                                <li>
                                    <Link
                                        to={me.role === "admin" ? "/admin" : "/student"}
                                        className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg font-medium cursor-pointer hover:bg-base-200 transition-colors"
                                    >
                                        <LayoutDashboard className="w-4 h-4 text-primary" />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg font-medium text-error hover:bg-error/10 cursor-pointer w-full text-left transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Mobile hamburger */}
                    <div className="dropdown dropdown-end md:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="
                menu menu-sm dropdown-content z-50 mt-3 p-3 shadow-2xl
                bg-base-100 rounded-2xl w-60 border border-base-300
              "
                        >
                            <li><NavLink className={navLinkClass} to="/" end>Home</NavLink></li>
                            <li><NavLink className={navLinkClass} to="/courses">Courses</NavLink></li>

                            {/* ✅ Dashboard only when logged in */}
                            {token && me && (
                                <li>
                                    <NavLink
                                        className={navLinkClass}
                                        to={me.role === "admin" ? "/admin" : "/student"}
                                    >
                                        <LayoutDashboard className="w-4 h-4 text-primary" />
                                        <span>Dashboard</span>
                                    </NavLink>
                                </li>
                            )}

                            <div className="my-2 w-full border-t border-base-300" />

                            {!token ? (
                                <>
                                    <li className="w-full">
                                        <Link to="/login" className="btn btn-ghost btn-sm w-full cursor-pointer">Login</Link>
                                    </li>
                                    <li className="w-full">
                                        <Link to="/register" className="btn btn-primary btn-sm w-full cursor-pointer">Enroll Now</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col items-center gap-1 py-2 text-center">
                                        <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold text-sm">
                                            {initials}
                                        </div>
                                        <p className="font-semibold text-sm">{me?.name}</p>
                                        <p className="text-xs text-base-content/70">{me?.email}</p>
                                        <span className="badge badge-xs badge-outline mt-1 capitalize">{me?.role}</span>
                                    </div>

                                    <div className="my-2 w-full border-t border-base-300" />

                                    <li className="w-full">
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="btn btn-ghost btn-sm w-full text-error hover:bg-error/10 cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                </div>
            </div>
        </header>
    );
}
