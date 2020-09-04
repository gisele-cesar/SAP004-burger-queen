import React from 'react';
import Button from 'Components/Button/button';
import FormatDate from 'Components/Utils/utils';
import './kitchen.css';
import firebase from 'Config/firebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const OrdersReceived = ({ idDoc, state, time, table, client, menuItem, removeOrder, waiterName }) => {

  const upDateStatus = (id) => {
    firebase.firestore().collection('orders')
      .doc(id)
      .update({
        state: 'Pedido Pronto',
      }).then(() => {
        removeOrder(id)
        growl({ text: 'Pedido enviado para o salão!', type: 'success', fadeAway: true, fadeAwayTimeout: 2000 });
      }).catch(() => {
        growl({ text: 'Erro ao enviar o seu pedido, tente novamente', type: 'error', fadeAway: true, fadeAwayTimeout: 2000 });
      })
  }

  return (
    <div className='kitchen-order-wrapper'>
      <div className='kitchen-table-wrapper'>
        <div className='kitchen-time-wrapper'>{FormatDate(time)}</div>
        <div className='client-table-wrapper'>
          <div className='kitchen-table-information-a'><span className='strong-kitchen'>Cliente: </span>{client}</div>
          <div className='kitchen-table-information'><span className='strong-kitchen'>Mesa: </span> {table}</div>
        </div>
        <div className='kitchen-table-information'><span className='strong-kitchen'>Status: </span>{state}</div>
        <div className='kitchen-table-information'><span className='strong-kitchen'>Atendente: </span>{waiterName}</div>
      </div>
      <div className='kitchen-order-info'>
        <div className='kitchen-ordered-wrapper'>
          {menuItem.filter(item => item.hamburger === true).map(element =>
            <div className='items-wrapper'>
              <div className='kitchen-name-quantity'>
                <div className='kitchen-quantify-ordered'>{element.quantity}</div>
                <div className='kitchen-item-ordered'>{element.name}</div>
              </div>
              <div className='kitchen-item-add'>- Sabor: {element.burgerOption}</div>
              <div className='kitchen-item-add'>- Adicionais: {`${element.adds.join(", ")}`}</div>
            </div>
          )}
          {menuItem.filter(item => item.hamburger === false).map(element =>
            <div className='items-wrapper'>
              <div className='kitchen-name-quantity'>
                <div className='kitchen-quantify-ordered'>{element.quantity}</div>
                <div className='kitchen-item-ordered'>{element.name}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='btn-wrapper-order-received'>
        <Button onClick={() => { upDateStatus(idDoc) }} className='btn-order-kitchen' type='button' children={'Pronto para servir'} />
      </div>
    </div>
  )
}

export default OrdersReceived;