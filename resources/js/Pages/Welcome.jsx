import { Link, Head } from '@inertiajs/react';
import Login from './Auth/Login';
import { useState, useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    useEffect(() => {
        
    }, [])

    console.log(auth)
    return (
        <>
            <Head title="Login" />
            <Login></Login> 
        </>
    );
}
