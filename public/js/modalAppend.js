export default (data, kitten, title) => {
	const modalParent = document.createElement("DIV");
	const modalDialog = document.createElement("DIV");
	const modalContent = document.createElement("DIV");
	const headerFive = document.createElement("H5");
	const closeModal = document.createElement("BUTTON");
	const closeModalIcon = document.createElement("SPAN");
	const modalBody = document.createElement("DIV");
	const modalFooter = document.createElement("DIV");
	const confirmButton = document.createElement("BUTTON");
	const deniedButton = document.createElement("BUTTON");
	const modalText = document.createElement("P");
	const modalWrapper = document.createElement("DIV");

	modalParent.className = "modal";
	modalParent.setAttribute("id", "modal-dismiss");

	//modalParent.setAttribute("tabindex", "-1");

	modalParent.setAttribute("role", "dialog");

	modalDialog.className = "modal-dialog";

	modalDialog.setAttribute("role", "document");

	modalContent.className = "modal-header";

	headerFive.className = "modal-title";
	headerFive.innerText = title;

	closeModalIcon.setAttribute = ("aria-hidden", "true");

	closeModalIcon.innerHTML = "&times;";

	modalBody.className = "modal-body";
	modalBody.innerText = kitten;

	modalFooter.className = "modal-footer";

	confirmButton.className = "confirmButton btn btn-primary";
	confirmButton.setAttribute("type", "button");
	confirmButton.innerText = "Yes";

	deniedButton.className = "closeModal btn btn-secondary";
	deniedButton.setAttribute("type", "button");
	deniedButton.setAttribute("data-dismiss", "modal");
	deniedButton.innerText = "NO!!!!";

	modalText.innerText = data;
	modalWrapper.className = "modal-content";

	//Modal Header

	modalContent.appendChild(headerFive);
	closeModal.appendChild(closeModalIcon);

	// Modal body

	modalBody.appendChild(modalText);

	// Modal Footer

	modalFooter.appendChild(confirmButton);
	modalFooter.appendChild(deniedButton);

	modalWrapper.appendChild(modalContent);
	modalWrapper.appendChild(modalBody);
	modalWrapper.appendChild(modalFooter);

	modalDialog.appendChild(modalWrapper);

	modalParent.appendChild(modalDialog);

	return modalParent;
};
