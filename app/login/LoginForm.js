'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';
import { useSearchParams } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');

    const handleLogin = () => {
        console.log(email, password);

        if (!(email.length > 0 && password.length > 0)) return;
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const token = await userCredential.user.getIdToken();
                fetch(`/api/authenticate`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then(async (response) => {
                    if (response.status === 200) {
                        const data = await response.json();
                        const redirectUrl = redirect ? decodeURIComponent(redirect) : '/team';
                        window.location = redirectUrl;
                    }
                }).finally(() => {
                    setLoading(false);
                })
            })

            .catch((error) => {
                // if (error.code === 'auth/network-request-failed') createToast('error', 'Network request failed. Please check your internet connection and try again.');
                // if (error.code === 'auth/invalid-credential') createToast('error', 'Invalid email or password.Please check your credentials and try again.');
                // setLoading(false);
            });
    }

    return (
        <div className="bg-gray-50 font-[sans-serif]">
            <div className="flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    <div className='bg-purple rounded-md'><img
                        src="./img/logo.png" alt="logo" className='w-40 mb-8 mx-auto block' />
                    </div>

                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
                        <form className="mt-8 space-y-4">
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                                <div className="relative flex items-center">
                                    <input onChange={(e) => setEmail(e.target.value)} name="username" type="text" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Email" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter password" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button onClick={handleLogin} type="button" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-purple  focus:outline-none">
                                    {loading ?
                                        <span className='animate-spin text-2xl flex items-center justify-center'>
                                            <div style={{ width: '24px', height: '24px' }}>
                                                <svg className="group-hover:stroke-primary stroke-white" viewBox="22 22 44 44" style={{ width: '100%', height: '100%' }}>
                                                    <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" strokeDasharray="80px, 200px" strokeDashoffset="0" className='spinner-circle'></circle>
                                                </svg>
                                            </div>
                                        </span> :
                                        <>Sign in</>
                                    }
                                </button>
                            </div>
                            <p className="text-gray-800 text-sm !mt-8 text-center">Don't have an account? <a href="/sign-up" className="text-purple hover:underline ml-1 whitespace-nowrap font-semibold">Register here</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;