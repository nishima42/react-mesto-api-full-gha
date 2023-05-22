import React from 'react';
  
function PopupWithForm(props) {

  return (
      <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit}>
            <h2 className="popup__title">{props.title}</h2>
              {props.children}
              <button type="submit" className="popup__submitBtn">{props.buttonText}</button>
          </form>
          <button className="popup__closeBtn" type="button" onClick={props.onClose}></button>
        </div>
      </div>
  );
}

export default PopupWithForm; 