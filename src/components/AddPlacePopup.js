import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

	
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Новое место"}
      name={"add"}
      buttonText={"Сохранить"}
      nameOfForm={"add"}
      onClose={props.onClose}
    >
      <input
        type="text"
        className="popup__input popup__input_name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        name="place"
      ></input>
      <span className="place-error popup__input-error"></span>
      <input
        type="url"
        className="popup__input popup__input_link"
        placeholder="Ссылка на картинку"
        required
        name="link"
      ></input>
      <span className="link-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
