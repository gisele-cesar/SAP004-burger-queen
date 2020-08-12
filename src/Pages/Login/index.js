import React, { useState } from 'react';
import firebase from 'Config/firebase';
import 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import Input from 'Components/Input/input';
import Button from 'Components/Button/button';
import './login.css';
import Logo from 'Components/Logo/logo';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msgType, setMsgType] = useState();
  const history = useHistory();

  const signIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        setMsgType('sucesso')
        firebase.firestore().collection('userProfile')
          .where('uid', '==', firebase.auth().currentUser.uid)
          .get().then((querySnapshot) => {
            if (querySnapshot.length === 0) {
              setMsgType('erro')
              return
            }
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              if (typeof userData.sector === 'undefined') {
                setMsgType('erro')
                return
              } else if (userData.sector === 'kitchen') {
                history.push('/kitchen-new-order')
              } else if (userData.sector === 'lounge') {
                history.push('/lounge-new-order');
              }
            });
          })
      }).catch(erro => {
        setMsgType('erro');
      });
  }

  return (
    <div className='login-wrapper'>

      <div className="logo-wrapper">
        <Logo className='logo-login' />
      </div>

      <div className="form-wrapper">
        <form className='login-form'>
          <Input className='input-login' onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' />
          <Input className='input-login' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Senha' />

          <Button className='btn-std' onClick={signIn} type='button' children={'Entrar'} />
          <div>
            {msgType === 'sucesso' && <span><strong>WoW!</strong>Você está conectado! &#128526;</span>}
            {msgType === 'erro' && <span><strong>Ops!</strong>Verifique se a senha ou usuário estão corretos! &#128546;</span>}
          </div>

          <div className='register-link'>
            <p>Não tem uma conta?</p>
            <Link to='/register'>Registre-se</Link>
          </div>
        </form>
      </div>

    </div>

  )
}

export default Login;