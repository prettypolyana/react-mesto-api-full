import React, {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const nameRef = useRef();
    const linkRef = useRef();

    useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value,
        });
    }

    return (
        <PopupWithForm name="add-card" title="Новое место" btnText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__input-field">
                <input ref={nameRef} className="popup__input popup__card-name" type="text" name="card_name" placeholder="Название" minLength="2" maxLength="30" required />
                <span id="card_name-error" className="popup__input-error"></span>
            </fieldset>
            <fieldset className="popup__input-field">
                <input ref={linkRef} className="popup__input popup__link" type="url" name="card_link" placeholder="Ссылка на картинку" required />
                <span id="card_link-error" className="popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}
