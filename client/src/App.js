import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomeScreen, LandingScreen,LoginScreen,SignUpScreen} from './pages'
import {UserContextProvider} from "./context/user";


function App() {
  return (
    <div className="App">
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route exact path={'/'} element={<LandingScreen/>}/>
                    <Route exact path={'/Home'} element={<HomeScreen/>}/>
                    <Route exact path={'/signup'} element={<SignUpScreen/>}/>
                    <Route exact path={'/login'} element={<LoginScreen/>}/>
                </Routes>
            </Router>
        </UserContextProvider>
    </div>
  );
}

export default App;
