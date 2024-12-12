import React, { Suspense } from 'react'
import LoginForm from './LoginForm';

const page = () => {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    )
}

export default page