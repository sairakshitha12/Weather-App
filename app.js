// weather app
const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="c07720dc7218f1a03adb3ccc1d28eda9";

weatherform.addEventListener("submit", async event => {

    event.preventDefault();
    const city=cityinput.value;

    if(city){
        try{
            const weatherdata=await getWeatherData(city)
            displayWeatherInfo(weatherdata);

        }
        catch(error)
        {
          console.error(error);
          displayError(error);
        }

    }
    else{
        displayError("please enter a city")
    }



});
async function getWeatherData(city) {
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response=await fetch(apiurl);
    
    if(!response.ok){
        throw new error("could not fetch weather data");}
        return await response.json();

}
function displayWeatherInfo(data){
    const {name:city,main:{temp,humidity},weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const citydisplay=document.createElement("h1");
    const temperature=document.createElement("p");
    const Humidity=document.createElement("p");
    const descdisplay=document.createElement("p");
    const emojidisplay=document.createElement("p");

    citydisplay.textContent=city;
    temperature.textContent=`${temp}°k`;
    Humidity.textContent=`Humidity:${humidity}%`;
    descdisplay.textContent=description;
    emojidisplay.textContent=getWeatherEmoji(id);


    citydisplay.classList.add("city");
    temperature.classList.add("temp");
    Humidity.classList.add("humidity");
    descdisplay.classList.add("description");
    emojidisplay.classList.add("emoji");
    card.appendChild(citydisplay);
    card.appendChild(temperature);//to convert into celcius -273.5 (toFixed(1)c)
    card.appendChild(Humidity);
    card.appendChild(descdisplay);
    card.appendChild(emojidisplay);


}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
        return"⛈️";
        case(weatherId >= 300 && weatherId < 400):
        return"⛈️";
        case(weatherId >= 500 && weatherId < 600):
        return"⛈️";
        case(weatherId >= 600 && weatherId < 700):
        return"❄️";
        case(weatherId >= 700 && weatherId < 800):
        return"☃️";
        case(weatherId === 800):
        return"☀️";
        case(weatherId >= 801 && weatherId < 810):
        return"☁️";
        default:
            return"❓";
    }

}
function displayError(message){
    const errordisplay=document.createElement("p");
    errordisplay.textContent=message;
    errordisplay.classList.add("errormsg");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
    

}
