import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import Condition from "../components/Condition";
import Item from "../components/Item";

const HomePage = () => {
  const { userId } = useContext(AuthContext);

  const [alldata, setdata] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getData", {
        params: {
          userId,
        },
      });

      setdata(response.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="homePage">
      <Input fetchData={fetchData} />
      <Condition />
      <br />
      <ul className="list-group">
        {Array.isArray(alldata) &&
          alldata.map((item, index) => (
            <Item key={index} item={item} fetchData={fetchData} />
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
