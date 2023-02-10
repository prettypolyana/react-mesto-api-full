import React, {useEffect, useRef} from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm name="edit-avatar" title="Обновить аватар" btnText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <fieldset className="popup__input-field">
                <input ref={avatarRef} className="popup__input popup__avatar-link" type="url" name="avatar_link" placeholder="Ссылка на картинку" required/>
                <span id="avatar_link-error" className="popup__input-error"></span>
            </fieldset>
        </PopupWithForm>
    );
}
