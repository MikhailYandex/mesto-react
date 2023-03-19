import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  //действующий пользователь
  const [currentUser, setCurrentUser] = useState({});

	//массив карточек с сервера
  const [cards, setCards] = useState([]);

	//карточки, которые нужно удалить
  const [removingCard, setRemovingCard] = useState({});

  //получение действующего профиля
  useEffect(() => {
    api.getUserInfo().then((data) => {
        setCurrentUser(data);
      })
      .catch(err => console.log(err));
  }, []);

	//обработчик лайка карточки
	function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.handleCardLike(card._id, isLiked)
			.then((data) => {
      	setCards(cards => cards.map((c) => c._id === card._id ? data : c));
    	})
			.catch(err => console.log(err))
	}

	//обработчик удаления карточки
	function handleCardDelete(card) {
		api.removeCard(card._id)
			.then(() => {
				setCards((cards) => cards.filter((c) => c._id !== card._id));
			})
			.catch(err => console.log(err));
	}

	//отправка новых данных пользователя на сервер
  function handleUpdateUser(data) {
    api.editUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

	//отправка новой аватарки на сервер
  function handleUpdateAvatar(link) {
    api.editUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
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
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header />
				<Main
					onEditProfile={handleEditProfileClick}
					onAddPlace={handleAddPlaceClick}
					onEditAvatar={handleEditAvatarClick}
					onCardClick={handleCardClick}
					onCardLike={handleCardLike}
					onCardDelete={handleCardDelete}
				/>
				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
				></EditProfilePopup>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					// onAddPlace={handleAddPlaceSubmit}
				>
				</AddPlacePopup>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
				>
				</EditAvatarPopup>

				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
					isOpen={isImagePopupOpen}
				></ImagePopup>

				{/* <PopupWithForm
					isOpen={isConfirmationPopupOpen}
					title={"Вы уверены?"}
					buttonText={"Да"}
					name={"confirm"}
					nameOfForm={"popup__form_confirm"}
					onClose={closeAllPopups}
					onDeleteCard={handleCardDelete}
				></PopupWithForm> */}
			</div>
		</CurrentUserContext.Provider>
  );
}

export default App;
