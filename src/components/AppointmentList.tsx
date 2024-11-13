import React from 'react';
import { Calendar } from 'lucide-react';

const AppointmentList = () => {
  const appointments = [
    {
      id: 1,
      patient: 'Emma Wilson',
      time: '14:00',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'Scheduled',
    },
    {
      id: 2,
      patient: 'Robert Brown',
      time: '14:30',
      doctor: 'Dr. Michael Chen',
      department: 'Neurology',
      status: 'In Progress',
    },
    {
      id: 3,
      patient: 'Lisa Anderson',
      time: '15:00',
      doctor: 'Dr. Sarah Johnson',
      department: 'Cardiology',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold">Today's Appointments</h2>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View Calendar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left bg-gray-50">
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments.map(({ id, patient, time, doctor, department, status }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{patient}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;