import './App.scss';
import { CitiesComponent } from './components/cityCard';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Details } from './components/cityCardDetails';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={ <CitiesComponent/> }/>
          <Route path="details/:name" element={ <Details/> }/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;