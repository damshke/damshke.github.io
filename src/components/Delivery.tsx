import * as React from 'react';
import { useState } from 'react';
import '../styles/Delivery.css'

// to do: 
// кастомизация сообщения об ошибке 
// правильная маска ввода телефона
// адаптив

interface Delivery {
    initials: string;
    phone: string;
    address: string;
    comment: string;
}

const Delivery: React.FC = () => {

    const [initials, setInitials] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');

    const [initialsValid, setInitialsValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);
    const [commentValid, setCommentValid] = useState(true);

    const [initialsError, setInitialsError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [commentError, setCommentError] = useState('');


    // доделать валидацию (стили)
    const handleInitialsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInitials(value);

        const regex = /^[а-яА-Я\s-]+$/;
        const isValid = regex.test(value);
        setInitialsValid(isValid);
        setInitialsError(isValid ? '' : 'В поле "ФИО" допустимы только кириллица, пробел и тире.')
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPhone(value);

        const regex = /^\d+$/;
        const isValid = regex.test(value);
        setPhoneValid(isValid);
        setPhoneError(isValid ? '' : 'Введите корректный номер телефона.')
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);

    };

    const handleSubmit = () => {

        if (initials.trim() === '') {
            setInitialsError('Введите ФИО!');
        } else {
            setInitialsError('');
        }

        if (phone.trim() === '') {
            setPhoneError('Введите номер телефона!');
        } else {
            setPhoneError('');
        }

        if (address.trim() === '') {
            setAddressError('Введите адрес!');
        } else {
            setAddressError('');
        }

        if (comment.trim() === '') {
            setAddressError('Введите комментарий!');
        } else {
            setAddressError('');
        }

        if (initials.trim() !== '' && phone.trim() !== '' && address.trim() !== '' && comment.trim() === '') {
            console.log('Form submitted!');
        }
    };

    return (
        <form>
            <div className="section">
                <div>
                    <label>ФИО</label>
                    <input
                        type="text"
                        className="initials"
                        placeholder='Только кириллица'
                        value={initials}
                        onChange={handleInitialsChange}
                    />
                    {initialsValid ? null : <span className="error">{initialsError}</span>}
                </div>
                <div>
                    <label>Телефон</label>
                    <input
                        type="text"
                        className="phone"
                        placeholder='+7 (___) ___-__-__'
                        value={phone}
                        onChange={handlePhoneChange} />
                    {phoneValid ? null : <span className="error">{phoneError}</span>}
                </div>
            </div>
            <div>
                <label>Адрес доставки</label>
                <input
                    type="text"
                    className="address"
                    placeholder='Город, улица, дом'
                    value={address}
                    onChange={handleAddressChange} />
                {addressValid ? null : <span className="error">{addressError}</span>}
            </div>
            <div>
                <label>Комментарий</label>
                <input
                    type="text"
                    className="comment"
                    value={comment}
                    onChange={handleCommentChange} />
                {commentValid ? null : <span className="error">{commentError}</span>}
            </div>
            <button className={initials === '' || phone === '' || address === '' || comment === '' ? 'enter-disabled' : 'enter'} onClick={handleSubmit}>Оформить заказ</button>
        </form >
    );
};

export default Delivery;