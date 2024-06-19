const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  firstDayofMonth = (firstDayofMonth === 0) ? 6 : firstDayofMonth - 1;
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  lastDayofMonth = (lastDayofMonth === 0) ? 6 : lastDayofMonth - 1;
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear() ? "active" : "";
    let isClicked = localStorage.getItem(`clicked_${currYear}_${currMonth}_${i}`) === 'true' ? "clicked" : "";
    liTag += `<li class="${isToday} ${isClicked}" data-day="${i}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
  attachDayClickListeners();
}

const handleDayClick = (event) => {
  const clickedLi = event.target;
  if (!clickedLi.classList.contains('inactive')) {
    // Remove 'clicked' class from all days first
    document.querySelectorAll('.days li').forEach(day => {
      day.classList.remove('clicked');
    });

    // Add 'clicked' class to the clicked day
    clickedLi.classList.add('clicked');
    
    const day = clickedLi.dataset.day;
    localStorage.setItem(`clicked_${currYear}_${currMonth}_${day}`, true);
  }
};

const attachDayClickListeners = () => {
  const days = document.querySelectorAll('.days li');
  days.forEach(day => {
    day.addEventListener('click', handleDayClick);
  });
};

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
