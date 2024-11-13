import React from 'react';
import { Check } from 'lucide-react';
import { useStore } from '../lib/store';
import toast from 'react-hot-toast';

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 99,
    features: [
      'Up to 100 patients',
      'Basic appointment scheduling',
      'Medicine inventory',
      'OPD management',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 199,
    features: [
      'Up to 500 patients',
      'Advanced scheduling',
      'Inventory management',
      'OPD management',
      'Analytics dashboard',
      'Priority support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 399,
    features: [
      'Unlimited patients',
      'Full feature access',
      'Custom integrations',
      'Dedicated support',
      'Advanced analytics',
      'Multi-branch support',
    ],
  },
];

const PricingPage = () => {
  const { currentPlan, updatePlan } = useStore();

  const handlePlanSelect = (plan: (typeof plans)[0]) => {
    updatePlan(plan);
    toast.success(`Successfully switched to ${plan.name}`);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pricing Plans</h1>
        <p className="text-gray-600">
          Choose the perfect plan for your hospital
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-xl shadow-sm border ${
              currentPlan.id === plan.id ? 'border-blue-600' : 'border-gray-100'
            } p-6`}
          >
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6">
              ${plan.price}
              <span className="text-gray-500 text-base font-normal">
                /month
              </span>
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePlanSelect(plan)}
              className={`w-full py-2 rounded-lg ${
                currentPlan.id === plan.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {currentPlan.id === plan.id ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PricingPage;
