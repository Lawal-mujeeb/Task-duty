import { NavLink } from "react-router";
import Drawer from "./Drawer";


export default function MobileNav() {
 

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-[1px] border-[#DAD7D7E5]">
      <div className="container mx-auto py-5 px-4 flex justify-between items-center">
        <NavLink to="/">
          <img src="/logo.svg" alt="logo" />
        </NavLink>

          <Drawer />
      </div>
    </div>
  );
}