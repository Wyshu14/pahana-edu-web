interface AppRoute {
  path: string;
  label: string;
  element?: React.ReactNode;
  index?: boolean;
  iconName: string;
  IconComponent?: React.ComponentType<{ className?: string }>;
}

interface Customer {
  id: string;
  accountNo: string;
  name: string;
  phone: string;
  address: string;
}

interface Item {
  id: string;
  name: string;
  price: number;
}

export type { AppRoute, Customer, Item };
