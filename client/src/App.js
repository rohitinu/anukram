import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, []);
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
