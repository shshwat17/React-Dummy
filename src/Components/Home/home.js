import React from "react";
import "./home.css";
import CustomRouteConfig from "../../Routes/routes";

const Home = () => {
  return (
    <>
      <div className="homeContainer">
        {CustomRouteConfig.map((route) => (
          <div key={route.key}>
            <a href={route.path}>{route?.name || route.path}</a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
