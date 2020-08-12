import React from 'react';
import './header-kitchen.css';
import LogoPiscando from 'Images/gifheader.gif';
import { Link } from 'react-router-dom';
import firebase from 'Config/firebase';
import 'firebase/auth';
import Button from '../Button/button';

const HeaderKitchen = () => {

    const signOut = () => {
        if (firebase.auth().currentUser) {
            firebase.auth().signOut()
                .then(result => {
                    console.log(' oi');
                }).catch(erro => {
                    console.log('erro tchau');
                });
        }
    }

    return (
        <header className='header-wrapper-kitchen'>
            <div className='logo-header-wrapper'>
                <img src={LogoPiscando} />
            </div>
            <div className='all-btn-links'>
                <div className='btn-routes'>
                    <Button className='btn-links'><Link className='link' to='/kitchen-new-order' children={'Pedido Cozinha'} /></Button>
                    <Button className='btn-links'><Link className='link' to='/kitchen-order-ready' children={'Pronto Cozinha'} /></Button>
                    <Button className='btn-links'><Link className='link' to='/finished-order-kitchen' children={'Pedido finalizado'} /></Button>
                </div>
                <div className='btn-link-out'>
                    <Button className='btn-out' onClick={signOut}><Link className='link' to='/' children={'Sair'} /></Button>
                </div>
            </div>
        </header >
    );
}

export default HeaderKitchen;