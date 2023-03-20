import { useEffect } from "react";

function PopupWithForm(props) {
  //закрытие по клавише Escape
  function closeByEscape(e) {
    if (e.key === "Escape") {
      props.onClose();
    }
  }
	
  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [props.isOpen]);

  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClose}
    >
      <div
        className={`popup__container${props.container}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className={`popup__title${props.titleClass}`}>{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.nameOfForm}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
