import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  //очистка полей формы при открытии
  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Новое место"}
      name={"add"}
      buttonText={props.buttonText}
      nameOfForm={"add"}
			container={''}
      onClose={props.onClose}
      onSubmit={handleSubmit}
			titleClass={''}
    >
      <input
        type="text"
        className="popup__input popup__input_name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        name="place"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      ></input>
      <span className="place-error popup__input-error"></span>
      <input
        type="url"
        className="popup__input popup__input_link"
        placeholder="Ссылка на картинку"
        required
        name="link"
        value={cardLink}
        onChange={(e) => setCardLink(e.target.value)}
      ></input>
      <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
