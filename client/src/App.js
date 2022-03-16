import './App.css';
// import ReactGA from "react-ga4";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingScreen from "./pages/LandingScreen";
import HomeScreen from "./pages/HomeScreen"



function App() {
  return (
    <div className="App">
        {/*<UserContextProvider>*/}
            <Router>
                <Routes>
                    <Route exact path={'/'} element={<HomeScreen/>}/>
                </Routes>
            </Router>
        {/*</UserContextProvider>*/}
    </div>
  );
}

export default App;
