let weather = {
    'apiKey': '42d5ca0b6d735a6724e031f506ebb1fb',
    fetchWeather: function (city) {
        fetch(
            'https://api.openweathermap.org/data/2.5/weather?q='
            + city
            + '&units=metric&appid='
            + this.apiKey
        )
            .then((res) => res.json())
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data;
        const { country } = data.sys;
        const { description, icon } = data.weather[0];
        const { humidity, temp } = data.main;
        const { speed } = data.wind;
        const date = new Date();

        document.querySelector('.city').innerText = name + ',';
        document.querySelector('.country').innerText = country;
        document.querySelector('.temp').innerText = temp;
        document.querySelector('.desc').innerText = description;
        document.querySelector('.icon').src = 'https://openweathermap.org/img/wn/' + icon + '.png';
        document.querySelector('.humidity').innerText = 'Humidity: ' + humidity + '%';
        document.querySelector('.wind').innerText = 'Wind speed: ' + speed + 'km/h';
        document.querySelector('.date').innerText = date.toLocaleString(undefined, {
            month: 'short', day: '2-digit',
        });
    },
    search: function () {
        this.fetchWeather(document.querySelector('.search').value)
        document.querySelector('.weather').style.display = 'block'
    }
};

document.querySelector('button').addEventListener('click', function () {
    weather.search();
});

document.querySelector('.search').addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        weather.search();
    }
})