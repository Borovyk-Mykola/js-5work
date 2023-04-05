import './css/styles.css';
import {fetchCountries} from "./fetchCountries";
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');


const refs = {
    searchBox: document.querySelector('[id="search-box"]'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

const debounceFetchCountries = debounce(onSearch, 300);
refs.searchBox.addEventListener('input', debounceFetchCountries);

function onSearch(e) {
    e.preventDefault();
    const value = refs.searchBox.value.trim();
    console.log(value);

    if (!value) {
        refs.countryList.style.visibility = 'hidden';
        refs.countryInfo.style.visibility = 'hidden';
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return;
    }
  
    fetchCountries(value)
    .then(countriesList => {
        if (countriesList.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        };
        renderCountries(countriesList);
    })
    .catch(err => {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
  
function generateCountryInfo(data) {
    data.reduce(
      (acc, { flags: { svg }, name, capital, population, languages }) => {
        console.log(languages);
        languages = Object.values(languages).join(', ');
        console.log(name);
        return (
          acc +
          ` <img src="${svg}" alt="${name}" width="320" height="auto">
              <p> ${name.official}</p>
              <p>Capital: <span> ${capital}</span></p>
              <p>Population: <span> ${population}</span></p>
              <p>Languages: <span> ${languages}</span></p>`
        );
    },  '');
};
  
function generateCountryList(data) {
    data.reduce((acc, { name: { official, common }, flags: { svg } }) => {
      return (
        acc +
        `<li>
          <img src="${svg}" alt="${common}" width="70">
          <span>${official}</span>
        </li>`
      );
    }, '');
};
  
function renderCountries(result) {
    if (result.length === 1) {
        refs.countryList.innerHTML = '';
        refs.countryList.style.visibility = 'hidden';
        refs.countryInfo.style.visibility = 'visible';
        refs.countryInfo.innerHTML = generateCountryInfo(result);
    }
    if (2 <= result.length <= 10) {
        refs.countryInfo.innerHTML = '';
        refs.countryInfo.style.visibility = 'hidden';
        refs.countryList.style.visibility = 'visible';
        refs.countryList.innerHTML = generateCountryList(result);
    }
}