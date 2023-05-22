import React from 'react';
  
function ImagePopup({card, onClose}) {

  return (
    <div className={`popup card-popup ${card.link && 'popup_opened'}`}>
      <div className="card-popup__container">
        <h2 className="card-popup__title">{card.name}</h2>
        <img className="card-popup__image" src={card.link} alt={card.name} />
        <button className="popup__closeBtn" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;