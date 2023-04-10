import './css/styles.css';
import {fetchCountries, refs} from "./fetchCountries";
var debounce = require('lodash.debounce');

const debounceOnSearch = debounce(onSearch, 300);
refs.searchBox.addEventListener('input', debounceOnSearch);

function onSearch(e) {
    e.preventDefault();
    const value = refs.searchBox.value.trim();
    
    if (!value) {
        refs.countryList.style.visibility = 'hidden';
        refs.countryInfo.style.visibility = 'hidden';
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }
    fetchCountries(value); 
}