import React, { useState, useEffect } from 'react';
import HeaderKitchen from 'Components/Header-Kitchen/header-kitchen';
import OrdersReceived from 'Components/Kitchen-Order-Ready/new-order';
import firebase from 'Config/firebase';

const KitchenNewOrder = () => {

  const [orderLounge, setOrderLounge] = useState([]);

  useEffect(() => {
    firebase.firestore()
      .collection('orders')
      .orderBy('time', 'asc')
      .where('state', '==', 'Preparando')
      .get()
      .then((result) => {
        const arrayOrder = [];
        result.docs.forEach(doc => {
          arrayOrder.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setOrderLounge(arrayOrder)
      })
  }, []);
  console.log(orderLounge);

  return (
    <>
      <div>
        <HeaderKitchen />
      </div>

      <div>
        {orderLounge.map(item => <OrdersReceived key={item.id} time={item.time} table={item.table} client={item.client} menuItem={item.menuItem} state={item.state} idDoc={item.id} />)}
      </div>

    </>
  )
}

export default KitchenNewOrder;