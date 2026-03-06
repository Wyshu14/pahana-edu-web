import type { AppRoute } from "../types";
import { FileText, LayoutDashboard, Package, Users } from "lucide-react";

export const ROUTES: AppRoute[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    index: true,
    iconName: "dashboard",
    IconComponent: LayoutDashboard,
  },
  {
    path: "/customers",
    label: "Customers",
    iconName: "users",
    IconComponent: Users,
  },
  {
    path: "/items",
    label: "Items",
    iconName: "items",
    IconComponent: Package,
  },
  {
    path: "/billing",
    label: "Billing",
    iconName: "billing",
    IconComponent: FileText,
  },
];
