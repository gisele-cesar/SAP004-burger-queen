import React from 'react';
import './header-lounge.css';
import LogoPiscando from 'Images/gifheader.gif';
import { Link } from 'react-router-dom';
import firebase from 'Config/firebase';
import 'firebase/auth';
import Button from 'Components/Button/button'
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const HeaderLounge = () => {

  const signOut = () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut()
        .then(() => {
          growl({ text: 'Você se desconectou. Até mais!', type: 'sucess', fadeAway: true, fadeAwayTimeout: 2000 });
        }).catch(() => {
          growl({ text: 'Erro ao sair, tente novamente', type: 'error', fadeAway: true, fadeAwayTimeout: 2000 });
        });
    }
  }

  return (
    <header className='header-wrapper-lounge'>
      <figure className='logo-header-wrapper'>
        <img src={LogoPiscando} />
      </figure>
      <div className='all-btn-links'>
        <div className='btn-routes'>
          <Button className='btn-links'><Link className='link' to='/lounge-new-order' children={'Novo Pedido'} /></Button>
          <Button className='btn-links'><Link className='link' to='/lounge-order-ready' children={'Pedidos Prontos'} /></Button>
          <Button className='btn-links'><Link className='link' to='/finished-lounge' children={'Pedidos Entregues'} /></Button>
        </div>
        <div className='btn-link-out'>
          <Button className='btn-out' onClick={signOut}><Link className='link' to='/' children={'Sair'} /></Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderLounge;