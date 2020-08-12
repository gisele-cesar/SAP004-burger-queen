import React from 'react';
import 'Components/Lounge-Order-Ready/order-ready.css';
import Button from 'Components/Button/button';

const OrderReady = () => {
	return (
		<div className='order-ready-wrapper'>
			<div className='table-wrapper'>
				<div className='time-wrapper'>10m</div>
				<div className='table-number'>Mesa:</div>
				<div className='client-information'>Cliente: </div>
				<div className='waiter-information'>Atendente: </div>
			</div>
			<div className='order-information-wrapper'>
				<div className='ordered-wrapper'>
					<div className='quantify-ordered'>2 x</div>
					<div className='item-ordered'>Batata Frita</div>
				</div>
				<div className='ordered-wrapper'>
					<div className='quantify-ordered'>1 x</div>
					<div className='item-ordered'>Hambúrger Duplo</div>
				</div>
			</div>
			<div className='btn-wrapper'>
				<Button className='btn-std' children={'Entregar'} />
			</div>

		</div>
	)

}

export default OrderReady;