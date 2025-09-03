// Подключение из node_modules
import * as noUiSlider from 'nouislider';

// Подключение стилей из scss/base/forms/range.scss 
import './range.scss';

// Подключение стилей из node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	const priceSlider = document.querySelector('[data-fls-range]');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: 75,
			connect: [true, false],
			range: { min: 0, max: 100 },
			format: {
				to: value => Math.round(value) + '%',
				from: value => Number(value.replace('%', ''))
			}
		});

		// Спан создаем внутри контейнера, но вне хендла
		const sliderValue = document.createElement('span');
		sliderValue.classList.add('range-value');
		priceSlider.appendChild(sliderValue);

		priceSlider.noUiSlider.on('update', function (values) {
			sliderValue.textContent = values[0];
		});
	}
}

document.querySelector('[data-fls-range]') ?
	window.addEventListener('load', rangeInit) : null;

