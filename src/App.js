import React, { Component } from 'react';
import Home from './componants/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends Component {
   render() {
      return (
         <div className = "App-header">
            <header className = "App-header">
               <Home/>
            </header>
         </div>
      );
   }
}
export default App;