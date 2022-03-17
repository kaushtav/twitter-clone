// noinspection ES6CheckImport
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {HomeScreen, LandingScreen,LoginScreen,SignUpScreen,StatusScreen, ProfileScreen, SettingsScreen} from './pages'
import {UserContextProvider} from "./context/user";


function App() {
  return (
    <div>
        <UserContextProvider>
            <Router>
                <Routes>
                    <Route exact path={'/'} element={<LandingScreen/>}/>
                    <Route exact path={'/home'} element={<HomeScreen/>}/>
                    <Route exact path={'/status/:tweetID'} element={<StatusScreen/>}/>
                    <Route exact path={'/user'} element={<ProfileScreen self/>}/>
                    <Route exact path={'/user/:profileID'} element={<ProfileScreen/>}/>
                    <Route exact path={'/signup'} element={<SignUpScreen/>}/>
                    <Route exact path={'/login'} element={<LoginScreen/>}/>
                    <Route exact path={'/settings'} element={<SettingsScreen/>}/>
                </Routes>
            </Router>
        </UserContextProvider>
    </div>
  );
}

export default App;
