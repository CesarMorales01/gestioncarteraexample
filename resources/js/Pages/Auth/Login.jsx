import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import GlobalFunctions from '../services/GlobalFunctions';
import '../../../css/general.css'
import PrimaryButton from '@/Components/PrimaryButton';

export default function Login({ status, canResetPassword, globalVars }) {
    const glob = new GlobalFunctions();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        validarRemember()
        ponerDatosEjemplo()
        return () => {
            reset('password');
        };
    }, []);

    useEffect(() => {
        validarErrors()
    });

    function ponerDatosEjemplo(){
        setData((valores) => ({
            ...valores,
            email: 'ejemplo@gmail.com',
            password: '123456',
            remember: true
        }))
    }

    function validarErrors() {
        if (errors.email == 'These credentials do not match our records.') {
            errors.email = ''
            loadingOff()
        }
    }

    function validarRemember() {
        if (glob.getCookie('email') != '') {
            setData((valores) => ({
                ...valores,
                email: glob.getCookie('email'),
                password: glob.getCookie('password'),
                remember: true
            }))
        }
    }

    const submit = (e) => {
        loadingOn()
        e.preventDefault();
        post(route('login'));
    };

    function loadingOn() {
        document.getElementById('btnLoading').style.display = ''
        document.getElementById('btnLogin').style.display = 'none'
    }

    function loadingOff() {
        document.getElementById('btnLoading').style.display = 'none'
        document.getElementById('btnLogin').style.display = ''
    }

    return (
        <GuestLayout globalVars={globalVars}>
            <Head title="Log in" />
            <Link href="/">
                <img id='logo' src={globalVars.myUrl + "Images/Config/efectivo_ico.png"} style={{ width: '35%', height: 'auto', marginBottom: '1em' }} className="img-fluid rounded centerImg" alt="" />
            </Link>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>
                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    <button id='btnLogin' type='submit' className="ml-4 btn btn-success btnVerde" disabled={processing}>
                        Iniciar sesión
                    </button>
                    <button id='btnLoading' style={{ display: 'none', backgroundColor: 'gray', marginLeft: '0.5em' }} className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
