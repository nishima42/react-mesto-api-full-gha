import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
  
function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img className="profile__picture" src={currentUser.avatar} alt="Аватар профиля" />
        <div className="profile__overlay" onClick={props.onEditAvatar}></div> 
        <div className="profile__info">
          <div className="profile__nameContainer">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__editButton" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__addBtn" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards.map((card, i) => (
          <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;