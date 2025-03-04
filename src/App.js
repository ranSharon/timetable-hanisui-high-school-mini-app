import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div >
          <NavBar />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
