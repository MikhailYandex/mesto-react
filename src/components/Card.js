import React from 'react'

function Card(props) {
	return (
		<article className="element">
			<button className="element__delete-icon" type="button"></button>
			<img src={props.card.link} className="element__photo" alt={props.card.name} 
			onClick={() => props.onCardClick(props.card)}></img>
			<div className="element__group">
				<h2 className="element__text">{props.card.name}</h2>
				<div className="element__like-block">
					<button type="button" className="element__like"></button>
					<p className="element__like-counter">{props.card.likes.length}</p>
				</div>
			</div>
		</article>
	)
}

export default Card