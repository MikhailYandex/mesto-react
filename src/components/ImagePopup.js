import React from 'react'

function ImagePopup(props) {
	return (
		<div className={`popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`} onClick={props.onClose}>
			<div className={`popup__container-image`} onClick={e=>e.stopPropagation()}>
				<button className="popup__close" type="button" onClick={props.onClose}></button>
				<figure className="popup__figure">
					<img src={props.card.link} className="popup__image" alt={props.card.name}/>
					<figcaption className="popup__caption">{props.card.name}</figcaption>
				</figure>
			</div>
		</div>
	)
}

export default ImagePopup