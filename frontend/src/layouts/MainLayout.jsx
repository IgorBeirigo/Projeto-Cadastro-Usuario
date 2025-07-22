import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/template/Nav';
import Logo from '../components/template/Logo';
import Footer from '../components/template/Footer';

export default function MainLayout() {
    return (
        <div className="app">
            <Logo />
            <Nav />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
