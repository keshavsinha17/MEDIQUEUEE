import React, { useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import BedStatus from '../components/BedStatus';

const departments = [
  {
    id: 1,
    name: 'ICU',
    beds: [
      { id: 'ICU-01', status: 'Occupied', patient: 'John Doe', admissionDate: '2024-03-14' },
      { id: 'ICU-02', status: 'Available', patient: null, admissionDate: null },
      { id: 'ICU-03', status: 'Maintenance', patient: null, admissionDate: null },
    ],
  },
  {
    id: 2,
    name: 'General Ward',
    beds: [
      { id: 'GW-01', status: 'Occupied', patient: 'Jane Smith', admissionDate: '2024-03-15' },
      { id: 'GW-02', status: 'Occupied', patient: 'Mike Johnson', admissionDate: '2024-03-13' },
      { id: 'GW-03', status: 'Available', patient: null, admissionDate: null },
    ],
  },
];

// Helper function to calculate stats
const calculateStats = (departments) => {
  const stats = {
    total: 0,
    available: 0,
    occupied: 0,
    maintenance: 0,
  };

  departments.forEach((dept) => {
    dept.beds.forEach((bed) => {
      stats.total++;
      if (bed.status === 'Available') stats.available++;
      if (bed.status === 'Occupied') stats.occupied++;
      if (bed.status === 'Maintenance') stats.maintenance++;
    });
  });

  return stats;
};

const BedManagementPage = () => {
  const [role, setRole] = useState('Patient'); // Default role

  const stats = calculateStats(departments);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bed Management</h1>
          <p className="text-gray-600">Monitor and manage hospital bed availability</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={role}
            onChange={handleRoleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
          <button className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
            <RefreshCw className="w-5 h-5 mr-2" />
            Refresh Status
          </button>
        </div>
      </div>

      {role === 'Doctor' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Total Beds</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Available Beds</h3>
            <p className="text-3xl font-bold text-green-600">{stats.available}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Occupied Beds</h3>
            <p className="text-3xl font-bold text-red-600">{stats.occupied}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900">Beds in Maintenance</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.maintenance}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {role === 'Patient' ? (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Available Beds</h2>
            <ul className="divide-y divide-gray-200">
              {departments.flatMap((dept) =>
                dept.beds
                  .filter((bed) => bed.status === 'Available')
                  .map((bed) => (
                    <li key={bed.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {bed.id} ({dept.name})
                        </span>
                        <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                          Book Bed
                        </button>
                      </div>
                    </li>
                  ))
              )}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 text-left bg-green-50 rounded-lg hover:bg-green-100">
                <span className="block font-medium text-green-700">Admit Patient</span>
                <span className="text-sm text-green-600">Assign a bed to a new patient</span>
              </button>
              <button className="p-4 text-left bg-blue-50 rounded-lg hover:bg-blue-100">
                <span className="block font-medium text-blue-700">Transfer Patient</span>
                <span className="text-sm text-blue-600">Move patient between departments</span>
              </button>
              <button className="p-4 text-left bg-purple-50 rounded-lg hover:bg-purple-100">
                <span className="block font-medium text-purple-700">Discharge Patient</span>
                <span className="text-sm text-purple-600">Release patient from bed</span>
              </button>
              <button className="p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100">
                <span className="block font-medium text-gray-700">Mark Maintenance</span>
                <span className="text-sm text-gray-600">Set bed status to maintenance</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search beds..."
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
                  Bed ID
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission Date
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) =>
                dept.beds.map((bed) => (
                  <tr key={bed.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{bed.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{dept.name}</td>
                    <td
                      className={`px-6 py-4 text-sm font-medium ${
                        bed.status === 'Available'
                          ? 'text-green-600'
                          : bed.status === 'Occupied'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {bed.status}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {bed.patient || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {bed.admissionDate || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BedManagementPage;
