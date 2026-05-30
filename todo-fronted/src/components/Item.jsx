import axios from "axios";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Item = ({ item, fetchData }) => {
  const { userId } = useContext(AuthContext);
  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/deletePost",
        {
          userId,
          title: item,
        },
      );
      fetchData();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "login failed");
    }
  };
  return (
    <>
      {" "}
      <li class="list-group-item">
        {item}
        <span>
          <button type="button" class="btn btn-danger" onClick={handleDelete}>
            Danger
          </button>
        </span>
      </li>
    </>
  );
};

export default Item;
