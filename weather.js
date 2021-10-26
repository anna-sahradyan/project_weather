window.addEventListener('load', function () {
    let selectValue = document.querySelector('.city');
    let name = document.querySelector('.name');
    let desc = document.querySelector('.desc');
    let maxTemp = document.querySelector('.temp');
    let minTemp = document.querySelector('.temp2');
    let hum = document.querySelector('.humidity');
    let press = document.querySelector('.press');
    let wind = document.querySelector('.wind');
    let icon = document.querySelector('.icon');
    let optionWeather = document.querySelectorAll('.w-1');

    const couantryId = {
        "armenia": 616051,
        "japan": 1850147,
        "usa": 5368381
    }
    selectValue.onchange = weaderFetch;
    weaderFetch();
    function weaderFetch() {
        for (let i = 0; i < optionWeather.length; i++) {
            let optionSelect = optionWeather[i];
            if (optionSelect.selected === true) {
                console.log(optionSelect);
                let key = "";
                if (optionSelect.innerHTML == "Yerevan") {
                    key = couantryId["armenia"];

                } else if (optionSelect.innerHTML == "Tokyo") {
                    key = couantryId["japan"];
                } else {
                    key = couantryId["usa"];
                }

                const api = ` https://api.openweathermap.org/data/2.5/weather?id=${key}&appid=682f8b5b6486dcbf64e9d43bcb2a6ea7`;
                fetch(api)
                    .then(function (resp) { return resp.json() })
                    .then(function (data) {
                        console.log(data);
                        name.textContent = data.name;
                        maxTemp.innerHTML = `Maxtemp: ${Math.round(data.main.temp - 270)}  &deg`;
                        minTemp.innerHTML = `Mintemp: ${Math.round(data.main.temp - 282)}  &deg`;
                        desc.textContent = ` ${data.weather[0]['description']}`;
                        hum.textContent = ` Humidity:${data.main['humidity']}%`;
                        press.innerHTML = `Pressure:${data.main['pressure']}mbar`;
                        wind.innerHTML = `Wind:${data.wind['speed']}m/s`
                        icon.innerHTML = ' <img src = "https://openweathermap.org/img/wn/' + data.weather[0]["icon"] + '@2x.png"> ';

                    })

                    .catch(function () {
                        console.log('error'); 

                    });
            }



        }
    }




});
