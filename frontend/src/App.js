import logo from './logo.svg';
import './App.css';
import { Navbar } from './AllRoutes/Navbar';
import { AllRoute } from './AllRoutes/AllRoute';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <AllRoute/>
    </div>
  );
}

export default App;
