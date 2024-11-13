import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity,
  Users,
  Bed,
  Calendar,
  Settings,
  LogOut,
  Pill,
  ClipboardList,
  CreditCard,
} from 'lucide-react';
import { useStore } from '../lib/store';

const Sidebar = () => {
  const location = useLocation();
  const { currentPlan } = useStore();
  
  const menuItems = [
    { icon: Activity, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Patients', path: '/patients' },
    { icon: Bed, label: 'Bed Management', path: '/beds' },
    { icon: Calendar, label: 'Appointments', path: '/appointments' },
    { icon: Pill, label: 'Pharmacy', path: '/pharmacy' },
    { icon: ClipboardList, label: 'Register OPD', path: '/register-opd' },
    { icon: CreditCard, label: 'Pricing', path: '/pricing' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-4 py-6">
      <div className="flex items-center mb-8">
        <Activity className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold">MediQueue</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-3 text-gray-700 rounded-lg ${
              location.pathname === path ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="ml-3">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900">Current Plan</h3>
        <p className="text-lg font-bold text-blue-600">{currentPlan.name}</p>
        <p className="text-sm text-blue-700">${currentPlan.price}/month</p>
      </div>

      <div className="mt-auto pt-8 border-t border-gray-200 space-y-2">
        <a
          href="#"
          className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          <Settings className="h-5 w-5" />
          <span className="ml-3">Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;