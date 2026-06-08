import React, { useState } from "react";
import userService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
   
    email: "",
    
    
    password: "",
    
  });
  const navigate = useNavigate();
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

    const {  email,   password  } = formData;

    if (!email ) {
      setErrMessage("provide the email");
      return;
    }

    if (!password) {
      setErrMessage("provide the password");
      return;
    }


 try {
    const payload = {
     
      email,
      
      password,
    };
setErrMessage(null);
    const response = await userService.signin(payload);

    console.log("SignIn Success:", response);
   setErrMessage("");
setIsSuccess(true);
navigate("/");
  } catch (error) {
    setErrMessage(error);
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

       

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        
       <button type="submit" style={styles.signInButton}>
          Sign In
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

         <button
          style={styles.button}
          onClick={() => {
            navigate("/signup");
          }
          }
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

export default SignIn;