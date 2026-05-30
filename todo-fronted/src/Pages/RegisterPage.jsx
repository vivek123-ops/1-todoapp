import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const userName = useRef();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      });

      alert(response.data.message);

      // navigate to login
      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          marginBottom: "130px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Username"
          ref={userName}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid black",
          }}
        />

        <input
          type="email"
          placeholder="Enter Email"
          ref={email}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid black",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          ref={password}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid black",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "10px",
            border: "1px solid black",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
