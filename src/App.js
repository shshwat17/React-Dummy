import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import WrappedComponentMiddleware from "./WrappedComp";
import CustomRouteConfig from "./Routes/routes";
import Home from "./Components/Home/home";

const App = () => {
  // const { count, increment, decrement } = useCounter();
  // const { data } = useFetch();

  return (
    <div className="App">
      <Home />
      <Router>
        <Routes>
          {CustomRouteConfig.map((route) => (
            <Route {...route} />
          ))}
        </Routes>
      </Router>
    </div>
  );
};
export default WrappedComponentMiddleware(App);
