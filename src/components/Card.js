import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const userData = useContext(CurrentUserContext);

  //проверка собственник ли карточки
  const isOwner = props.card.owner._id === userData._id;

  //проверяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === userData._id);
  //переменная для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      {isOwner && (
        <button
          className="element__delete-icon"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={props.card.link}
        className="element__photo"
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__group">
        <h2 className="element__text">{props.card.name}</h2>
        <div className="element__like-block">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
