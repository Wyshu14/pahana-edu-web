import { ChartSpline } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes";

const QuickActions = () => {
  return (
    <div className="shadow-md rounded-md p-4 border border-stone-400/50 dark:border-gray-600 pb-5">
      <div className="flex items-center gap-2 mt-2">
        <ChartSpline />
        <h1 className="text-xl font-semibold">Quick Actions</h1>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {ROUTES.slice(1, 4).map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className="w-full h-24 bg-stone-300 dark:bg-gray-900 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-600 hover:text-white transition-colors duration-300"
            >
              {route.IconComponent && (
                <route.IconComponent className="inline-block w-5 aspect-square" />
              )}
              <h1 className="text-lg font-medium items-center">
                {route.label}
              </h1>
            </NavLink>
          ))}

          <NavLink
            to="/reports"
            className="w-full h-24 bg-stone-300 dark:bg-gray-900 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-600 hover:text-white transition-colors duration-300"
          >
            <ChartSpline className="w-6 aspect-square" />
            <h2 className="text-lg font-medium items-center">View Reports</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
