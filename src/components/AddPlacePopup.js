import { useEffect } from "react";
import useFormWithValidation from "../hooks/useFormWithValidation";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {
	const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

	useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: values.place || '',
      link: values.link || '',
    });
  };

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
			isDisabled={!isValid}
    >
      <input
        type="text"
        className={`popup__input popup__input_name ${errors.place && "popup__input_type_error"}`}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        name="place"
        value={values.place || ''}
        onChange={handleChange}
      ></input>
			<span className={`place-error popup__input-error ${errors.place && "popup__input-error_active"}`}>{errors.place || ''}</span>
      <input
        type="url"
				className={`popup__input popup__input_link ${errors.link && "popup__input_type_error"}`}
        placeholder="Ссылка на картинку"
        required
        name="link"
        value={values.link || ''}
        onChange={handleChange}
      ></input>
			<span className={`link-error popup__input-error ${errors.link && "popup__input-error_active"}`}>{errors.link || ''}</span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
