import React from 'react';
import FormatDate from 'Components/Utils/utils';
import './kitchen.css';

const FinalizedOrders = ({ state, time, table, client, menuItem, waiterName, total, endTime }) => {

  return (
    <div className='kitchen-order-wrapper'>
      <div className='kitchen-table-wrapper'>
        <div className='kitchen-time-wrapper'>{FormatDate(time)}</div>
        <div className='finish-time-wrapper'><u>Pedido pronto em: {parseFloat((endTime - time) / (1000 * 60)).toFixed(2)} min.</u></div>
        <div className='client-table-wrapper'>
          <div className='kitchen-table-information-a'><span className='strong-kitchen'>Cliente: </span>{client} </div>
          <div className='kitchen-table-information'><span className='strong-kitchen'>Mesa: </span> {table} </div>
        </div>
        <div className='kitchen-table-information'><span className='strong-kitchen'>Status: </span>{state}</div>
        <div className='kitchen-table-information'><span className='strong-kitchen'>Atendente: </span> {waiterName}</div>
      </div>
      <div className='kitchen-order-info'>
        <div className='kitchen-ordered-wrapper'>
          {menuItem.filter(item => item.hamburger === true).map(element =>
            <div className='items-wrapper'>
              <div className='kitchen-name-quantity'>
                <div className='kitchen-quantify-ordered'>{element.quantity}</div>
                <div className='kitchen-item-ordered'>{element.name}</div>
                <div className='kitchen-price-ordered'>R${element.price},00</div>
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
                <div className='kitchen-price-ordered'>R${element.price},00</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='total-wrapper'>
        <div className='total-ordered'>Total: {total},00</div>
      </div>
    </div >
  )
}

export default FinalizedOrders;