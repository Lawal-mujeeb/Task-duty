import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useAuth } from "@/store";

export default function Drawer() {
  const [open, setOpen] = useState(false);
  const { accessToken } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  const toggleDrawer = () => setOpen(!open);

  

  const isNewTaskPage = path === "/newtask";
  const isAllTaskPage = path === "/alltask";
  const isEditPage = path.startsWith("/edittask");

  return (
    <div className="md:hidden">
      {/* Menu Button */}
      <button onClick={toggleDrawer}>
        <RiMenuLine size={24} />
      </button>

      {/* Drawer */}
      <div
        className={`drawer fixed top-0 left-0 z-50 ${open ? "drawer-open" : ""}`}
      >
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={open}
          onChange={toggleDrawer}
        />

        <div className="drawer-side">
          <label
            className="drawer-overlay"
            onClick={() => setOpen(false)}
          ></label>

          <div className="menu bg-white text-base-content min-h-full w-[50vw] p-6 relative">
            {/* Close Button */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
              type="button"
              onClick={toggleDrawer}
            >
              <RiCloseLine size={24} />
            </button>

            {/* Top Section */}
            <div className="mt-12 mb-8 flex items-center gap-3">
              {accessToken ? (
                <>
                  <div className="flex  justify-between   items-center w-full">
                  <div>
                    <h2 className="text-lg font-semibold">Welcome back</h2>
                   
                  </div>
                 <img
                  alt="avatar"
                  src="/avatar-JxabiBBL.png"
                  className="w-8 h-8 rounded-full"
                />
                  </div>
                </>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold">Welcome</h2>
                  <p className="text-sm text-gray-500">Please log in</p>
                </div>
                
              )}
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 text-lg">
              {accessToken ? (
                <>
                  {/* If on edit page, only show All Task */}
                  {isEditPage ? (
                    <NavLink
                      to="/alltask"
                      onClick={() => setOpen(false)}
                      className="hover:text-[#974FD0]"
                    >
                      All Task
                    </NavLink>
                  ) : (
                    <>
                      {!isNewTaskPage && (
                        <NavLink
                          to="/newtask"
                          onClick={() => setOpen(false)}
                          className="hover:text-[#974FD0]"
                        >
                          New Task
                        </NavLink>
                      )}

                      {!isAllTaskPage && (
                        <NavLink
                          to="/alltask"
                          onClick={() => setOpen(false)}
                          className="hover:text-[#974FD0]"
                        >
                          All Task
                        </NavLink>
                      )}
                    </>
                  )}

                 
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#974FD0]"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="hover:text-[#974FD0]"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}