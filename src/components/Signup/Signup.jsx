import React, { useState } from "react";
import userService from "../../services/UserService";
import { Navigate, useNavigate } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
const [errMsg, setErrMessage] = useState("");
  const handleChange = (e) => {/* alert("Redirect to Sign In") */
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, gender, dob, password, confirmPassword } = formData;

    if (!name || !email || !mobile || !gender || !password || !confirmPassword) {
      setErrMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrMessage("Passwords do not match");
      return;
    }


 try {
    const payload = {
      name,
      email,
      mobile,
      gender,
      dob,
      password,
    };
setErrMessage(null);
    const response = await userService.signup(payload);

    console.log("Signup Success:", response);
   setMessage("Account created successfully! & \n Password has sent to your email");
   setErrMessage("");
setIsSuccess(true);
  } catch (error) {
    setErrMessage(error.message || "Signup failed");
setMessage("");
setIsSuccess(false);
  }


    console.log("Signup Data:", formData);
    
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          style={styles.input}
        />

        {/* Gender */}
        <div style={styles.genderBox}>
          <label style={styles.genderLabel}>Gender:</label>

          <label style={styles.radio}>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
            /> 
            Male
          </label>

          <label style={styles.radio}>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
            />
            Female
          </label>

          <label style={styles.radio}>
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={handleChange}
            />
            Other
          </label>
        </div>

         
 <div style={styles.input}>
  <label >Date of birth<br/>
<input 

  type="date"
  name="dob"
  value={formData.dob}
  onChange={handleChange}
  style={styles.input}
></input>
</label>
</div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Submit
        </button>

       {errMsg ? (
  <p style={styles.err_msg}>{errMsg}</p>
) : (
  message && (
    <div>
      <p style={{ color: "green", fontWeight: "bold" }}>
        {message}
      </p>

      {/* {isSuccess && (
        <button
          style={styles.signInButton}
          onClick={() => alert("Redirect to Sign In")}
        >
          Sign In
        </button>
      )} */}
    </div>
  )
)}
<br/>
 <a href="/signin"
          //style={styles.signInButton}
          onClick={() => {

            navigate("/signin");
          }
          }
        >
          Sign In
        </a>
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

  genderBox: {
    marginBottom: "12px",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },

  genderLabel: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  },

  radio: {
    marginRight: "30px",
    fontSize: "14px",
    
  },

  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#e0ebe0",
    color: "#3b3535",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },

  message: {
    marginTop: "10px",
    textAlign: "center",
    fontWeight: "bold",
    color: "#83c54d",
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
}
};

export default Signup;