import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const appointments = [
  {
    id: 1,
    time: '09:00',
    patient: 'Emma Wilson',
    doctor: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    status: 'Scheduled',
  },
  {
    id: 2,
    time: '10:30',
    patient: 'Robert Brown',
    doctor: 'Dr. Michael Chen',
    department: 'Neurology',
    status: 'In Progress',
  },
  {
    id: 3,
    time: '11:45',
    patient: 'Lisa Anderson',
    doctor: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    status: 'Completed',
  },
];

const timeSlots = Array.from({ length: 9 }, (_, i) => {
  const hour = i + 9;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const AppointmentsPage = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Schedule and manage patient appointments</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Calendar</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-medium">March 2024</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 3;
                  const isCurrentMonth = day >= 1 && day <= 31;
                  const isToday = day === 15;
                  return (
                    <button
                      key={i}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                        isCurrentMonth
                          ? isToday
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-100'
                          : 'text-gray-300'
                      }`}
                    >
                      {isCurrentMonth ? day : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Today's Schedule</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{appointment.time}</span>
                    <span
                      className={`px-2 text-xs font-semibold rounded-full ${
                        appointment.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.doctor}</p>
                  <p className="text-sm text-gray-500">{appointment.department}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;