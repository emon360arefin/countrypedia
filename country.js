const apiCall = (region = 'all') => {
    fetch(`https://restcountries.com/v3.1/${region}`)
        .then(res => res.json())
        .then(countries => firstStep(countries))
}

apiCall()

let countries2 = '';
const firstStep = (countries) => {
    // console.log(countries);
    countries2 = countries;
    displayName(countries);
}

const countryContainer = document.querySelector('.country-container');


function displayName(first) {

    if (first == '!') {
        first = countries2;
    }
    const filteredCountry = first.filter(gg => gg.population >= globalPop);
    console.log(filteredCountry);

    countryContainer.innerHTML = '';
    const num = filteredCountry.length;
    const numDisplay = document.getElementById('region-number');
    const numDisplay2 = document.getElementById('population-number');
    numDisplay.innerText = `${num}`;
    numDisplay2.innerText = `${num}`;

    addCard(filteredCountry);
}



const addCard = (desh) => {
    // console.log(desh);
    // let k = desh.length;
    let i = 0;

    for (const gram of desh) {
        let j = i;


        const pop = gram.population;
        // console.log(pop);

        const cardContainer = document.createElement('div');
        // cardContainer.innerHTML = `<div class="card-container  p-2 shadow bg-green-700 rounded-lg"></div>`;
        cardContainer.style.backgroundColor = '#F1F5F9';
        cardContainer.style.boxShadow = '0 0 10px 1px #E5E5E5'
        cardContainer.style.padding = '10px';
        cardContainer.style.borderRadius = '8px';


        const card = document.createElement('div');
        const detailButton = document.createElement('div');
        const languageObj = gram.languages;

        const language = Object.values(languageObj);
        // console.log(language);
        card.innerHTML = `
        <div class="card">
            <img class="rounded-md w-auto h-40" src="${gram.flags.png}" alt="">
            <div class="grid grid-cols-2 gap-2 mt-2">
                
                <h3 class="py-px text-sm text-white px-4 bg-blue-300 rounded-full">${language[0]}</h3>
                <h3 class="py-px text-sm text-white px-4 bg-blue-300 rounded-full">${pop}</h3>
            </div>
            <h2 class="name mt-2 text-xl h-16 font-semibold">Country: ${gram.name.common} </h2>  
            
        </div>`;

        detailButton.innerHTML = `
        <button id="btn-detail-${j}"  class="py-2 px-12 bg-slate-500 hover-red-500 text-white rounded-md">VIEW DETAILS</button>`;


        cardContainer.appendChild(card);
        card.appendChild(detailButton);
        countryContainer.appendChild(cardContainer);

        detailButton.addEventListener('click', function () {
            console.log('Clicked');
            displayModal(desh, j)
        })

        i = i + 1;

    }
    i = 0;
}

// DISPLAY MODAL
const displayModal = (desh, j) => {
    console.log(desh);
    console.log(j);
    console.log(desh[j]);
    const modal = document.getElementById('modal');
    
    const flag = document.getElementById('flag');
    flag.src = `${desh[j].flags.png}`;

    const country = document.getElementById('country');
    country.innerHTML = `
    Country: ${desh[j].name.common}`;

    const capital = document.getElementById('capital');
    capital.innerHTML = `
    Capital: ${desh[j].capital[0]}`;

    const continent = document.getElementById('continent');
    continent.innerHTML = `
    Continent: ${desh[j].continents[0]}`;

    const languageObj = desh[j].languages;

    const lang = Object.values(languageObj);

    const langu = document.getElementById('language');
    langu.innerHTML = `
    Languages: ${lang}`;

    const population = document.getElementById('population');
    population.innerHTML = `
    Population: ${desh[j].population}`;



    modal.classList.toggle('hidden');

}

let globalPop = '';


document.getElementById('select-region').addEventListener('change', function (event) {
    const region = event.target.value;
    // console.log(region);
    apiCall(region);
})



document.getElementById('select-population').addEventListener('change', function (event) {

    const popula = event.target.value;
    const popu = parseInt(popula);
    globalPop = popu;
    displayName('!')

})


const closeModal = () => {
    const modal = document.querySelectorAll('.modal');
    modal.forEach(singleModal => singleModal.classList.toggle('hidden'));
}

function hideDiv(event) {

    var clickedElement = event.target;

    if (clickedElement.id == "modal") {
        clickedElement.classList.toggle('hidden');
    }
    
}






