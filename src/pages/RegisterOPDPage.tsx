import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStore } from '../lib/store';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0).max(150),
  gender: z.enum(['male', 'female', 'other']),
  contact: z.string().min(10, 'Valid contact number required'),
  address: z.string().min(1, 'Address is required'),
  department: z.string().min(1, 'Department is required'),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  symptoms: z.string().min(1, 'Symptoms are required'),
});

type FormData = z.infer<typeof schema>;

const RegisterOPDPage = () => {
  const { addPatient, addAppointment } = useStore();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Add patient
    const patientData = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      contact: data.contact,
      address: data.address,
    };
    
    addPatient(patientData);

    // Create appointment
    const appointmentData = {
      patientId: `P-${Date.now()}`,
      doctorId: 'AUTO-ASSIGNED',
      date: data.preferredDate,
      time: data.preferredTime,
      department: data.department,
      status: 'scheduled' as const,
    };
    
    addAppointment(appointmentData);

    toast.success('OPD registration successful');
    navigate('/appointments');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Register for OPD</h1>
        <p className="text-gray-600">Fill in the details to register for OPD consultation</p>
      </div>

      <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                {...register('age', { valueAsNumber: true })}
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
              {errors.age && (
                <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                {...register('gender')}
                className="w-full p-2 border border-gray-200 rounded-lg"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                {...register('contact')}
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
              {errors.contact && (
                <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                {...register('address')}
                rows={3}
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                {...register('department')}
                className="w-full p-2 border border-gray-200 rounded-lg"
              >
                <option value="general">General Medicine</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="neurology">Neurology</option>
              </select>
              {errors.department && (
                <p className="text-red-600 text-sm mt-1">{errors.department.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                {...register('preferredDate')}
                className="w-full p-2 border border-gray-200 rounded-lg"
              />
              {errors.preferredDate && (
                <p className="text-red-600 text-sm mt-1">{errors.preferredDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time
              </label>
              <select
                {...register('preferredTime')}
                className="w-full p-2 border border-gray-200 rounded-lg"
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
              {errors.preferredTime && (
                <p className="text-red-600 text-sm mt-1">{errors.preferredTime.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Symptoms
              </label>
              <textarea
                {...register('symptoms')}
                rows={3}
                className="w-full p-2 border border-gray-200 rounded-lg"
                placeholder="Describe your symptoms..."
              />
              {errors.symptoms && (
                <p className="text-red-600 text-sm mt-1">{errors.symptoms.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOPDPage;