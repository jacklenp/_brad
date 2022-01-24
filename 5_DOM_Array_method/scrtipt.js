 const main = document.getElementById('main');
 const addUserBtn = document.getElementById('add-user');
 const doubleBtn = document.getElementById('double');
 const showMillionairesBtn = document.getElementById('show-millionaires');
 const sortBtn = document.getElementById('sort');
 const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and money
// function getRandomUser() {
//     fetch('https://randomuser.me/api')
//         .then(json => json.json())
//         .then(data => console.log(data ))
// }

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    console.log(res);
    const data = await res.json();
console.log(data);

    const user = data.results[0];

// console.log(user);
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
        photo: `${user.picture.medium}`
    }
// console.log(newUser);


    addData(newUser);
}

// Add new obj to data arr
function addData(obj) {

// console.log(obj);
    data.push(obj); 

    updateDOM()
}

// Double everyones money
function doubleMoney() {
    data = data.map(user => {
        return ({...user, money: user.money * 2} );

    });
    console.log(data);
    updateDOM();
}  

// Sort user by Richest
function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money;
    })
    updateDOM();
}

// Filter only millionaires
function showMillionaires() {
    console.log('click');
    data = data.filter(item => item.money > 1000000);

    updateDOM();
}

// Calculate total wealth
function calculateWealth() {
    const wealth = data.reduce((acc, wealth) => {
        console.log(acc);
        console.log(wealth.money);
        return acc + wealth.money;
    }, 0)

    console.log(formatMoney(wealth));
    const totalEl = document.createElement('div');
    totalEl.style.borderTop = '1px solid #111';
    totalEl.innerHTML = '';
    totalEl.innerHTML = `<h3>Total wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    updateDOM();
    main.appendChild(totalEl);

}
 

// Update DOM 
function updateDOM(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
// console.log(providedData);
    providedData.forEach(item => {

        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatMoney(number) {
    return '$' +   (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser  )
doubleBtn.addEventListener('click', doubleMoney  )
sortBtn.addEventListener('click', sortByRichest  )
showMillionairesBtn.addEventListener('click', showMillionaires  )
calculateWealthBtn.addEventListener('click', calculateWealth  )














