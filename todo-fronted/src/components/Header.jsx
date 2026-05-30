import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userId, setUserId } = useContext(AuthContext);

  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  const getUserName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/get-user/${userId}`,
      );

      setUserName(response.data.userName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserName();
    } else {
      setUserName("");
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");

    setUserId(null);

    navigate("/login");
  };

  return (
    <div
      style={{
        width: "99%",
        height: "70px",
        backgroundColor: "#24292e",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 40px",
        margin: "0 auto",
        marginTop: "10px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ color: "white" }}>
        {userId ? `Welcome ${userName}` : "MERN App"}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {userId ? (
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
