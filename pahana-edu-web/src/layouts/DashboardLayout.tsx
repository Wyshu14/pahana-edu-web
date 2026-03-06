import {
  faArrowRightFromBracket,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ROUTES } from "../routes";
import { NavLink, Outlet } from "react-router-dom";
import { BarChart3 } from "lucide-react";
import NavBar from "./NavBar";

const LogoContainer = () => {
  return (
    <div className="border-b border-stone-400/50 dark:border-gray-600 w-full flex items-center justify-start py-4 px-4 gap-2">
      <div>
        <FontAwesomeIcon icon={faGraduationCap} size="2x" />
      </div>
      <h1 className="text-lg font-bold">Pahana-EDU</h1>
    </div>
  );
};

const SideNav = () => {
  return (
    <div className="border-b border-stone-400/50 w-full dark:border-gray-600 h-full py-4 ">
      <ul className="w-full px-4 border-b border-stone-400/50 dark:border-gray-600 pb-2">
        {ROUTES.map((route) => (
          <li key={route.path} className="">
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `flex items-center justify-start gap-2 py-2 px-2 rounded-md mb-1  hover:text-white ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-600"
                }`
              }
            >
              {route.IconComponent && (
                <route.IconComponent className="inline-block w-5 aspect-square" />
              )}
              {route.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="px-4">
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center justify-start gap-2 py-2 px-2 rounded-md mt-2 hover:text-white ${
              isActive ? "bg-blue-700 text-white" : "hover:bg-stone-400"
            }`
          }
        >
          <BarChart3 className="inline-block w-5 aspect-square" />
          Reports
        </NavLink>
      </div>
    </div>
  );
};

const UserActionContainer = () => {
  return (
    <div className="w-full px-2 py-4 border-t border-stone-400 dark:border-gray-600 group">
      <button className="flex items-center justify-between px-4 py-3 w-full cursor-pointer rounded-md bg-stone-300 dark:bg-gray-950/50 shadow group-hover:bg-gray-600 group-hover:text-white">
        <div className="w-fit flex flex-col items-start">
          <h2>Logout</h2>
          <p className="text-xs">admin@pahana.edu</p>
        </div>
        <div>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </button>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <main className="w-full min-h-screen">
      <div className="container mx-auto w-full min-h-screen flex flex-row gap-0 dark:text-neutral-300">
        <aside className="lg:flex hidden flex-col items-start w-72 justify-between max-w-xs min-w-fit border-r-[1px] border-stone-400/50 px-2 pb-0 rounded-md shadow-lg dark:shadow-gray-900 bg-stone-200/70 dark:bg-gray-900 dark:border-gray-600">
          <LogoContainer />
          {/* menu */}
          <SideNav />

          {/* logout */}
          <UserActionContainer />
        </aside>
        <div className="w-full flex flex-col px-2 gap-2">
          <NavBar />
          <div className="flex-1 py-2">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
