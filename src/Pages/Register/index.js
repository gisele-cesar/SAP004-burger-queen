import React, { useState } from 'react';
import './register.css';
import firebase from 'Config/firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import Logo from 'Components/Logo/logo';
import Input from 'Components/Input/input'
import Button from 'Components/Button/button'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgType, setMsgType] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [sector, setSector] = useState('kitchen');

  function populateUser() {
    const user = firebase.auth().currentUser

    const sectorPromise = firebase.firestore().collection('userProfile').add({
      uid: firebase.auth().currentUser.uid,
      name: name,
      sector: sector,
    });

    sectorPromise.then(() => {
      setMsgType('sucesso');
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      setMsgType(`erro: ${error}`);
    })
  }

  const signUp = () => {

    setLoading(true);
    setMsgType(null);

    if (!email || !password) {
      setMsgType('erro')
      setMsg('Informações incompletas. Informe email e senha para se cadastrar')
      return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        populateUser();
      }).catch(erro => {
        setLoading(false);
        setMsgType('erro')
        switch (erro.message) {
          case 'Password should be at least 6 characters':
            setMsg('A senha deve conter pelo menos 6 caracteres!');
            break;
          case 'The email address is already in use by another account.':
            setMsg('Este email já está sendo utilizado por outro usuário!');
            break;
          case 'The email address is badly formatted.':
            setMsg('O formato do seu email é inválido!');
            break;
          default:
            setMsg('Não foi possível cadastrar. Tente novamente mais tarde!');
        }
      })
  }

  return (
    <div className='register-wrapper'>
      <div className="logo-wrapper">
        <Logo className='logo-register' />
      </div>
      <div className="form-wrapper">
        <form className='register-form'>
          <Input onChange={(e) => setName(e.target.value)} className='input-register' type='text' placeholder='Nome Completo' />
          <Input className='input-register' onChange={(e) => setEmail(e.target.value)} type='email' placeholder='email' />
          <Input className='input-register' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Senha' />

          <div className='options-wrapper'>
            <p>Selecione o seu setor: </p>
            <select name='select-type' id='select-type' className='options-sector' onChange={(e) => setSector(e.target.value)}>
              <option className='sector' value='kitchen'>Cozinha</option>
              <option className='sector' value='lounge'>Salão</option>
            </select>
          </div>

          {
            loading ? <div className="spinner-border text-danger" role="status"><span className="sr-only">Loading...</span></div>
              : <Button className='btn-std' onClick={signUp} type="button" children={'Cadastrar'} />
          }
          <div className="msg-login text-white text-center my-2">
            {msgType === 'sucesso' && <span><strong>WoW!</strong>Usuário cadastrado com sucesso! &#128526;</span>}
            {msgType === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
          </div>

        </form >

        <div className='login-link'>
          <p>Já é cadastrado?</p> <Link to='/'>Faça login</Link>

        </div>

      </div>

    </div >

  )
}

export default Register;