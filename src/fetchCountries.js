import Notiflix from 'notiflix';

const refs = {
    searchBox: document.querySelector('[id="search-box"]'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

function fetchCountries(name) {
	const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

	return fetch(url).then(response => {
        if(response.status === 404) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
        }
        return response.json().then(countriesList => {
            if (countriesList.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                return
            };
            if (2 <= countriesList.length <= 10) {
                refs.countryInfo.innerHTML = '';
                refs.countryInfo.style.visibility = 'hidden';
                refs.countryList.style.visibility = 'visible';
                refs.countryList.innerHTML = generateCountryList(countriesList);
            };
            if (countriesList.length === 1) {
                refs.countryList.innerHTML = '';
                refs.countryList.style.visibility = 'hidden';
                refs.countryInfo.style.visibility = 'visible';
                refs.countryInfo.innerHTML = generateCountryInfo(countriesList);
            };
        })
        .catch(err => {
            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
        });;
    })
};

function generateCountryInfo(result) {
    const resultCountryInfo = result.map(({ flags, name, capital, population, languages }) => {
    const language = Object.values(languages).join(', ');
    return `<img src="${flags.svg}" alt="${name}" width="320">
            <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population}</span></p>
            <p>Languages: <span> ${language}</span></p>`;
    }).join('');
    refs.countryInfo.innerHTML = resultCountryInfo;
    return resultCountryInfo;
};
  
function generateCountryList(result) {
    const resultCountryList = result.map(({ flags, name }) => {
      return `<li>
                <img src="${flags.svg}" alt="${name}" width="30">
                <span>${name.common}</span>
            </li>`
    }).join('');
    refs.countryList.innerHTML = resultCountryList;
    return resultCountryList;
}

export {fetchCountries, refs}