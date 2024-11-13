import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

const patients = [
  {
    id: 1,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    contact: '+1 234-567-8900',
    lastVisit: '2024-03-15',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    contact: '+1 234-567-8901',
    lastVisit: '2024-03-14',
    status: 'Scheduled',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    age: 58,
    gender: 'Male',
    contact: '+1 234-567-8902',
    lastVisit: '2024-03-13',
    status: 'Discharged',
  },
];

const PatientsPage = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">Manage patient records and information</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Patient
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        patient.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : patient.status === 'Scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;