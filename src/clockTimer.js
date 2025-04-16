import { useCallback, useEffect, useState } from "react";

const ClockTimer = () => {
  const [time, setTime] = useState("00-00-00");

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTime = useCallback(() => {
    const date = new Date();
    return `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  }, []);

  return <div>{time}</div>;
};

export default ClockTimer;
