import "../App.css";
import { useState } from "react";

export default function Nourman(props) {
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    minutes: new Date().getMinutes(),
  });

  const [now, setnow] = useState(time.hour + time.minutes / 60);

  const paryerlist = props.prayerList.map((p) => {
    return Number(p[0]) * 60 + Number(p[1]);
  });

  let thisHour = time.hour * 60 + time.minutes;

  const [result, setresult] = useState("1h 20min");

  function handleNextPrayer() {
    for (let index = 0; index < paryerlist.length; index++) {
      if (paryerlist[index] > thisHour) {
        let minutes = paryerlist[index] - thisHour;
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        setresult(`${hours}h ${remainingMinutes}min`);
        break;
      }
    }
  }

  setTimeout(() => {
    handleNextPrayer();
    const a = new Date();
    setTime({
      hour: a.getHours(),
      minutes: a.getMinutes(),
    });
    setnow(time.hour + time.minutes / 60);
  }, "1000");

  return (
    <div id="leftSide" className="">
      <div
        className="circleProgress"
        style={{
          background: `conic-gradient(#4b8652 ${
            (now * 360) / 24
          }deg, #fff 0deg)`,
        }}
      >
        <p>Next Prayer</p>
        <h3>{result}</h3>

        <div
          className="prayerCircle"
          style={{ transform: `rotate(${props.nourman.fajr}deg)` }}
        >
          <p style={{ transform: `rotate(${-props.nourman.fajr}deg)` }}>
            <span className="m-1">Fjr {props.nourman.fd}</span>
          </p>
        </div>

        <div
          className="prayerCircle dhuhr"
          style={{ transform: `rotate(${props.nourman.dhuhr}deg)` }}
        >
          <p style={{ transform: `rotate(${-props.nourman.dhuhr}deg)` }}>
            <span>Dhr {props.nourman.da}</span>
          </p>
        </div>

        <div
          className="prayerCircle asr"
          style={{ transform: `rotate(${props.nourman.asr}deg)` }}
        >
          <p style={{ transform: `rotate(${-props.nourman.asr}deg)` }}>
            <span>Asr {props.nourman.am}</span>
          </p>
        </div>
        <div
          className="prayerCircle maghreb"
          style={{ transform: `rotate(${props.nourman.maghrib}deg)` }}
        >
          <p style={{ transform: `rotate(${-props.nourman.maghrib}deg)` }}>
            <span>Mrb {props.nourman.mi}</span>
          </p>
        </div>
        <div
          className="prayerCircle isha"
          style={{ transform: `rotate(${props.nourman.isha}deg)` }}
        >
          <p style={{ transform: `rotate(${-props.nourman.isha}deg)` }}>
            <span>Ish {props.nourman.if}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
