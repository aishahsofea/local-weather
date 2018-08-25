$location = document.querySelector(".location");
$description = document.querySelector(".description");
$icon = document.querySelector(".icon");
$temp = document.querySelector(".temp");
$time = document.querySelector(".time");
$date = document.querySelector(".date");

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const request = new XMLHttpRequest();
        request.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f95dc02b062d135bded83eff88d64ab0`, true);
        request.onload = _ => {
            const data = JSON.parse(request.responseText);
            console.log(data);

            let temp = data.main.temp;
            let celcius = temp - 273.15;
            let fahrenheit = (Math.floor(temp * (9/5) - 459.67));

            $temp.addEventListener("click", _ => {
                if ($temp.innerHTML == `${celcius} <small>°C</small>`) {
                    $temp.innerHTML = `${fahrenheit} <small>°F</small>`;
                } else {
                    $temp.innerHTML = `${celcius} <small>°C</small>`
                }
            })

            $location.innerHTML = `${data.name}, ${data.sys.country}`;
            $description.innerHTML = data.weather[0].description;
            $icon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
            $temp.innerHTML = `${celcius} <small>°C</small>`;

            document.querySelector("body").style.background = `url("background/${data.weather[0].main.toLowerCase()}.jpg") no-repeat center center fixed `;
        }
        request.send();

    })
} else {
    console.log("geolocation not available")
}
let date = new Date();
let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
$time.innerHTML = `${hour}:${min}`;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
$date.innerHTML = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;