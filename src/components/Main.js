import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card.js";

function Main(props) {
  const userData = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__box">
          <div
            onClick={props.onEditAvatar}
            className="profile__avatar-container"
          >
            <img
              src={userData.avatar}
              className="profile__avatar"
              alt="Аватар Жак-Ив-Кусто"
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userData.name}</h1>
            <button
              onClick={props.onEditProfile}
              type="button"
              className="profile__edit-button"
            ></button>
            <p className="profile__text">{userData.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
						onTrashClick={props.onTrashClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
