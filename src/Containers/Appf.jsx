import './App.css';
import 'tachyons';
import React from 'react';
import Cards from "../Components/Cards.jsx";
import SearchBox from '../Components/SearchBox.jsx';
import { useState, useEffect } from 'react';
import Scroll from '../Components/Scroll.jsx';
import ErrorBoundary from '../Components/ErrorBoundary.jsx';

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        return response.json();
      })
      .then(users => {
        setRobots(users);
      })
  }, []) // Effect will re-run after every re-render of the component


  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  console.log(robots, searchfield);

  return !robots.length ?
  <h1>Loading</h1> :
  (
    <div className="tc">
      <h1>Robofriends</h1>
      <SearchBox searchChange={(event) => setSearchfield(event.target.value )}/>
      <Scroll>
        <ErrorBoundary>
          <Cards robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );

};

export default App;
