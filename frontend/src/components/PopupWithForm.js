import React, {useEffect} from 'react';
import Popup from './Popup';

function PopupWithForm({name, title, btnText, children, isOpen, onClose, onSubmit}) {
    useEffect(() => {
        function handleEscClose(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClose);
        }

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        }
    }, [isOpen, onClose]);

    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <form className="popup__content popup__content-profile" name={name} onSubmit={onSubmit}>
                <h2 className="popup__title">{title}</h2>
                {children}
                <button className="popup__btn" type="submit">{btnText}</button>
            </form>
        </Popup>
    );
}

export default PopupWithForm;
