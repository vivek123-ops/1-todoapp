import React, { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Input = ({ fetchData }) => {
  const title = useRef("");
  const date = useRef("");
  const { userId } = useContext(AuthContext);

  const handleButton = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/addpost", {
        userId,
        title: title.current.value,
      });
      alert(response.data.message);
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };
  return (
    <>
      {" "}
      <div className="inputbox">
        <input
          type="text"
          placeholder="enter your text "
          style={{ width: "210px", paddingLeft: "10px" }}
          ref={title}
        />
        <input
          type="date"
          ref={date}
          style={{
            paddingLeft: "10px",
          }}
        />
        <button type="button" class="btn btn-success" onClick={handleButton}>
          Success
        </button>
      </div>
    </>
  );
};

export default Input;
