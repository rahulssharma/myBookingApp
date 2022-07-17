import React, { useContext,useState } from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Navbar() {
  const {user}=useContext(AuthContext);

  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false)

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
});

  const [rcredentials, setRcredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    isAdmin: false,

  });

  const {loading,error,dispatch}=useContext(AuthContext);


  const navigate=useNavigate()


  const handleChange=(e)=>{
    // var username = document.getElementById("username");
    // var email = document.getElementById("email");
    // var password = document.getElementById("password");
    // var checkBox = document.getElementById("isAdmin");
    // if (checkBox.value='on'){
    //        checkBox.value=true
    //        console.log(checkBox.value)
    //      }
    setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}))
    // setCredentials(()=>({
    //       username: username.value,
    //       email: email.value,
    //       password: password.value,
    //       isAdmin: checkBox.value
    // })
    // )

  }  
  
  // const checkBoxClicked=()=>{
  //    var checkBox = document.getElementById("isAdmin");
  //    if (checkBox.value='on'){
  //      checkBox.value=true
  //    }
  //    console.log(checkBox.value);
  //    setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}))


  //  }



    const handleClick=async(e)=>{
      e.preventDefault();
      dispatch({type:"LOGIN_START"})
      try{
        const res= await axios.post("/auth/login",credentials);
        dispatch({type:"LOGIN_SUCCESS", payload: res.data})
        navigate('/')
        setLoginOpen(false)
      }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
      }
    }


    // const handleRchange=(e)=>{
    //   setRcredentials((prev)=>({...prev,[e.target.id]:e.target.value}))
    // }  




    const handleRclick=async(e)=>{
      e.preventDefault();
      dispatch({type:"LOGIN_START"})
      try{
          const res= await axios.post("/auth/register",credentials);
          dispatch({type:"REGISTER", payload: res.data})
          setRegisterOpen(false)
          setLoginOpen(true)
          // localStorage.removeItem("user");

      }catch(err){
          dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
      }
    }
  

     const handleLogout =async()=>{
        try{
            const res= await axios.post("/users/logout",credentials);
            dispatch({type:"LOGOUT", payload: res.data})

            // localStorage.removeItem("user");
            // navigate('/');
  
        }catch(err){
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        }
        
     }
  

  return (


        <>
        {registerOpen && <div className="register">
          <div className="fContainer">
            <form action="" className="registerContainer">
              <FontAwesomeIcon icon={faXmark} className='icon' onClick={()=>setRegisterOpen(false)}/>
              <h2>Register</h2>
              <div className="username">
                <label htmlFor="username">Username</label>
                <input type="text" name='username' id="username" placeholder='Enter the username' onChange={handleChange}/>
              </div>
              <div className="email">
                <label htmlFor="email">email</label>
                <input type="email" name='email' placeholder='Enter Email Address' id="email" onChange={handleChange}/>
              </div>
              <div className="password">
                <label htmlFor="username">Password</label>
                <input type="password" name='password' id="password" placeholder='Enter the password' onChange={handleChange}/>
              </div>
              <div className="confirmPassword">
                <label htmlFor="Confirm_password">Confirm password</label>
                <input type="text" name='Confirm_password' placeholder='Confirm your password'/>
              </div>
              <label htmlFor="isAdmin">Are you an Admin? </label>
              <input type="checkbox" name='checkAdmin' id='isAdmin'  onChange={handleChange}/>
              <button disabled={loading} onClick={handleRclick}>Submit</button>
              {error && <span>{error.message}</span>}

            </form>
          </div>
        </div>
        }

        {loginOpen && <div className="login">
          <div className="fContainer">
            <form action="" className="registerContainer">
              <FontAwesomeIcon icon={faXmark} className='icon' onClick={()=>setLoginOpen(false)}/>
              <h2>Login</h2>
              <div className="username">
                <label htmlFor="username">Username</label>
                <input type="text" name='username' id="username" placeholder='Enter the username' onChange={handleChange}/>
              </div>
              <div className="password">
                <label htmlFor="username">Password</label>
                <input type="password" name='password' id="password" placeholder='Enter the password' onChange={handleChange}/>
              </div>
              <div className="isAdmin">
                <label htmlFor="isAdmin">Are you an Admin</label>
                <input type="checkbox" name='checkAdmin' id='isAdmin'  onChange={handleChange}/>
              </div>
              <button disabled={loading} onClick={handleClick}>Submit</button>
              {error && <span>{error.message}</span>}
            </form>
          </div>
        </div>
        }
  
        <div className="navbar">
            <div className="navContainer">
              <Link to="/" style={{color:'inherit',textDecoration:"none"}}>
                <span className='logo'>LamaBooking</span>
              </Link>
               {user ? user.username &&
              (<div className='logout' onClick={handleLogout}>
                 <button>Logout</button>
               </div>)
                : 
                ( <div className="navItems">
                    <button  className='navButton' onClick={()=>setRegisterOpen(true)}>Register</button>
                    <button  className='navButton' onClick={()=>setLoginOpen(true)}>Login</button>
                </div>)}
            </div>
        </div>
    
    </>
    
  )
}

export default Navbar