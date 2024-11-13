import React from 'react';
import { Bed } from 'lucide-react';

const BedStatus = () => {
  const departments = [
    { name: 'ICU', total: 20, occupied: 18 },
    { name: 'General Ward', total: 50, occupied: 35 },
    { name: 'Emergency', total: 15, occupied: 12 },
    { name: 'Pediatrics', total: 25, occupied: 20 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Bed className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-lg font-semibold">Bed Availability</h2>
      </div>

      <div className="space-y-4">
        {departments.map(({ name, total, occupied }) => {
          const available = total - occupied;
          const percentage = (occupied / total) * 100;

          return (
            <div key={name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{name}</span>
                <span className="text-gray-600">
                  {available} available / {total} total
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    percentage > 90
                      ? 'bg-red-500'
                      : percentage > 75
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BedStatus;