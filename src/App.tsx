import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WalletAuth from "./components/wallet";
import OnRamp from "./components/payment";
import Navbar from './components/navbar';
import Dashboard from "./components/dashboard";

const App=()=> {
    return (
      <Router>
      <Routes>
          <Route path = "/wallet" element = {<WalletAuth/>}/>
          <Route path = "/payment" element = {<OnRamp/>}/>
          <Route path = "/" element = {<Dashboard/>}/>
      </Routes>
   </Router>
  );
}

export default App;
