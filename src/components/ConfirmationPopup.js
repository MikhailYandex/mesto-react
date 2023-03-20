import PopupWithForm from "./PopupWithForm";

const ConfirmationPopup = (props) => {
	function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete()
  }

  return (
    <PopupWithForm
      title="Вы уверены?" 
			name="confirm" 
			nameOfForm={"confirm"}
      buttonText={props.buttonText}
			container={'-confirm'}
			isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
			titleClass={'-confirm'}
		>
    </PopupWithForm>
  );
};

export default ConfirmationPopup;
