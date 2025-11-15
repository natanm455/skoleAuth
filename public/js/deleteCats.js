import renderModal from "./modalAppend.js";

const container = document.getElementsByClassName("deleteContainer")[0];

container.addEventListener("click", (e) => {
	if (e.target.classList.contains("deleteCatBtn")) {
		const data = e.target.getAttribute("data-id");
		const kitten = e.target.dataset.name;
		const title = "Are you sure you want to delete this cute kitten?";
		console.log(data);
		console.log("Touch my belly button");
		const modal = renderModal(data, kitten, title);
		const el = document.createElement("div");
		el.innerText = "apesalata";

		container.appendChild(modal);

		const closeBtn = document.getElementsByClassName("closeModal")[0];

		closeBtn.addEventListener("click", (e) => {
			container.removeChild(modal);
		});

		const confirmButton = document.getElementsByClassName("confirmButton")[0];

		confirmButton.addEventListener("click", async (e) => {
			const kittenCard = document.getElementById(data);
			console.log(kittenCard);
			try {
			
				const res = await fetch("/delete/" + data, {
					method: "DELETE",
				});

				//const { redirect } = res.json()

				container.removeChild(modal);
				kittenCard.remove();
			} catch (err) {
				console.log(err);
			}
		});
	}
});
