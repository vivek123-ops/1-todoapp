import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Condition = () => {
  const [alldata, setdata] = useState("");
  const { userId } = useContext(AuthContext);

  useEffect(() => {
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
    if (userId) {
      fetchData();
    }
  }, [userId]);
  return (
    <>
      <div className="conditionDiv" style={{ width: "100%" }}>
        {alldata.length === 0 ? (
          <h3 style={{ textAlign: "center" }}>No Data</h3>
        ) : (
          <h3 style={{ textAlign: "center" }}>Your data</h3>
        )}
      </div>
    </>
  );
};

export default Condition;
