import React from 'react';
import Titles from './components/titles';
import Form from "./components/form"
import Weather from "./components/weather";

const API_KEY = "6bbea4e34ee34d0940d21fc3fa889d57";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
  }

  getWeather = async(e)=>{
    e.preventDefault();
    const city = e.target.city.value;
    const country = e.target.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=imperial`);
    const data = await api_call.json();
    if(city && country){
      console.log(data);
    this.setState({
      temperature: data.main.temp,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      error: ''
    });
  }else{
    this.setState({
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: "Please enter city and country names!"
    });
  }
  }

  render(){
  return (
    <div className="App">
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <Titles/>
            </div>
            <div className="row">
              <Form getWeather={this.getWeather} />
              <Weather 
                temperature = {this.state.temperature}
                city = {this.state.city}
                country = {this.state.country}
                humidity = {this.state.humidity}
                description = {this.state.description}
                error = {this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
