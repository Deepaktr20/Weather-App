import { useState } from "react";
import axios from "axios";
import Search from "./imagesweather/search.png";
import Clouds from "./imagesweather/clouds.png";
import Humidity from "./imagesweather/humidity.png";
import Wind from "./imagesweather/wind.png";
import Rain from "./imagesweather/rain.png";
import Drizzle from "./imagesweather/drizzle.png";
import Sun from "./imagesweather/sun.png";
import Mist from "./imagesweather/mist.png";

function Weather(){
    const[name,setName]=useState('');
    const[data,setData]=useState({
        name:"Mumbai",
        celsius:60,
        humidity:10,
        speed:5,
        image:Sun
    })
    const[error,setError]=useState("");
    const handleClick=()=>{
        const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=550d69a9993f621e00826be30748444a&units=metric`
        axios.get(apiUrl)
        .then(res=>{
            let imagePath;
            if(res.data.weather[0].main==="Rain"){                                                     
                imagePath=Rain
            }else if(res.data.weather[0].main==="Drizzle"){
                imagePath=Drizzle
            }else if(res.data.weather[0].main==="Clear"){
                imagePath=Sun
            }else if(res.data.weather[0].main==="Mist"){
                imagePath=Mist
            }else if(res.data.weather[0].main==="Clouds"){
                imagePath=Clouds
            }else{
                imagePath=Sun
            }
            setData({
                image:imagePath,
                celsius:res.data.main.temp,
                humidity:res.data.main.humidity,
                speed:res.data.wind.speed,
                name:res.data.name
            })
        })
        .catch(err=>{
            if(err.responce.status===404){
                setError('Invalid city name')
            }else{
                setError('')
            }
        })
    }
    return(
        <div className="weather">
            <div className="search">
                <input placeholder="Enter city name" value={name} onChange={e=>setName(e.target.value)}/>
                <button onClick={handleClick}><img src={Search} alt=""></img></button>
            </div>
            <div>
                <p>{error}</p>
            </div>
            <div className="winfo">
                <img src={data.image} alt=""></img>
                <h1>{Math.round(data.celsius)}°c</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src={Humidity} alt=""></img>
                        <div className="humidity">
                            <p>{data.humidity}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src={Wind} alt=""></img>
                        <div className="wind">
                            <p>{Math.round(data.speed)}km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Weather;