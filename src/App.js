import './App.css'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {

  return (
    <div >
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path = "/" component = {Home}></PrivateRoute>

            <Route path = "/login" component = {Login}></Route>
            
            <Route path = "/register" component = {Register}></Route>
            
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

