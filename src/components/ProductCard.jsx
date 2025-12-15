import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(product));
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    {product.category}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium active:scale-95"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
