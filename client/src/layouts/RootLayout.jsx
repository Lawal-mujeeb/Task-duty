import { Outlet, useLocation } from "react-router";
import { NavLink } from "react-router";
import { useAuth } from "../store";
// import AuthProvider from "./store/AuthProvider";

export default function RootLayout() {
  const location = useLocation();
  const path = location.pathname;

  const isNewTaskPage = path === "/newtask";
  const isAllTaskPage = path === "/alltask";
  const isEditPage = path.startsWith("/edittask");

  const { accessToken } = useAuth();
  return (
    <header className="bg-white min-h-screen ">
      <nav className="w-full border-b-2 border-gray-300 mt-4">
        <div className="flex justify-between items-center container mx-auto pb-4 max-w-[1100px] px-4 lg:px-0">
          <NavLink to="/">
            <img src="/logo.svg" alt="logo" />
          </NavLink>

           <ul className="flex items-center gap-4 list-none">

           
            {isEditPage ? (
              <li>
                <NavLink to="/alltask"> All task</NavLink>
              </li>
            ) : (
              <>
               
                {!isNewTaskPage && (
                  <li>
                    <NavLink to="/newtask">Newtask</NavLink>
                  </li>
                )}

               
                {!isAllTaskPage && (
                  <li>
                    <NavLink to="/alltask">All task</NavLink>
                  </li>
                )}
              </>
            )}
            {accessToken ? (
              <li>
                <img
                  alt="avatar"
                  src="/avatar-JxabiBBL.png"
                  className="w-8 h-8 rounded-full"
                />
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <Outlet />
    </header>
  );
}
