import React from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Switch from "react-bootstrap/esm/Switch";
import { Route, useHistory, useParams } from "react-router-dom";

function App() {
  return (
    <>
      <div>title</div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:city" exact component={WeatherPage} />
      </Switch>
    </>
  );
}
function HomePage() {
  const history = useHistory();
  return (
    <div>
      Home Page
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push(`/${e.target.city.value}`);
        }}
      >
        <input type="text" name="city" placeholder="Enter location" />
        <input type="submit" value="enter" />
      </form>
    </div>
  );
}
function WeatherPage() {
  const { city } = useParams();
  console.log(city);

  React.useEffect(() => {
    async function getData(city) {
      try {
        const res = await fetch(`http://localhost:5000/weather?city=${city}`);
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          throw new Error(data.error);
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (city) {
      getData(city);
    }
  }, [city]);

  return (
    <>
      <div>WeatherPage</div>
    </>
  );
}
export default App;
