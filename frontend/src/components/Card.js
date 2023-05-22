import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
  
function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__likeButton ${isLiked && 'element__likeButton_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="element">
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      {isOwn && <button type="button" className="element__deleteButton" onClick={handleDeleteClick} />}
      <div className="element__description">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__likeContainer">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__likeQuantity">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;