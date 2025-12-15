import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleDecrease = () => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
        }
    };

    const handleIncrease = () => {
        dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    };

    const handleRemove = () => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            dispatch(removeFromCart(item.id));
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white border border-gray-100 rounded-xl shadow-sm mb-4">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">${item.price} per unit</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <button
                        onClick={handleDecrease}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-md hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:hover:shadow-none transition-all"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                        onClick={handleIncrease}
                        className="p-1 rounded-md hover:bg-white hover:shadow-sm transition-all"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <div className="text-lg font-bold w-24 text-center">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                    onClick={handleRemove}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove Item"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
