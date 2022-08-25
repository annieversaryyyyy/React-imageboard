import './App.css';
import Imageboard from "./containers/Imageboard/Imageboard";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
      <Switch>
        <Route path="/" exact component={Imageboard}/>
        <Route render={() => <h1>Not found</h1>}/>
      </Switch>
  );
}

export default App;
