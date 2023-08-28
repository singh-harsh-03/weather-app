const temperatureField=document.querySelector(".weather1");
const cityField=document.querySelector(".weather2 p");
const dateField=document.querySelector(".weather2 span");
const emojiField=document.querySelector(".weather3 img");
const weatherField=document.querySelector(".weather3 span");
const searchField=document.querySelector(".searchField");
const form=document.querySelector("form");
const a="°";
let target= "London";

const fetchData=async(target)=>{
    const url=`https://api.weatherapi.com/v1/current.json?key=3c4ed2530aaa4907a90122438231108&q=${target}`;
    try{
    const response=await fetch(url);
    if(response.ok){
    const data=await response.json();

    console.log(data);

    const {
        current:{temp_c,condition:{
            text,icon
        }},
        location:{name,localtime},
    }=data;
    updateDom(temp_c,name,localtime,icon,text);
    }
    else{
        clearWeatherData();
    }
}
    catch(error){
        clearWeatherData();
    }

};
function clearWeatherData(){
    temperatureField="N/A";
    cityField.innerText="Location Not Found";
    emojiField.src=" ";
    weatherField.innerHTML="";
    dateField.innerText=""

}
function updateDom(temperature,city,localtime,emoji,text){
    temperatureField.innerText= temperature+a;
    cityField.innerText=city;
    emojiField.src=emoji;
    weatherField.innerHTML=text;
    if(localtime){
    const exactTime=localtime.split(" ")[1];
    const exactDate=localtime.split(" ")[0];
    const exactDay=new Date(exactDate).getDay();
    getDayName(exactDay);

    dateField.innerText=`${exactTime}-${getDayName(exactDay)} ${exactDate}`;
    }
    else
    dateField.innerText="time and date not available";

}
fetchData(target);

function getDayName(num){
    switch(num){
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't Know";
    }
}
const search=async(e)=>{
    e.preventDefault();
    target=searchField.value;
    await fetchData(target);
}
form.addEventListener("submit",search);