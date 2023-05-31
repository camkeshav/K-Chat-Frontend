import './App.css';
import { Route } from 'react-router-dom';
import Home from './Components/Home';
import Chats from './Components/Chats';

function App() {
  return (
    <div className="App">
      <Route path='/' component={Home} exact />
      <Route path='/chats' component={Chats} />
    </div>
  );
}

export default App;
