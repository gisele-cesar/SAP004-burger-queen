import React from 'react';
import Button from 'Components/Button/button';
import FormatDate from 'Components/Utils/utils';
import './order-ready.css';
import firebase from 'Config/firebase';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';

const OrderReady = ({ idDoc, state, time, table, client, menuItem, removeOrder, waiterName }) => {

  const upDateStatus = (id) => {
    firebase.firestore().collection('orders')
      .doc(id)
      .update({
        state: 'Pedido Finalizado',
        endTime: Date.now(),
      }).then(() => {
        removeOrder(id)
        growl({ text: 'Pedido entregue para o cliente!', type: 'success', fadeAway: true, fadeAwayTimeout: 2000 });
      }).catch(() => {
        growl({ text: 'Erro ao enviar o seu pedido, tente novamente', type: 'error', fadeAway: true, fadeAwayTimeout: 2000 });
      })
  }

  return (
    <div className='lounge-order-wrapper'>
      <div className='lounge-table-wrapper'>
        <div className='lounge-time-wrapper'>{FormatDate(time)}</div>
        <div className='client-table-wrapper'>
          <div className='lounge-table-information-a'><span className='strong-lounge'>Cliente: </span>{client} </div>
          <div className='lounge-table-information'><span className='strong-lounge'>Mesa: </span> {table} </div>
        </div>
        <div className='lounge-table-information'><span className='strong-lounge'>Status: </span>{state}</div>
        <div className='lounge-table-information'><span className='strong-lounge'>Atendente: </span>{waiterName} </div>
      </div>
      <div className='lounge-order-info'>
        <div className='lounge-ordered-wrapper'>
          {menuItem.filter(item => item.hamburger === true).map(element =>
            <div className='items-wrapper'>
              <div className='kitchen-name-quantity'>
                <div className='lounge-quantify-ordered'>{element.quantity}</div>
                <div className='lounge-item-ordered'>{element.name}</div>
              </div>
              <div className='lounge-item-ordered'>- Sabor: {element.burgerOption}</div>
              <div className='lounge-item-ordered'>- Adicionais: {`${element.adds.join(", ")}`}</div>
            </div>
          )}
          {menuItem.filter(item => item.hamburger === false).map(element =>
            <div className='items-wrapper'>
              <div className='kitchen-name-quantity'>
                <div className='lounge-quantify-ordered'>{element.quantity}</div>
                <div className='lounge-item-ordered'>{element.name}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='btn-wrapper-lounge-order-ready'>
        <Button onClick={() => { upDateStatus(idDoc) }} className='btn-std' children={'Entregar'} />
      </div>
    </div >
  )
}

export default OrderReady;