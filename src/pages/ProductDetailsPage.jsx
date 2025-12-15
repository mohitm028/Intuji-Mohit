import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, Check } from 'lucide-react';
import { productsService } from '../services/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await productsService.getProductById(id);
                setProduct(data);
                setSelectedImage(data.images[0]);
            } catch (err) {
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        setAdding(true);
        dispatch(addToCart(product));

        // Simulate a brief "Adding..." state for better UX
        setTimeout(() => {
            setAdding(false);
        }, 600);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Product not found'}</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2 mx-auto"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <button
                onClick={() => navigate('/')}
                className="mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative">
                            <img
                                src={selectedImage}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply"
                            />
                            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {product.brand}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`aspect-square rounded-lg border-2 overflow-hidden bg-gray-50 ${selectedImage === img ? 'border-blue-600 ring-2 ring-blue-100' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-2 text-sm text-blue-600 font-semibold uppercase tracking-wide">
                            {product.category}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                                <Star className="w-5 h-5 text-amber-500 fill-current" />
                                <span className="font-bold text-amber-700">{product.rating}</span>
                            </div>
                            <span className="text-gray-400">|</span>
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg border border-green-100">
                                In Stock ({product.stock})
                            </span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="mt-auto space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div>
                                    <span className="text-sm text-gray-500 block">Total Price</span>
                                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 ${adding
                                            ? 'bg-green-600 text-white cursor-default'
                                            : 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-lg'
                                        }`}
                                >
                                    {adding ? (
                                        <>
                                            <Check className="w-5 h-5" /> Added
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5" /> Add to Cart
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Truck className="w-4 h-4" /> Free Delivery
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> 2 Year Warranty
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="border-t border-gray-100 p-8 bg-gray-50/50">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {product.reviews.map((review, index) => (
                                <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-gray-900">{review.reviewerName}</span>
                                        <div className="flex items-center text-amber-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300 fill-none'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                                    <div className="mt-2 text-xs text-gray-400">
                                        {new Date(review.date).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailsPage;
