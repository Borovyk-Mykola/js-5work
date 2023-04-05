import Notiflix from 'notiflix';

const refs = {
    seachBox: document.querySelector('[id="search-box"]'),
    countryList: document.querySelector('.country-list'),
}

function onSeach(e) {
	const nameCountry = refs.seachBox.value;
    const currentCountry = nameCountry.trim();
	const url = `https://restcountries.com/v3.1/name/${currentCountry}?fields=name,capital,languages,population,flag`;

	fetch(url).then(response => {
        if(response.status === 404) {
            return;
        }
        else {return response.json()};
    }).then(fetchList => {
            if(fetchList.length > 10){
                Notiflix.Notify.info('Too many matches found. Please entar a more specific name');
            }
            else if(2 <= fetchList.length <= 10){
            for(let i = 0; i <= 10; i += 1){
                
                refs.countryList.textContent += 
                fetchList[i].population 
            }}
            
            else {return console.log(fetchList[0].population)}
        }    
    ).catch(error => {Notiflix.Notify.failure('Oops, there is no country with that name')
    });
    
}

export {onSeach, refs}