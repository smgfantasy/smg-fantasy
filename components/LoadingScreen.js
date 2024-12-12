'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
    const [dots, setDots] = useState('.')

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length >= 3 ? '.' : prevDots + '.'))
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-95 z-50">
            <div className="text-center">
                <div className="relative w-24 h-24 animate-pulse">
                    <Image
                        src="/img/logo.png"
                        alt="Betano League Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <p className="mt-4 text-lg font-semibold text-white">Loading{dots}</p>
            </div>
        </div>
    )
}

