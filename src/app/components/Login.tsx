import React from 'react';
import { useModal } from '../context/LoginModel';
import Link from 'next/link';

export default function LoginModal() {
    const { toggleModal } = useModal();

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative bg-orange-100 w-full max-w-md p-6 rounded-lg shadow-lg">
                <button 
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" 
                    onClick={toggleModal}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter your password" 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-300 transition duration-300"
                    >
                        Log In
                    </button>
                    <span>Donot Have a Account</span>
                   <Link href={'/Singup'}> <button 
                        type="submit" 
                        className="w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Sing In
                    </button></Link>
                </form>
            </div>
        </div>
    );
}
