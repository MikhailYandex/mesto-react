import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";
import ImagePopup from "./ImagePopup";

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
	const [selectedCard, setSelectedCard] = useState({});

	function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true)
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
    <div className='page'>
			<Header/>
			<Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} 
						onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
			<Footer/>

			<PopupWithForm isOpen={isEditProfilePopupOpen} title={"Редактировать профиль"} name={"edit"}
			buttonText={"Сохранить"} nameOfForm={"edit"} onClose={closeAllPopups}>
				<input type="text" className="popup__input popup__input_name" placeholder="Имя" required
      	minLength="2" maxLength="40" name="name"></input>
				<span className="name-error popup__input-error"></span>
				<input type="text" className="popup__input popup__input_text" placeholder="О себе" required
        minLength="2" maxLength="200" name="text"></input>
				<span className="text-error popup__input-error"></span>
			</PopupWithForm>

			<PopupWithForm isOpen={isAddPlacePopupOpen} title={"Новое место"} name={"add"} 
			buttonText={"Сохранить"} nameOfForm={"add"} onClose={closeAllPopups}>
				<input type="text" className="popup__input popup__input_name" placeholder="Название" required
       	minLength="2" maxLength="30" name="place"></input>
				<span className="place-error popup__input-error"></span>
				<input type="url" className="popup__input popup__input_link" placeholder="Ссылка на картинку"
       	required name="link"></input>
				<span className="link-error popup__input-error"></span>
			</PopupWithForm>

			<PopupWithForm isOpen={isEditAvatarPopupOpen} title={"Обновить аватар"} name={"avatar"}
			buttonText={"Сохранить"} nameOfForm={"avatar"} onClose={closeAllPopups}>
				<input type="url" className="popup__input popup__input_avatar" placeholder="Ссылка на картинку"
        required name="avatar"></input>
				<span className="avatar-error popup__input-error"></span>
			</PopupWithForm>

			<ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}></ImagePopup>

			<PopupWithForm title={"Вы уверены?"} buttonText={"Да"} name={"confirm"} 
			nameOfForm={"popup__form_confirm"}>
			</PopupWithForm>

		</div>

  );
}

export default App;
