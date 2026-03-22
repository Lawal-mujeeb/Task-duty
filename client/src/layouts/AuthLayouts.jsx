// import Logo from "@/components/Logo";
import { RiCopyrightFill } from "@remixicon/react";
import { Outlet } from "react-router";

export default function AuthLayouts() {
  return (
    <div className="min-h-dev bg-slate-100 p-4">
     
      <div className="flex items-center justify-center min-h-[calc(100vh-6rem)] gap-2">
        <Outlet />
      </div>
      <div className="flex justify-center md:justify-start items-center text-gray-600">
        <div className="flex gap-1 items-center">
          <RiCopyrightFill size={18} />
       
        </div>
      </div>
    </div>
  );
}
