import React from 'react';

function PopupWithForm(props) {

	return (
		<div className= {`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
		onClick={props.onClose}>
			<div className= {`popup__container popup__container-${props.name}`} onClick={e=>e.stopPropagation()}>
				<button type="button" className="popup__close" onClick={props.onClose}></button>
				<h2 className="popup__title">{props.title}</h2>
				<form className={`popup__form popup__form_${props.nameOfForm}`} noValidate>
					{props.children}
					<button type="submit" className="popup__button">{props.buttonText}</button>
				</form>
			</div>
		</div>
	)
}

export default PopupWithForm