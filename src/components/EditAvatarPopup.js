import { useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
	const avatarRef = useRef();

	function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
			avatar: avatarRef.current.value
		});
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      title={"Обновить аватар"}
      name={"avatar"}
      buttonText={"Сохранить"}
      nameOfForm={"avatar"}
      onClose={props.onClose}
			onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_avatar"
        placeholder="Ссылка на картинку"
        required
        name="avatar"
				ref={avatarRef}
      ></input>
      <span className="avatar-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
