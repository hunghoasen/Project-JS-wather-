window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature  span');

    console.log(temperatureSpan.textContent === "F");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // This proxy will allow you to make requests even from localhost
            const proxy = "https://cors-anywhere.herokuapp.com/";
            
            //https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/37.8267,-122.4233

            // const api = `${proxy}http://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;  

            // const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/15.1819929,108.849207`

            const api = proxy + "https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/" + lat + "," + long

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //set DOM Element from the API

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                        //FORUMULA FOR CELSIUS
                        let celsius = (temperature - 32)* (5 / 9);

                    //set icon 
                    setIcon(icon, document.querySelector(".icon"));

                    //chane temperature
                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F"
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});