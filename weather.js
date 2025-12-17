async function ser() {
    let inp = document.getElementById("inp").value;
    let apikey = `4669173d3fbd36cca34554c076c3685d`;

    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${apikey}&units=metric`;
        let url2 = await fetch(url);
        let data = await url2.json();

        if (data.cod === "404") {
            document.getElementById("location").innerHTML = "Location not found";
            document.getElementById("country").innerHTML = "Enter correct address";
            document.getElementById("image").innerHTML = '<img src="error-img.png">';
            document.getElementById("temp").innerHTML = "0";

            document.getElementById("description").innerHTML = "Unknown";
            document.getElementById("wind").innerHTML = "0 Km/H";
            document.getElementById("dir").innerHTML = "N--N";
            document.getElementById("humidity").innerHTML = "0%";
            document.getElementById("rise").innerHTML = "00:00:00";
            document.getElementById("set").innerHTML = "00:00:00";

            document.getElementById("aqi").innerHTML = "N/A";
            document.getElementById("aqi").style.color = "black";
            document.getElementById("chance").innerHTML = "0%";
            document.getElementById("pressure").innerHTML = "0 MB";
            document.getElementById("pressure").innerHTML = "0 MB";
            document.getElementById("lat").innerHTML = "0";
            document.getElementById("lon").innerHTML = "0";
            return;
        }
        console.log(data);
        document.getElementById("location").innerHTML = `${data.name}`;
        document.getElementById("country").innerHTML = `${data.sys.country}`;
        document.getElementById("temp").innerHTML = `${data.main.temp}`;
        document.getElementById("description").innerHTML = `${data.weather[0].description}`;

        let iconcode = data.weather[0].icon;
        let iconurl = `https://openweathermap.org/img/wn/${iconcode}@2x.png`;
        let weathericon = `<img src="${iconurl}">`;
        document.getElementById("image").innerHTML = weathericon;

        let ms = data.wind.speed;
        let km = (ms * 3.6).toFixed(2);
        document.getElementById("wind").innerHTML = `${km} Km/H`;

        let wind = data.wind.deg;
        function dir(deg) {
            if(deg >= 0 && deg < 45) return "N--S";
            else if(deg >= 45 && deg < 90) return "NE--SW";
            else if(deg >= 90 && deg < 135) return "E--W";
            else if(deg >= 135 && deg < 180) return "SE--NW";
            else if(deg >= 180 && deg < 225) return "S--N";
            else if(deg >= 225 && deg < 270) return "SW--NE";
            else if(deg >= 270 && deg < 315) return "W--E";
            else return "NW--SE";
        }
        let flow = dir(wind);
        document.getElementById("dir").innerHTML = `${flow}`;

        document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;

        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        let risetime = new Date(sunrise * 1000).toLocaleTimeString();
        let settime = new Date(sunset * 1000).toLocaleTimeString();
        document.getElementById("rise").innerHTML = risetime;
        document.getElementById("set").innerHTML = settime;

        let lat = data.coord.lat;
        let lon = data.coord.lon;
        document.getElementById("lat").innerHTML = `${data.coord.lat}`;
        document.getElementById("lon").innerHTML = `${data.coord.lon}`;
        let aqiurl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}`;
        let aqidata = await fetch(aqiurl);
        let aqi = await aqidata.json();
        let aqino = aqi.list[0].main.aqi;
        let a = document.getElementById("aqi");

        if (aqino === 1) {
            a.innerHTML = "Good";
            a.style.color = "green";
        } else if (aqino === 2) {
            a.innerHTML = "Fair";
            a.style.color = "orange";
        } else if (aqino === 3) {
            a.innerHTML = "Moderate";
            a.style.color = "blue";
        } else if (aqino === 4) {
            a.innerHTML = "Poor";
            a.style.color = "red";
        } else if (aqino === 5) {
            a.innerHTML = "Very Poor";
            a.style.color = "purple";
        } else {
            a.innerHTML = "N/A";
            a.style.color = "black";
        }

        let rainurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
        let rain = await fetch(rainurl);
        let raindata = await rain.json()
        let rainchance = raindata.list[0].pop * 100;
        document.getElementById("chance").innerHTML = rainchance.toFixed(0) + "%";
        console.log(rainchance);

        document.getElementById("pressure").innerHTML = `${data.main.pressure} MB`;


        let forecasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`;
        let forecasturl2 = await fetch(forecasturl);
        let forecast = await forecasturl2.json();
        console.log(forecast);

        //card1
        document.getElementById("card_time1").innerText = `${forecast.list[0].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon1").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem1").innerHTML = `${forecast.list[0].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum1").innerHTML = `${forecast.list[0].main.humidity}%`;

        //card2
        document.getElementById("card_time2").innerText = `${forecast.list[1].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon2").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[1].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem2").innerHTML = `${forecast.list[1].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum2").innerHTML = `${forecast.list[1].main.humidity}%`;

        //card3
        document.getElementById("card_time3").innerText = `${forecast.list[2].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon3").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[2].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem3").innerHTML = `${forecast.list[2].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum3").innerHTML = `${forecast.list[2].main.humidity}%`;

        //card4
        document.getElementById("card_time4").innerText = `${forecast.list[3].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon4").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[3].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem4").innerHTML = `${forecast.list[3].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum4").innerHTML = `${forecast.list[3].main.humidity}%`;

        //card5
        document.getElementById("card_time5").innerText = `${forecast.list[4].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon5").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[4].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem5").innerHTML = `${forecast.list[4].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum5").innerHTML = `${forecast.list[4].main.humidity}%`;

        //card6
        document.getElementById("card_time6").innerText = `${forecast.list[5].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon6").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[5].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem6").innerHTML = `${forecast.list[5].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum6").innerHTML = `${forecast.list[5].main.humidity}%`;

        //card7
        document.getElementById("card_time7").innerText = `${forecast.list[6].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon7").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[6].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem7").innerHTML = `${forecast.list[6].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum7").innerHTML = `${forecast.list[6].main.humidity}%`;

        //card8
        document.getElementById("card_time8").innerText = `${forecast.list[7].dt_txt.substring(11,16)}`;
        document.getElementById("card_icon8").innerHTML = `<img src="https://openweathermap.org/img/wn/${forecast.list[7].weather[0].icon}@2x.png" alt="weather icon">`;
        document.getElementById("card_tem8").innerHTML = `${forecast.list[7].main.temp}<sup style="font-size: 10px;">°</sup>C`;
        document.getElementById("card_hum8").innerHTML = `${forecast.list[7].main.humidity}%`;

    } catch(error) {
        document.getElementById("location").innerHTML = "Location not found";
        alert("Something is wrong! Try again and check your network connection.");
    }
};

function sharepage() {
    if (navigator.share) {
        navigator.share( {
            title: document.title,
            text: "see this page",
            url: "https://pritambasak067.github.io/current-weather/"
        });
        .then(() => console.log("shared successfully"))
        .catch ((error) => console.log("error:", error));
    } else {
        alert("your browser doesn't support sharing");
    }
}
