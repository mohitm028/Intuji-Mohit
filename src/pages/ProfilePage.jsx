import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/authSlice';
import { User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';

const ProfilePage = () => {
    const user = useSelector(selectUser);

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 md:h-48"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="bg-white p-1 rounded-full">
                            <img
                                src={user.image}
                                alt={user.firstName}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white bg-gray-100"
                            />
                        </div>
                        <div className="mb-1 text-right hidden sm:block">
                            <span className="text-sm font-medium text-gray-500">Member ID</span>
                            <p className="text-lg font-bold text-gray-900">#{user.id}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> {user.company.title} at {user.company.name}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" /> Contact Info
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        <span>{user.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-blue-600" /> Address
                                </h3>
                                <div className="text-gray-600 leading-relaxed">
                                    <p>{user.address.address}</p>
                                    <p>{user.address.city}, {user.address.state}</p>
                                    <p>{user.address.postalCode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
