const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

populateUA();
// seats.forEach(place => { //Но лучше повеситьсобітие на container
//     place.addEventListener('click', () => place.classList.toggle('occupied'))
// })

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//update total and count
function updataSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log( document.querySelectorAll('.row .seat.selected'));
    const selectedSeatsCount = selectedSeats.length;
    count.textContent = selectedSeatsCount;
    total.textContent = selectedSeatsCount * ticketPrice;
    // Copy selected seats into arr
    // Map throw array
    // return a new array indexes
    const seatsIndex = [...selectedSeats].map(seat => {
        return [...seats].indexOf(seat);
    });
    console.log(seatsIndex);  
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    
    !function() {
    // let arr = [1,2,3];
    // let arr2 = [...arr,  5];
    // console.log(arr.splice(-1, 0, 22));
    // arr2.forEach(item =>   console.log(item))
    // const arr3 = arr2.map(item => "map", item);
    // console.log(arr3);
    }()
}

// Get data from localstorage and populate UI
function populateUA() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    if (selectedSeats !== null && selectedSeats.length > -1) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    };

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
    console.log("popul", selectedMovieIndex);
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie click event
movieSelect.addEventListener('change', (e) => {
    console.log(e);
    console.log(e.target);
    console.log('e.target.value', e.target.value);
    ticketPrice = +e.target.value;
    console.log('e.target.selectedIndex', e.target.selectedIndex);
    setMovieData(e.target.selectedIndex, e.target.value);
    updataSelectedCount();
})

// Seat click event 
container.addEventListener('click', e => {
    // console.log(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'));
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log('seat', e.target);
        e.target.classList.toggle('selected')
       

        updataSelectedCount();
    }
})

// Initial count and total set
updataSelectedCount();

// console.log(seat);