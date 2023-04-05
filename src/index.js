import './css/styles.css';
import {onSeach, refs} from "./fetchCountries"

var debounce = require('lodash.debounce');
const d = debounce(onSeach, 300)
const refs = {

countryInfo: document.querySelector('.country-info')
}

refs.seachBox.addEventListener('input', d)

