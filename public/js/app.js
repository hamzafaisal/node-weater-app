let form = document.querySelector("form");
let result = document.querySelector(".result");
let result2 = document.querySelector(".result2");

form.addEventListener("submit", e => {
  e.preventDefault();
  let value = form.location.value.trim();

  result.textContent = "";
  result2.innerHTML =
    '<div class="spinner-border text-secondary" role="status"></div>';

  if (value) {
    fetch("/weather?location=" + value).then(result => {
      result.json().then(data => {
        form.reset();
        print(data);
      });
    });
  } else {
    result2.textContent = "Search Location Reqired!";
  }
});

print = ({ forecast, location }) => {
  result.textContent = forecast;
  result2.textContent = location;
};
