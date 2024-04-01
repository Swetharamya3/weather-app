import { useEffect, useState } from 'react';
import './App.css'
import cloudy from '/cloudy.png'
import clear from '/clear.png'
import drizzle from '/drizzle.png'
import rain from '/rain.png'
import snow from '/snow.png'
import sunny from '/sunny.png'
import { FaRegFaceSadCry } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { RiWindyLine } from "react-icons/ri";
import { WiHumidity } from "react-icons/wi";
let image1={
  '01d':clear,
  '01n':clear,
  '02d':cloudy,
  '02n':cloudy,
  '03d':sunny,
  '03n':sunny,
  '04d':drizzle,
  '04n':drizzle,
  '09d':rain,
  '09n':rain,
  '10d':rain,
  '10n':rain,
  '13d':snow,
  '13n':snow
}
let allKey=Object.keys(image1);
const App = () => {
  const[loading,setLoading]=useState(false);
  const[cityNotFound,setCityNotFound]=useState(false)
  const [temp,setTemp]=useState(0);
  const[city,setCity]=useState('Delhi');
  const[country,setCountry]=useState('IN');
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[place,setPlace]=useState('delhi');
  const[image,setImage]=useState(clear);
  const handleChange=(e)=>{
   setPlace(e.target.value);
  }
  const handleKeyDown=(e)=>{
   e.key=='Enter'?search():null;
  }
  const search=async()=>{
    let api='2fc797a9ffa23e61b5d04b29d26e0d7c'
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${api}&units=Metric`;
    setLoading(true);
    try{
    let data=await fetch(url);
    let data1=await data.json();
    if(data1.cod==404){
      console.log('city not found')
      setCityNotFound(true);
    }
    else{
      setCityNotFound(false);
    }
    setTemp(data1.main.temp)
    setCity(data1.name);
    setCountry(data1.sys.country);
    setHumidity(data1.main.humidity);
    setWind(data1.wind.speed);
    let icon=data1.weather[0].icon;
    if(allKey.indexOf(icon)!=-1){
    setImage(image1[icon]);
    }
    else{
      setImage(clear);
    }
    }
    catch(e){
     console.log('error in getting weather',e.message);
    }
    finally{
      setLoading(false);
      setPlace('');
    }
  }
  useEffect(function(){
   search();
  },[])
  return (
    < div className='container'>
      <div className='input-container'>
        <input type="text" name="city" id="city" value={place} placeholder='search city'
        onChange={handleChange} onKeyDown={handleKeyDown}/>
        <i><FaSearch onClick={search}/></i>
      </div>
      {!cityNotFound&&!loading&&<>
      <div className='image'>
        <img src={image} alt="image" />
        <p>{temp}<sup>o</sup><b>C</b></p>
      </div>
      <div className='area'>
       <span id='place'>{city}</span>
       <span>{country}</span>
      </div>
      <div className='data'>
       <section>
        <span>Humidity</span>
        <i><WiHumidity /></i>
        <p>{humidity} g.m<sup>-3</sup></p>
       </section>
       <section>
        <span>Wind speed</span>
        <i><RiWindyLine /></i>
        <p>{wind} km/h</p>
       </section>
       </div>
       <p className='copy'>Designed by <a href="https://www.linkedin.com/in/swetha-r-swetha-r-696302273?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Swetha</a></p>
       </>}{cityNotFound&&
       <p className='not-found'>city not found <FaRegFaceSadCry /></p>
       }
    </div>
 
  )
  
}

export default App