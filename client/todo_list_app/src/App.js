import { React } from 'react';
import './App.css';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';

function App() {
  return (
    <div className="App">
      <Main/>
      {/* <Login/>
      <SignUp/> */}
    </div>
);
}

export default App;
