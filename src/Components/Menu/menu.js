import React, { useState } from 'react';
import './menu.css';
import '../Lounge/order-ready.css';
import Button from 'Components/Button/button';
import Input from 'Components/Input/input';
import MyModal from 'Components/Modal/modal';
import firebase from 'Config/firebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const Menu = ({ items }) => {

  const [menuItem, setMenuItem] = useState([]);
  const [table, setTable] = useState('');
  const [client, setClient] = useState('');
  const userLounge = firebase.auth().currentUser;

  function sendOrder(table, client, total) {
    if (table && client != '') {
      const orderPromise = firebase.firestore().collection('orders').add({
        client,
        table,
        menuItem,
        waiterName: userLounge.displayName,
        state: 'Preparando',
        time: Date.now(),
        total
      });
      orderPromise.then(() => {
        setMenuItem([])
        setTable('')
        setClient('')
        growl({ text: 'Pedido enviado para a cozinha!', type: 'success', fadeAway: true, fadeAwayTimeout: 2000 });
      }).catch(() => {
        growl({ text: 'Erro ao enviar o seu pedido, tente novamente', type: 'warning', fadeAway: true, fadeAwayTimeout: 2000 });
      })
    } else {
      growl({ text: 'Preencha o número da mesa e o nome do cliente', type: 'warning', fadeAway: true, fadeAwayTimeout: 2000 });
    }
  }

  function clearOrder() {
    setMenuItem([])
    setTable('')
    setClient('')
  }

  const changeQuantity = (product, change) => {
    product.quantity += change

    if (product.quantity <= 0) {
      const i = menuItem.indexOf(product)
      menuItem.splice(i, 1)
    }
    setMenuItem([...menuItem])
  }

  const addNewItem = (product) => {
    for (let i = 0; i < menuItem.length; i++) {
      if (menuItem[i].name === product.name) {
        return
      }
    }
    product.quantity = 1
    setMenuItem([...menuItem, product])
  }

  let total = 0
  menuItem.map(product => {
    total += product.price * product.quantity
  })

  return (
    <main className='order-style'>
      <section className='menu-wrapper'>
        <div className='all-menu'>
          <div className='menu-breakfast'>
            <div className='label-menu'>Café da Manhã</div>
            <div className='btn-wrapper'>
              {items.filter(item => item.breakfast === true).map((product, index) => <Button onClick={() => addNewItem(product)} className='btn-menu' type='button' key={`btn-menu-${index}`}> {<img src={product.icon} className='icon-btn' alt='Icone do produto' />} {product.name} <br></br> R$ {product.price},00 </Button>)}
            </div>
          </div>
          <div className='menu-lunch'>
            <div className='label-menu'>Almoço / Jantar</div>
            <div className='btn-wrapper'>
              {items.filter(item => item.breakfast === false && item.hamburger === false).map((product, index) => <Button onClick={() => addNewItem(product)} className='btn-menu' type='button' key={`btn-menu-${index}`}> {<img src={product.icon} className='icon-btn' alt='Icone do produto' />} {product.name} <br></br> R$ {product.price},00 </Button>)}
              {items.filter(item => item.breakfast === false && item.hamburger === true).map((product, index) => <MyModal className='btn-menu' type='button' key={`btn-menu-${index}`} adds={product.adds} options={product.options} addNewItem={addNewItem} product={product} > {<img src={product.icon} className='icon-btn' alt='Icone do produto' />} {product.name} <br></br> R$ {product.price},00 </MyModal>)}
            </div>
          </div>
        </div >
      </section>
      <section className='order-table-wrapper'>
        <div className='table-wrapper'>
          <div className='display-name-lounge'>Atendente: {userLounge && userLounge.displayName}</div>
          <Input value={client} onChange={(e) => setClient(e.target.value)} type='text' className='input-style' placeholder='Cliente' required="required" requiredTxt='Preencha o nome do cliente'>Cliente: </Input>
          <Input value={table} onChange={(e) => setTable(e.target.value)} type='number' className='input-style' placeholder='Mesa' required >Mesa:</Input>
        </div>
        <div className='order-information-wrapper'>
          <div className='ordered-wrapper'>
            {menuItem.map(product =>
              <div className='item-ordered'>
                <div className='products-and-add-option'>
                  <div className='all-products-name'>
                    <p className='product-name'>{product.name}</p>
                  </div>
                  <div className='all-add-option'>
                    {!!product.burgerOption && <p className='product-add-option'>- Sabor: {product.burgerOption}</p>}
                    {!!product.adds && <p className='product-add-option'>- Adicionais: {`${product.adds.join(", ")}`}</p>}
                  </div>
                </div>
                <div className='btn-order-wrapper'>
                  <Button className='btn-add' type='button' onClick={() => changeQuantity(product, 1)}><i className="fas fa-plus"></i></Button>
                  <div className='quantify-ordered'>{product.quantity}</div>
                  <Button className='btn-add' type='button' onClick={() => changeQuantity(product, -1)}><i className="fas fa-minus"></i></Button>
                </div>
                <div className='price-ordered'>{product.quantity * product.price},00 </div>
              </div>
            )}
          </div>
        </div>
        <div className='value-wrapper'>
          <div className='total-value'>Total</div>
          <div className='total-value'>{total},00 </div>
        </div>
        <div className='btn-send-wrapper'>
          <Button onClick={() => sendOrder(table, client, total)} type='button' className='btn-std' children={'Enviar'} />
          <Button onClick={clearOrder} type='button' className='btn-clear' children={'Cancelar'} />
        </div>
      </section>
    </main>
  )
};

export default Menu;