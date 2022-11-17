import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleHoliday from "./SingleHoliday";
const url = "https://react--course-api.herokuapp.com/api/v1/data/vacanze";

const Holiday = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const nextHoliday = () => {
    //controllo se sono arrivata all'ultimo elemento
    setSelected((prevValue) => {
      if (prevValue + 1 === data.data.length) {
        return 0;
      } else {
        return prevValue + 1;
      }
    });
  };

  const previousHoliday = () => {
    setSelected((prevValue) => {
      if (prevValue - 1 < 0) {
        return data.data.length - 1;
      } else {
        return prevValue - 1;
      }
    });
  };

  return data.success ? (
    <>
      {data.data.length > 0 ? (
        <SingleHoliday
          {...data.data[selected]}
          next={nextHoliday}
          prev={previousHoliday}
        />
      ) : (
        <div>Nessuna Vacanza</div>
      )}
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Holiday;
