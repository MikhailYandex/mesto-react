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
import ConfirmationPopup from "./ConfirmationPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
	const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState({});

  //действующий пользователь
  const [currentUser, setCurrentUser] = useState({});

	//массив карточек с сервера
  const [cards, setCards] = useState([]);

	//карточки, которые нужно удалить
  const [removingCard, setRemovingCard] = useState({});

	//Загрузка данных при клике на кнопку
	const [isLoadingButton, setisLoadingButton] = useState(false);

  useEffect(() => {
    api.getCards().then((data) => {
      setCards(data);
    })
		.catch(err => console.log(err));
  }, []);

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

	//отправка новых данных пользователя на сервер
  function handleUpdateUser(data) {
		setisLoadingButton(true);
    api.editUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
				setisLoadingButton(false);
      })
      .catch(err => console.log(err));
  }

	//отправка новой аватарки на сервер
  function handleUpdateAvatar(link) {
		setisLoadingButton(true);
    api.editUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
				setisLoadingButton(false);
      })
      .catch(err => console.log(err));
  }

	//добавление новой карточки из формы
  function handleAddPlaceSubmit(data) {
		setisLoadingButton(true);
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
				setisLoadingButton(false);
      })
      .catch(err => console.log(err));
  }

	//обработчик удаления карточки
	function handleCardDelete() {
		setisLoadingButton(true);
		api.removeCard(removingCard._id)
			.then(() => {
				setCards((cards) => cards.filter((c) => c._id !== removingCard._id));
				closeAllPopups();
				setisLoadingButton(false);
			})
			.catch(err => console.log(err));
	}

	function handleCardDeleteClick(card) {
		setIsConfirmationPopupOpen(true);
		setRemovingCard(card);
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
		setIsConfirmationPopupOpen(false);
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
					onTrashClick={handleCardDeleteClick}
					cards={cards}
				/>
				<Footer />

				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
					buttonText = {isLoadingButton ? 'Сохранение...' : 'Сохранить'}
				></EditProfilePopup>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlaceSubmit}
					buttonText = {isLoadingButton ? 'Сохранение...' : 'Сохранить'}
				>
				</AddPlacePopup>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
					buttonText = {isLoadingButton ? 'Сохранение...' : 'Сохранить'}
				>
				</EditAvatarPopup>

				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
					isOpen={isImagePopupOpen}
				></ImagePopup>

				<ConfirmationPopup
					isOpen={isConfirmationPopupOpen}
					onClose={closeAllPopups}
					onCardDelete={handleCardDelete}
					buttonText = {isLoadingButton ? 'Удаление...' : 'Да'}
				></ConfirmationPopup>
			</div>
		</CurrentUserContext.Provider>
  );
}

export default App;
