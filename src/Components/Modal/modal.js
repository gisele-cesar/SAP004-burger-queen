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
            console.log('qualquer coisa')
            setAdds([selectedAdd])

        }
    }
    const sendAdds = () => {
        console.log(props.product.price)
        console.log(adds)
        props.addNewItem({ ...props.product, adds, burgerOption, price: props.product.price + adds.length })
        console.log('adiciona aí')
    }

    return (
        <div>
            <Button onClick={() => setModalIsOpen(true)} className='btn-menu'>{props.children}</Button>

            <Modal {...props} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className='modal-wrapper'>
                <Button onClick={() => setModalIsOpen(false)} className='btn-modal-out'><p className='modal-close'>X</p></Button>
                <div className='modal-options'>Opções do Hambúrguer</div>
                {props.options.map(option =>
                    <>
                        <span><Input type='radio' onChange={(e) => {
                            setBurgerOption(e.target.value)
                            console.log(e.target.value)
                        }} className='radio-modal' name='options' value={option} />
                            <aria-label htmlFor={option}>{option}</aria-label></span>
                    </>
                )}
                <div className='modal-options'>Adicionais: </div>

                {/* <span>
                     <Input type='checkbox'></Input>
                    <aria-label className='radio-label'> Ovo </aria-label></span> */}

                {Object.entries(props.adds).map(item =>
                    <>
                        <Input type='checkbox' value={item[0]} onChange={onClickAdd} />
                        <label htmlFor={[]}>{item[0]} {item[1]}</label>
                    </>
                )}

                <Button onClick={sendAdds} type='button' children={'Adicionar'} />

            </Modal>
        </div>
    );
};

export default MyModal;
