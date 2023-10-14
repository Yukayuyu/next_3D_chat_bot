
import { useEffect, useState } from "react";

export default function Clock()
{
  const [time, setTime] = useState<string>("Loading...");

  useEffect(() =>
  {
    const interval = setInterval(() =>
    {
      setTime(new Date().toLocaleTimeString());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );

}
