import "./feedback.scss"

document.addEventListener('DOMContentLoaded', () => {
	const fileInput = document.querySelector('.file-input');
	const fileNameDisplay = document.querySelector('.custom-file-upload__filename');

	fileInput.addEventListener('change', (event) => {
		const file = event.target.files[0];
		if (file) {
			fileNameDisplay.textContent = file.name; // Отображаем имя файла
		} else {
			fileNameDisplay.textContent = 'Файл не выбран';
		}
	});
});




