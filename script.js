const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

// Function to detect if the device is mobile
const isMobileDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
    firstDayofMonth = (firstDayofMonth === 0) ? 6 : firstDayofMonth - 1; // adjusting for weeks starting on Monday
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(); // getting last day of month
    lastDayofMonth = (lastDayofMonth === 0) ? 6 : lastDayofMonth - 1; // adjusting for weeks starting on Monday
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                     && currYear === new Date().getFullYear() ? "active" : "";
        // Check if day is clicked (retrieve from localStorage)
        let isClicked = localStorage.getItem(`clicked_${currYear}_${currMonth}_${i}`) === 'true' ? "clicked" : "";
        liTag += `<li class="${isToday} ${isClicked}" data-day="${i}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

    // Attach event listeners for day clicks after rendering
    attachDayClickListeners();
}

// Function to handle click or touch on days
const handleDayInteraction = (event) => {
    const clickedLi = event.target;

    if (!clickedLi.classList.contains('inactive')) {
        clickedLi.classList.toggle('clicked');

        // Store clicked state in localStorage
        const day = clickedLi.dataset.day;
        const isClicked = clickedLi.classList.contains('clicked');
        localStorage.setItem(`clicked_${currYear}_${currMonth}_${day}`, isClicked);
    }
};

// Function to attach event listeners for day clicks or touches
const attachDayClickListeners = () => {
    const days = document.querySelectorAll('.days li');
    days.forEach(day => {
        if (isMobileDevice()) {
            day.addEventListener('touchstart', handleDayInteraction);
        } else {
            day.addEventListener('click', handleDayInteraction);
        }
    });
};

// Initial call to render the calendar
renderCalendar();

// Event listeners for prev and next icons
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});
