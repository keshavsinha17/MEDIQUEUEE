import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: string;
  address: string;
  lastVisit?: string;
  status: 'active' | 'inactive';
}

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  department: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
}

interface Order {
  id: string;
  patientId: string;
  items: Array<{ medicineId: string; quantity: number }>;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  createdAt: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isActive: boolean;
}

interface StoreState {
  patients: Patient[];
  appointments: Appointment[];
  medicines: Medicine[];
  orders: Order[];
  currentPlan: PricingPlan;
  orderCounter: number;
  
  addPatient: (patient: Omit<Patient, 'id' | 'status'>) => void;
  updatePatient: (id: string, patient: Partial<Patient>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updatePlan: (plan: PricingPlan) => void;
  incrementOrderCounter: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      patients: [],
      appointments: [],
      medicines: [
        {
          id: 'med1',
          name: 'Paracetamol',
          price: 5.99,
          stock: 1000,
          description: 'Pain reliever and fever reducer',
        },
        {
          id: 'med2',
          name: 'Amoxicillin',
          price: 12.99,
          stock: 500,
          description: 'Antibiotic',
        },
      ],
      orders: [],
      currentPlan: {
        id: 'basic',
        name: 'Basic Plan',
        price: 99,
        features: [
          'Up to 100 patients',
          'Basic appointment scheduling',
          'Medicine inventory',
          'OPD management',
        ],
        isActive: true,
      },
      orderCounter: 1000,

      addPatient: (patient) =>
        set((state) => ({
          patients: [
            ...state.patients,
            {
              ...patient,
              id: `P${Date.now()}`,
              status: 'active',
            },
          ],
        })),

      updatePatient: (id, patient) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === id ? { ...p, ...patient } : p
          ),
        })),

      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [
            ...state.appointments,
            {
              ...appointment,
              id: `A${Date.now()}`,
            },
          ],
        })),

      updateAppointment: (id, appointment) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, ...appointment } : a
          ),
        })),

      addOrder: (order) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              ...order,
              id: `O${Date.now()}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      updatePlan: (plan) =>
        set({ currentPlan: { ...plan, isActive: true } }),

      incrementOrderCounter: () => {
        const current = get().orderCounter;
        set({ orderCounter: current + 1 });
        return current + 1;
      },
    }),
    {
      name: 'hospital-storage',
    }
  )
);