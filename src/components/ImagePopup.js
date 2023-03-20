import { useEffect } from "react";

function ImagePopup(props) {
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
      className={`popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`}
      onClick={props.onClose}
    >
      <div
        className={`popup__container-image`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <figure className="popup__figure">
          <img
            src={props.card.link}
            className="popup__image"
            alt={props.card.name}
          />
          <figcaption className="popup__caption">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
