import React, { useState } from 'react';
import { Search, ShoppingCart, Truck, Store } from 'lucide-react';
import { useStore } from '../lib/store';
import toast from 'react-hot-toast';

const PharmacyPage = () => {
  const { medicines, addOrder, incrementOrderCounter } = useStore();
  const [cart, setCart] = useState<Array<{ medicineId: string; quantity: number }>>([]);
  const [search, setSearch] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');

  const addToCart = (medicineId: string) => {
    const existingItem = cart.find(item => item.medicineId === medicineId);
    if (existingItem) {
      setCart(cart.map(item =>
        item.medicineId === medicineId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { medicineId, quantity: 1 }]);
    }
    toast.success('Added to cart');
  };

  const removeFromCart = (medicineId: string) => {
    setCart(cart.filter(item => item.medicineId !== medicineId));
    toast.success('Removed from cart');
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(medicineId);
      return;
    }
    setCart(cart.map(item =>
      item.medicineId === medicineId
        ? { ...item, quantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const medicine = medicines.find(m => m.id === item.medicineId);
      return total + (medicine?.price || 0) * item.quantity;
    }, 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    const orderNumber = incrementOrderCounter();
    
    addOrder({
      patientId: 'SELF-SERVICE',
      items: cart,
      status: 'pending',
      total: calculateTotal(),
    });

    toast.success(
      deliveryMethod === 'pickup'
        ? `Order placed successfully! Your counter number is #${orderNumber}`
        : `Order placed successfully! Delivery tracking number: #${orderNumber}`
    );
    
    setCart([]);
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy</h1>
          <p className="text-gray-600">Purchase medicines and medical supplies</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-medium text-lg mb-2">{medicine.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{medicine.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">₹{medicine.price}</span>
                  <button
                    onClick={() => addToCart(medicine.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {medicine.stock} units in stock
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-fit">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
          </div>
          <div className="p-6">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => {
                    const medicine = medicines.find(m => m.id === item.medicineId);
                    if (!medicine) return null;
                    return (
                      <div
                        key={item.medicineId}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-medium">{medicine.name}</h4>
                          <p className="text-sm text-gray-600">
                            ₹{medicine.price} x {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Delivery Method</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setDeliveryMethod('pickup')}
                        className={`p-3 flex items-center justify-center rounded-lg border ${
                          deliveryMethod === 'pickup'
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200'
                        }`}
                      >
                        <Store className="w-5 h-5 mr-2" />
                        Pickup
                      </button>
                      <button
                        onClick={() => setDeliveryMethod('delivery')}
                        className={`p-3 flex items-center justify-center rounded-lg border ${
                          deliveryMethod === 'delivery'
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200'
                        }`}
                      >
                        <Truck className="w-5 h-5 mr-2" />
                        Delivery
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="text-lg font-bold">₹{calculateTotal()}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;