import { useEffect } from "react";
import useFormWithValidation from "../hooks/useFormWithValidation";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
	const {values, handleChange, errors, isValid, resetForm} = useFormWithValidation();

	useEffect(() => {
    resetForm();
  }, [props.isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: values.avatar || '',
    });
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Обновить аватар"}
      name={"avatar"}
      buttonText={props.buttonText}
      nameOfForm={"avatar"}
			container={'-avatar'}
      onClose={props.onClose}
			onSubmit={handleSubmit}
			titleClass={'-avatar'}
			isDisabled={!isValid}
    >
      <input
        type="url"
        className={`popup__input popup__input_avatar ${errors.avatar && "popup__input_type_error"}`}
        placeholder="Ссылка на картинку"
        required
        name="avatar"
				value={values.avatar || ''}
				onChange={handleChange}
      ></input>
			<span className={`avatar-error popup__input-error ${errors.avatar && "popup__input-error_active"}`}>{errors.avatar || ''}</span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
