import React from 'react';
import PopupWithForm from './PopupWithForm.js';
  
function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSumbit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]); 

  return (
    <PopupWithForm name="editAvatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSumbit} buttonText="Сохранить">
      <input id="avatar-input" type="url" className="popup__input inputAvatar" ref={avatarRef} name="avatar" placeholder="Ссылка на аватар" required />
      <div className="popup__errorContainer">
        <span className="popup__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;