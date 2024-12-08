'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';
import createNewUser from '@/utils/auth/createNewUser';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [clubName, setClubName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {


        if (!(name.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0)) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        let uid;
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                uid = userCredential.user.uid;
                const token = await userCredential.user.getIdToken();

                fetch(`/api/authenticate`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(async (response) => {
                    if (response.status === 200) {
                        try {
                            console.log('trying creating account in the db')
                            const creationDate = Date.now();
                            await createNewUser(uid, name, clubName, email, creationDate);
                            window.location = '/team';
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }).finally(() => {
                    setLoading(false);
                })
            })
            .catch((error) => {
                // console.error(error.code);
                // if (error.code === 'auth/network-request-failed') createToast('error', 'Network request failed. Please check your internet connection and try again.');
                // if (error.code === 'auth/email-already-in-use') createToast('error', 'The email address you entered is already in use. Please use a different email address or try logging in.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className='bg-purple rounded-md'>
                        <img src="./img/logo.png" alt="logo" className='w-40 mb-8 mx-auto block' />
                    </div>

                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign up</h2>
                        <form className="mt-8 space-y-4">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Full Name</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter your full name"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Club Name</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setClubName(e.target.value)}
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter your club name"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Email"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Enter password"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                                        placeholder="Confirm password"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                                    </svg>
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}

                            <div className="!mt-8">
                                <button
                                    onClick={handleSignUp}
                                    type="button"
                                    className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-purple focus:outline-none"
                                >
                                    {loading ?
                                        <span className='animate-spin text-2xl flex items-center justify-center'>
                                            <div style={{ width: '24px', height: '24px' }}>
                                                <svg className="group-hover:stroke-primary stroke-white" viewBox="22 22 44 44" style={{ width: '100%', height: '100%' }}>
                                                    <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" strokeDasharray="80px, 200px" strokeDashoffset="0" className='spinner-circle'></circle>
                                                </svg>
                                            </div>
                                        </span> :
                                        <>Sign up</>
                                    }
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">Already have an account? <a href="/login" className="text-purple hover:underline ml-1 whitespace-nowrap font-semibold">Login here</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage

