import React from 'react';
import './header-kitchen.css';
import LogoPiscando from 'Images/gifheader.gif';
import { Link } from 'react-router-dom';
import firebase from 'Config/firebase';
import 'firebase/auth';
import Button from 'Components/Button/button'
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const HeaderKitchen = () => {

  const signOut = () => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut()
        .then(() => {
          growl({ text: 'Você está desconectado. Até mais!', type: 'sucess', fadeAway: true, fadeAwayTimeout: 2000 });
        }).catch(() => {
          growl({ text: 'Erro ao sair, tente novamente', type: 'error', fadeAway: true, fadeAwayTimeout: 2000 });
        });
    }
  }

  return (
    <header className='header-wrapper-kitchen'>
      <figure className='logo-header-wrapper'>
        <img src={LogoPiscando} />
      </figure>
      <div className='all-btn-links'>
        <div className='btn-routes'>
          <Button className='btn-links'><Link className='link' to='/kitchen-new-order' children={'Pedidos Recebidos'} /></Button>
          <Button className='btn-links'><Link className='link' to='/finished-kitchen' children={'Pedidos Finalizados'} /></Button>
        </div>
        <div className='btn-link-out'>
          <Button className='btn-out' onClick={signOut}><Link className='link' to='/' children={'Sair'} /></Button>
        </div>
      </div>
    </header >
  );
}

export default HeaderKitchen;