import React, { useState } from "react";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [errMsg, setErrMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email) {
      setErrMessage("Provide the email");
      return;
    }

    if (!password) {
      setErrMessage("Provide the password");
      return;
    }

    try {
      const payload = { email, password };

      setErrMessage("");
      setMessage("");

      const response = await userService.signin(payload);

      const user = response?.data?.user || response;

      authCtx.signin(user);

      console.log("SignIn Success:", response);

      setIsSuccess(true);
      setMessage("Login successful!");

      navigate("/");
    } catch (error) {
      console.log("SignIn Error:", error);

      setErrMessage(error?.message || "Login failed");
      setMessage("");
      setIsSuccess(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Sign In to Your Feeds</h2>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.passwordInput}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={styles.eyeButton}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        <button type="submit" style={styles.signInButton}>
          Sign In
        </button>

        {errMsg ? (
          <p style={styles.err_msg}>{errMsg}</p>
        ) : (
          message && (
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )
        )}

        <button
          type="button"
          style={styles.button}
          onClick={() => navigate("/signup")}
        >
          Are you new here
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #5a8e85, #acb6e5)",
  },

  card: {
    width: "350px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },

  input: {
    marginBottom: "22px",
    padding: "10px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
  },

  passwordContainer: {
    position: "relative",
    marginBottom: "22px",
  },

  passwordInput: {
    width: "100%",
    padding: "10px 40px 10px 10px",
    fontSize: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
  },

  eyeButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    padding: 0,
  },

  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#dddfe0",
    color: "#3b3535",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },

  err_msg: {
    marginTop: "10px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#ed7872",
  },

  signInButton: {
    marginTop: "10px",
    fontSize: "16px",
    padding: "8px 12px",
    backgroundColor: "#1674ef",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default SignIn;