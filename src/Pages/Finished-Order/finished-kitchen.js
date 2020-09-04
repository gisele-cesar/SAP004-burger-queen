import React, { useState, useEffect } from 'react';
import HeaderKitchen from 'Components/Header-Kitchen/header-kitchen';
import FinalizedOrders from 'Components/Kitchen/finished-order';
import firebase from 'Config/firebase';
import '../Lounge/lounge.css'

const FinishedKitchen = () => {
  const [finalizedOrder, setFinalizedOrder] = useState([]);

  useEffect(() => {
    firebase.firestore()
      .collection('orders')
      .orderBy('time', 'asc')
      .where('state', '==', 'Pedido Finalizado')
      .get()
      .then((result) => {
        const arrayOrderReady = [];
        result.docs.forEach(doc => {
          arrayOrderReady.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setFinalizedOrder(arrayOrderReady)
      })
  }, []);

  return (
    <div>
      <div>
        <HeaderKitchen />
      </div>
      <div className='order-list'>
        {finalizedOrder.map(item => <FinalizedOrders time={item.time} table={item.table} client={item.client} menuItem={item.menuItem} state={item.state} waiterName={item.waiterName} total={item.total} endTime={item.endTime} />)}
      </div>
    </div>
  )
}

export default FinishedKitchen;