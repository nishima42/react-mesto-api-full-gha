import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
  
function EditProfilePopup(props) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  return (
    <PopupWithForm name="editProfile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <input id="name-input" type="text" className="popup__input inputName" value={name || ''} onChange={handleNameChange} name="nameEdit" placeholder="Введите имя" minLength="2" maxLength="40" required />
      <div className="popup__errorContainer">
        <span className="popup__input-error name-input-error"></span>
      </div>
      <input id="about-input" type="text" className="popup__input inputAbout" value={description || ''} onChange={handleDescriptionChange} name="aboutEdit" placeholder="Введите профессию" minLength="2" maxLength="200" required />
      <div className="popup__errorContainer">
        <span className="popup__input-error about-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;