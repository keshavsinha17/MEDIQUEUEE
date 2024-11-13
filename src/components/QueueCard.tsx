import React from 'react';
import { Users, ChevronRight } from 'lucide-react';

const QueueCard = () => {
  const queue = [
    { id: 1, name: 'John Doe', time: '10:30', department: 'Cardiology', priority: 'High' },
    { id: 2, name: 'Jane Smith', time: '10:45', department: 'General', priority: 'Normal' },
    { id: 3, name: 'Mike Johnson', time: '11:00', department: 'Orthopedics', priority: 'Normal' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold">Current Queue</h2>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {queue.map(({ id, name, time, department, priority }) => (
          <div
            key={id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-600">{department}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{time}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  priority === 'High'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueueCard;