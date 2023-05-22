import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import InfoToolTip from './InfoToolTip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoToolTipMessage, setInfoToolTipMessage] = useState('');

  const navigate = useNavigate();

  function handleRegister(password, email) {
    auth.register(password, email)
    .then((res) => {
      navigate('/sign-in', {replace: true});
      setIsSuccess(true);
      setInfoToolTipMessage('Вы успешно зарегистрировались!');
      handleInfoToolTipOpen();
    })
    .catch((err) => {
      console.log(err);
      handleFail();
    });
  }

  function handleLogin(password, email) {
    auth.authorize(password, email)
    .then((data) => {
      if(data.token) {
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/', {replace: true});
      }
    })
    .catch((err) => {
      console.log(err);
      handleFail();
    });
  }

  function handleFail() {
    setIsSuccess(false);
    setInfoToolTipMessage('Что-то пошло не так! Попробуйте ещё раз.');
    handleInfoToolTipOpen();
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if(token) {
      auth.getContent(token)
      .then((res) => {
        if(res) {
          setLoggedIn(true);
          setUserEmail(res.data.email)
           navigate('/', {replace: true})
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  function handleInfoToolTipOpen() {
    setIsInfoToolTipOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoToolTipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));    
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    console.log(data);
    api.postCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards,]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then((res) => {
      console.log(res);
      setCards((prevState) => prevState.filter(oldCard => oldCard._id != card._id))
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
    .then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(link) {
    api.patchAvatar(link)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function c(mes) {
    console.log(mes);
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect (() => {
    if(loggedIn) {
      api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
  });
    }
  }, [loggedIn])

  useEffect(() => {
    if(loggedIn) {
      api.getCardArray()
      .then((cardArray) => {
        setCards(cardArray);
      })
      .catch((err) => {
        console.log(err); 
      });
    }
  }, [loggedIn])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} handleLogOut={handleLogOut} userEmail={userEmail} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={<ProtectedRouteElement element={Main} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} loggedIn={loggedIn} />} />
        </Routes>
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup  onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm name="deleteCard" title="Вы уверены" />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoToolTip onClose={closeAllPopups} isOpen={isInfoToolTipOpen} isSuccess={isSuccess} message={infoToolTipMessage} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
