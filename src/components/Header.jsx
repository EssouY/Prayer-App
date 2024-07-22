import { useState, useEffect } from "react";
import CircleR from "/CircleR.svg";
import local from "/local.svg";
import "../App.css";

export default function Header(props) {
  const [visible, setVisible] = useState("none");

  const [localCountryData, setLocalCountryData] = useState({
    country: "Morocco",
    city: "Martil",
    method: "21",
  });

  useEffect(() => {
    const storageTodo =
      JSON.parse(localStorage.getItem("country")) || localCountryData;
    setLocalCountryData(storageTodo);
  }, []);

  function handleInnerClick(event) {
    event.stopPropagation();
  }

  function handleSectionClick() {
    setVisible(visible === "none" ? "flex" : "none");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setLocalCountryData({
      ...localCountryData,
      [name]: value,
    });
  }

  function handleSaveClick() {
    props.onUpdateCountryData(localCountryData);
    setVisible("none");
    localStorage.setItem("country", JSON.stringify(localCountryData));
  }

  return (
    <header>
      <div id="location" className="flexCC">
        <img src={local} alt="city icon" id="svgImg" />
        <p className="cursor-pointer" onClick={handleSectionClick}>
          {localCountryData.city},{localCountryData.country}
        </p>
      </div>
      <div id="date" className="flexCC text-center">
        <img
          src={CircleR}
          alt=""
          id="svgImg"
          className="rotate-180"
          onClick={props.forwardFunction}
        />
        <p>{props.hijriDate.hijri}</p>
        <img src={CircleR} alt="" id="svgImg" onClick={props.backwarFunction} />
      </div>

      <section
        className="h-full w-full bg-[#000000a0] absolute  flexCC z-40"
        onClick={handleSectionClick}
        style={{ display: visible }}
      >
        <div
          className="bg-[#303030] p-8 flex flex-col gap-5 justify-center items-center rounded-2xl"
          onClick={handleInnerClick}
        >
          <div>
            <p>Country</p>
            <input
              onChange={handleChange}
              type="text"
              name="country"
              className="p-4 text-xl"
              placeholder="Enter Your Country"
              value={localCountryData.country}
            />
          </div>

          <div>
            <p>City</p>
            <input
              onChange={handleChange}
              type="text"
              name="city"
              className="p-4 text-xl"
              placeholder="Enter Your city"
              value={localCountryData.city}
            />
          </div>
          <div>
            <p>Prayer Method</p>
            <select
              name="method"
              className="pl-4 text-xl"
              onChange={handleChange}
              value={localCountryData.method}
            >
              <option value="">Select Prayer Method</option>
              <option value="1">🌍 Muslim World League</option>
              <option value="2">🇺🇸 Islamic Society of North America</option>
              <option value="3">🇪🇬 Egyptian General Authority of Survey</option>
              <option value="4">🇸🇦 Umm Al-Qura University, Makkah</option>
              <option value="5">
                🇵🇰 University of Islamic Sciences, Karachi
              </option>
              <option value="6">
                🇮🇷 Institute of Geophysics, University of Tehran
              </option>
              <option value="7">
                🇮🇶 Shia Ithna-Ashari, Leva Institute, Qum
              </option>
              <option value="8">🇸🇦 Gulf Region</option>
              <option value="9">🇰🇼 Kuwait</option>
              <option value="10">🇶🇦 Qatar</option>
              <option value="11">
                🇸🇬 Majlis Ugama Islam Singapura, Singapore
              </option>
              <option value="12">
                🇫🇷 Union Organization islamic de France
              </option>
              <option value="13">🇹🇷 Diyanet İşleri Başkanlığı, Turkey</option>
              <option value="14">
                🇷🇺 Spiritual Administration of Muslims of Russia
              </option>
              <option value="15">🌒 Moonsighting Committee</option>
              <option value="16">🇦🇪 Dubai, UAE</option>
              <option value="17">
                🇲🇾 Jabatan Kemajuan Islam Malaysia (JAKIM)
              </option>
              <option value="18">🇹🇳 Tunisia</option>
              <option value="19">🇩🇿 Algeria</option>
              <option value="20">
                🇮🇩 Kementerian Agama Republik Indonesia
              </option>
              <option value="21">🇲🇦 Morocco</option>
              <option value="22">
                🇵🇹 Comunidade Islâmica de Lisboa (Portugal)
              </option>
            </select>
          </div>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </section>
    </header>
  );
}
