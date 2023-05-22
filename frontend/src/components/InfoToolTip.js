import React from 'react';

function InfoToolTip(props) {

  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <div className={`popup__icon ${props.isSuccess ? 'popup__icon_type_success' : 'popup__icon_type_fail'}`}></div>
        <h2 className="popup__text popup__title">{props.message}</h2>
        <button className="popup__closeBtn" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default InfoToolTip;