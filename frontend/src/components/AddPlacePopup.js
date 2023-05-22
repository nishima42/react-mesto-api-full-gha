import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
        name,
        link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]); 
  
  return (
    <PopupWithForm name="addPlace" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText="Сохранить">
      <input id="place-input" type="text" className="popup__input inputPlace" value={name} onChange={handleNameChange} name="name" placeholder="Название" minLength="2" maxLength="30" required />
      <div className="popup__errorContainer">
        <span className="popup__input-error place-input-error"></span>
      </div>
      <input id="link-input" type="url" className="popup__input inputLink" value={link} onChange={handleLinkChange} name="link" placeholder="Ссылка на картинку" required />
      <div className="popup__errorContainer">
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
  
  export default AddPlacePopup;