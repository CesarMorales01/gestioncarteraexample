import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import AutoComplete from '@/Pages/UIGeneral/Autocomplete';
import React, { useState, useEffect } from 'react'
import '../../css/general.css'
import AutoCompleteSm from '@/Pages/UIGeneral/AutocompleteSm';

export default function Authenticated({ user, header, children, clientes, globalVars, buscarActive }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
    const [permisos, setPermisos] = useState([])
    const [load, startLoading] = useState('none')

    useEffect(() => {
        getSize()
        functionSetPermisos()
    }, [])

    function functionSetPermisos() {
        let array = []
        if (permisos.length == 0) {
            user.permissions.forEach(element => {
                array.push(element.name)
            });
            setPermisos(array)
        }
    }

    window.onresize = getSize

    function getSize() {
        const ancho = window.innerWidth;
        if (ancho > 768 & document.getElementById('search1') != null) {
            document.getElementById('search1').style.display = 'inline'
            document.getElementById('search2').style.display = 'none'
        } else {
            document.getElementById('search1').style.display = 'none'
            document.getElementById('search2').style.display = 'inline'
        }
    }

    function loading() {
        startLoading('')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className='navBarFondo' >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <a onClick={loading} href={route('dashboard')} style={{ color: 'white', cursor: 'pointer' }} > <i className="fas fa-home"></i>  Lobby</a>
                            </div>
                            <div className="hidden space-x-8 md:-my-px md:ml-10 md:flex ">
                                <div id='search1' style={{ marginTop: '0.4em' }}>
                                    <AutoComplete buscarActive={buscarActive} clientes={clientes} globalVars={globalVars}></AutoComplete>
                                </div>
                                <NavLink onClick={loading} href={route('client.list', 'nothing')} active={route().current('client.list')}>
                                    Clientes
                                </NavLink>
                                <NavLink style={{ display: permisos.includes('editar-carteras') ? '' : 'none' }} onClick={loading} href={route('cartera.list', 'nothing')} active={route().current('cartera.list')}>
                                    Carteras
                                </NavLink>
                                <NavLink style={{ display: permisos.includes('editar-usuarios') ? '' : 'none' }} onClick={loading} href={route('user.list', 'nothing')} active={route().current('user.list')}>
                                    Asesores
                                </NavLink>
                                <NavLink onClick={loading} href={route('informes.list', 'nothing')} active={route().current('informes.list')}>
                                    Informes
                                </NavLink>
                                <NavLink onClick={loading} style={{ display: permisos.includes('ver-gastos') ? '' : 'none' }} href={route('spend.list', 'nothing')} active={route().current('spend.list')}>
                                    Gastos
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden md:flex md:items-center md:ml-6">
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>

                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Salir
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div style={{ marginLeft: '0.5em' }} className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <NavLink onClick={loading} href={route('client.list', 'nothing')} active={route().current('client.list')}>
                            Clientes
                        </NavLink>
                    </div>
                    <div style={{ display: permisos.includes('editar-carteras') ? '' : 'none' }} className="pt-2 pb-3 space-y-1">
                        <NavLink  onClick={loading} href={route('cartera.list', 'nothing')} active={route().current('cartera.list')}>
                            Carteras
                        </NavLink>
                    </div>
                    <div style={{ display: permisos.includes('editar-usuarios') ? '' : 'none' }} className="pt-2 pb-3 space-y-1">
                        <NavLink  onClick={loading} href={route('user.list', 'nothing')} active={route().current('user.list')}>
                            Asesores
                        </NavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <NavLink onClick={loading} href={route('informes.list', 'nothing')} active={route().current('informes.list')}>
                            Informes
                        </NavLink>
                    </div>
                    <div style={{ display: permisos.includes('ver-gastos') ? '' : 'none' }} className="pt-2 pb-3 space-y-1">
                        <NavLink onClick={loading}  href={route('spend.list', 'nothing')} active={route().current('spend.list')}>
                            Gastos
                        </NavLink>
                    </div>
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {user.name}

                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Salir
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
                <div id='search2' >
                    <AutoCompleteSm buscarActive={buscarActive} className='form-control mr-sm-2' clientes={clientes} globalVars={globalVars}></AutoCompleteSm>
                </div>
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <div className="d-flex justify-content-center">
                <div style={{ marginTop: '0.5em', display: load }} className="spinner-border spinner-border-sm text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
}


