import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';

const store = ConfigureStore();

class App extends Component {
  render() {
     return (
       <Provider store={store}>
	       <BrowserRouter>
	         <div className="App">
	           <Main />
	         </div>
	       </BrowserRouter>
	     </Provider>
     );
   }
}

export default App;
