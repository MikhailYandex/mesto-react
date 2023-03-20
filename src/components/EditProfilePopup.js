import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
	const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

	useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

	function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
			isOpen={props.isOpen}
			title={"Редактировать профиль"}
			name={"edit"}
			buttonText={props.buttonText}
			nameOfForm={"edit"}
			container={''}
			titleClass={''}
			onClose={props.onClose}
			onSubmit={handleSubmit}
		>
      <input
        type="text"
        className="popup__input popup__input_name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        name="name"
				value={name}
				onChange={e => setName(e.target.value)}
      ></input>
      <span className="name-error popup__input-error"></span>
      <input
        type="text"
        className="popup__input popup__input_text"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        name="text"
				value={description}
				onChange={e => setDescription(e.target.value)}
      ></input>
      <span className="text-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
