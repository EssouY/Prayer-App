import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [countryData, setCountryData] = useState({
    country: "Morocco",
    city: "Martil",
    method: "21",
  });

  function handleUpdateCountryData(newData) {
    setCountryData(newData);
  }

  const [prayerTime, setprayerTime] = useState({
    fajr: "4:24",
    dhuhr: "13:33",
    asr: "17:06",
    maghrib: "20:41",
    isha: "22:14",
    tahjud: "03:05",
    sunset: "20:35",
    sunrise: "06:19",
  });

  const [prayerList, setprayerList] = useState([]);
  const [hijriDate, SetHijriDate] = useState({});

  const [nourman, setnourman] = useState({
    fajr: 110,
    dhuhr: 250,
    asr: 300,
    maghrib: 350,
    isha: 20,
    fd: "06:19",
    da: "06:19",
    am: "06:19",
    mi: "06:19",
    if: "06:19",
  });

  function HandleInterval(time1, time2) {
    // Split time strings into hours and minutes
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);

    // Convert everything to minutes for easier subtraction
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Perform subtraction (considering negative results)
    let difference = totalMinutes1 - totalMinutes2;

    // Handle negative difference (resulting time before time2)
    if (difference < 0) {
      difference += 24 * 60; // Add a day's worth of minutes (1440)
    }

    // Convert back to hours and minutes with leading zeros
    const resultHours = String(Math.floor(difference / 60)).padStart(2, "0");
    const resultMinutes = String(difference % 60).padStart(2, "0");

    return `${resultHours}:${resultMinutes}`;
  }

  ///////////////////////////////////

  const [date, setDate] = useState(new Date());

  // Function to format date as DD-MM-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0"); // Ensure day is two digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure month is two digits and adjust for 0-indexed month
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // Function to add a day
  const addDay = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  // Function to subtract a day
  const subtractDay = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  ///////////////////////
  useEffect(() => {
    const storageTodo =
      JSON.parse(localStorage.getItem("country")) || countryData;
    setCountryData(storageTodo);
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://api.aladhan.com/v1/timingsByAddress/${formatDate(
          date
        )}?address=${countryData.city},${countryData.country}&method=${Number(
          countryData.method
        )}`
      )
      .then(function (response) {
        let UpdatedPrayerTime = {
          fajr: response.data.data.timings.Fajr,
          dhuhr: response.data.data.timings.Dhuhr,
          asr: response.data.data.timings.Asr,
          maghrib: response.data.data.timings.Maghrib,
          isha: response.data.data.timings.Isha,
          tahjud: response.data.data.timings.Lastthird,
          sunset: response.data.data.timings.Sunset,
          sunrise: response.data.data.timings.Sunrise,
        };

        let fr = UpdatedPrayerTime.fajr.split(":");
        let dr = UpdatedPrayerTime.dhuhr.split(":");
        let ar = UpdatedPrayerTime.asr.split(":");
        let mr = UpdatedPrayerTime.maghrib.split(":");
        let ir = UpdatedPrayerTime.isha.split(":");

        setprayerList([fr, dr, ar, mr, ir]);

        let UpdatedNourman = {
          fajr: Number(fr[0]) * 15 + 50,
          dhuhr: Number(dr[0]) * 15 + 50,
          asr: Number(ar[0]) * 15 + 50,
          maghrib: Number(mr[0]) * 15 + 50,
          isha: Number(ir[0]) * 15 + 40,
          fd: HandleInterval(UpdatedPrayerTime.dhuhr, UpdatedPrayerTime.fajr),
          da: HandleInterval(UpdatedPrayerTime.asr, UpdatedPrayerTime.dhuhr),
          am: HandleInterval(UpdatedPrayerTime.maghrib, UpdatedPrayerTime.asr),
          mi: HandleInterval(UpdatedPrayerTime.isha, UpdatedPrayerTime.maghrib),
          if: HandleInterval(UpdatedPrayerTime.fajr, UpdatedPrayerTime.isha),
        };

        let UpdatedHijriDate = {
          // gregorian: response.data.data.date.gregorian.date,
          // hijri: response.data.data.date.hijri.date,
          hijri:
            response.data.data.date.hijri.weekday.en +
            "  " +
            (Number(response.data.data.date.hijri.day) + 1) +
            "  " +
            response.data.data.date.hijri.month.en +
            "  " +
            response.data.data.date.hijri.year,
        };

        setprayerTime(UpdatedPrayerTime);
        setnourman(UpdatedNourman);
        SetHijriDate(UpdatedHijriDate);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [date, countryData]);

  return (
    <>
      <Header
        hijriDate={hijriDate}
        forwardFunction={subtractDay}
        backwarFunction={addDay}
        countryData={countryData}
        onUpdateCountryData={handleUpdateCountryData}
      ></Header>
      <Main
        prayerTime={prayerTime}
        nourman={nourman}
        prayerList={prayerList}
      ></Main>
    </>
  );
}

export default App;
