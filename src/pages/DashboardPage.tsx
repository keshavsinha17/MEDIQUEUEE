import React from 'react';
import { Clock } from 'lucide-react';
import QueueCard from '../components/QueueCard';
import BedStatus from '../components/BedStatus';
import AppointmentList from '../components/AppointmentList';
import Stats from '../components/Stats';

const DashboardPage = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hospital Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Sarah</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-lg font-semibold">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      <Stats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <QueueCard />
        <BedStatus />
      </div>

      <AppointmentList />
    </div>
  );
};

export default DashboardPage;