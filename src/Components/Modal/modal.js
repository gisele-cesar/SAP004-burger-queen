import React, { useState } from 'react';
import Modal from 'react-modal';
import Button from 'Components/Button/button';
import './modal.css';
import Input from 'Components/Input/input';

const MyModal = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [burgerOption, setBurgerOption] = useState('')
  const [adds, setAdds] = useState([])

  const onClickAdd = (e) => {
    const selectedAdd = e.target.value
    if (e.target.checked) {
      setAdds([...adds, selectedAdd])
    } else {
      setAdds([selectedAdd])
    }
  }

  const sendAdds = () => {
    props.addNewItem({ ...props.product, adds, burgerOption, price: props.product.price + adds.length })
    setModalIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setModalIsOpen(true)} className='btn-menu'>{props.children}</Button>
      <Modal {...props} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className='modal-wrapper'>
        <Button onClick={() => setModalIsOpen(false)} className='btn-modal-out'><p className='modal-close' children={'X'}></p></Button>
        <div className='modal-options'>Opções do Hambúrguer</div>
        {props.options.map(option =>
          <>
            <span>
              <Input type='radio' onChange={(e) => { setBurgerOption(e.target.value) }} className='radio-modal' name='options' value={option} />
              <aria-label htmlFor={option}>{option}</aria-label>
            </span>
          </>
        )}
        <div className='adds-wrapper'>
          <div className='modal-options'>Adicionais: </div>
          <div className='input-radio-wrapper'>
            {Object.entries(props.adds).map(item =>
              <div className='input-radio'>
                <Input type='checkbox' value={item[0]} onChange={onClickAdd} />
                <label className='input-radio-label' htmlFor={[]}>{item[0]} R${item[1]},00</label>
              </div>
            )}
          </div>
        </div>
        <Button onClick={sendAdds} className='send-btn-modal' type='button' children={'Adicionar'}></Button>
      </Modal>
    </>
  )
};

export default MyModal;