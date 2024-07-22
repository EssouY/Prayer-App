import "../App.css";
import Nourman from "./Nourman";

export default function Main(props) {
  // console.log(props.nourman);
  return (
    <main className="">
      <Nourman nourman={props.nourman} prayerList={props.prayerList}></Nourman>
      <div id="rightSide" className="">
        <div id="topSide" className="">
          <div id="fajr" className=" prayer ">
            <p>Fajr</p>
            <h3>{props.prayerTime.fajr}</h3>
          </div>
          <div id="dhuhr" className="prayer">
            <p>Dhuhr</p>
            <h3>{props.prayerTime.dhuhr}</h3>
          </div>
          <div id="asr" className="prayer">
            <p>Asr</p>
            <h3>{props.prayerTime.asr}</h3>
          </div>
          <div id="maghrib" className="prayer">
            <p>Maghrib</p>
            <h3>{props.prayerTime.maghrib}</h3>
          </div>
          <div id="isha" className="prayer">
            <p>Isha</p>
            <h3>{props.prayerTime.isha}</h3>
          </div>
          <div id="tahajud" className="prayer">
            <p>Tahajud</p>
            <h3>{props.prayerTime.tahjud}</h3>
          </div>
        </div>
        <div id="bottomSide">
          <div id="sunrise" className="sun">
            <p>Sunrise</p>
            <h3>{props.prayerTime.sunrise}</h3>
          </div>
          <div id="sunset" className="sun">
            <p>Sunset</p>
            <h3>{props.prayerTime.sunset}</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
