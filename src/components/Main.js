import React from 'react';
import api from "../utils/api.js";
import { useState, useEffect } from "react";
import Card from './Card.js';

function Main(props) {
	const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
	const [cards, setCards] = useState([]);

	useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setUserAvatar(userData.avatar);
        setUserName(userData.name);
        setUserDescription(userData.about);
        setCards(cardsData);
      })
      .catch((err) => {console.log(err);
      });
  }, []);

	return (
		<main>
			<section className="profile">
				<div className="profile__box">
					<div onClick={props.onEditAvatar} className="profile__avatar-container">
						<img src={userAvatar} className="profile__avatar" alt="Аватар Жак-Ив-Кусто"/>
					</div>
					<div className="profile__info">
						<h1 className="profile__name">{userName}</h1>
						<button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
						<p className="profile__text">{userDescription}</p>
					</div>
				</div>
				<button onClick={props.onAddPlace} type="button" className="profile__add-button"></button>
			</section>
			<section className="elements">
			{cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick}/>
        ))}
			</section>
		</main>
	)
}

export default Main