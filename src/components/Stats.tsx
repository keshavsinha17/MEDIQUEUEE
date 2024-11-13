import React from 'react';
import { Users, Clock, Bed, Activity } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      label: 'Patients in Queue',
      value: '42',
      change: '+8%',
      positive: false,
    },
    {
      icon: Clock,
      label: 'Avg. Wait Time',
      value: '28 min',
      change: '-12%',
      positive: true,
    },
    {
      icon: Bed,
      label: 'Available Beds',
      value: '15',
      change: '-3',
      positive: false,
    },
    {
      icon: Activity,
      label: 'Critical Cases',
      value: '7',
      change: '0',
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map(({ icon: Icon, label, value, change, positive }) => (
        <div
          key={label}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <span
              className={`text-sm font-medium ${
                positive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{value}</h3>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;