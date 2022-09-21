import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import {BiSearchAlt2} from 'react-icons/bi';
import {FaTemperatureHigh,FaTemperatureLow} from 'react-icons/fa';
import {WiHumidity} from 'react-icons/wi';
import {ImSearch} from 'react-icons/im';
import {HiOutlineLocationMarker} from 'react-icons/hi';
import '../src/App.css';
function App() {
  let [val,setVal]=useState('')
  let  [data, setData] = useState({})

  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const getDetails = (city) => {
    if (!city) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
     
      console.log(res.data)
    }).catch((err) => {
      console.log("err", err)

    })
  }

  const handleSubmit= e =>{
    e.preventDefault()
   
    setVal('')
    getDetails(val)
    
    
  }

  let handleChange=(e)=>{
    setVal(e.target.value)
    
  }
  return (
    <div className="App">
      <p className='mt-4 head'>Weather Application</p>
      <form  onSubmit={handleSubmit}>
      <div className=' d-flex  mt-5  justify-content-center'>
      <div className=' ms-5'>
      <input type="text " className="   text-white   title"  value={val} onChange={handleChange} placeholder="Enter City"></input>
      </div>
      <div className=''>
      <p className='button  me-5'><ImSearch/></p>
      </div>
      
      </div>
      </form>
      <div className=' ms-5 me-5 cardmain row mt-5 '>
      <div className='col-sm-3'>
      
      {data.weather?<div>
         <p className=' city  text-white text-center' ><HiOutlineLocationMarker className='mb-2 me-2'/>{data?.name} </p>
         <p className='main1 text-center'>{data.weather[0].main}</p>
         </div> : null
      }
      
      </div>
      <div className='col-sm-9 '>
     
      {data?.main?.temp ?<p className='temp text-sm-end '> {((data?.main?.temp) - 273.15).toFixed(2)}°C</p>:null}
      
      </div>

      </div>
      <div className='row mt-5 justify-content-around'>
    <div className='col-sm-2  p-2 elements1'>
      <p>Temp Max    <FaTemperatureHigh/>   </p>
    {data.main?<p>{(data.main.temp_max - 273.15).toFixed(2)}°C</p>:null}

    </div>
    <div className='col-sm-2  p-2 elements1' >
    <p>Temp Min    <FaTemperatureLow className=''/></p>
    {data.main?<p>{(data.main.temp_min- 273.15).toFixed(2)}°C</p>:null}
    </div>
    <div className='col-sm-2  p-2 elements1'>
      <p>Pressure</p>
     {data.main?<p>{data.main.pressure}</p>:null}

    </div>
    <div className='col-sm-2  p-2 elements1'>
      <p>Humidity <WiHumidity/></p>
     {data.main?<p>{data.main.humidity}</p>:null}

    </div>

      </div>
  


      
    </div>
  );
}

export default App;
