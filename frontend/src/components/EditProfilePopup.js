import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser?.name || '');
    const [description, setDescription] = useState(currentUser?.about || '');

    useEffect(() => {
        setName(currentUser?.name || '');
        setDescription(currentUser?.about || '');
    }, [currentUser]);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="profile" title="Редактировать профиль" btnText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__input-field">
                <input className="popup__input popup__name" type="text" name="name" placeholder="Введите имя" minLength="2" maxLength="40" required value={name} onChange={handleNameChange}/>
                <span id="name-error" className="popup__input-error"></span>
            </fieldset>
            <fieldset className="popup__input-field">
                <input className="popup__input popup__job" type="text" name="job" placeholder="Введите вид деятельности" minLength="2" maxLength="200" required value={description} onChange={handleDescriptionChange}/>
                <span id="job-error" className="popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}
