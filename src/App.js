import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie";
import {v4} from "uuid"
import Sidebar from "./Components/Sidebar";
import Content from "./Components/Content";
import Login from "./Components/Login";
const cookies = new Cookies();


function App() {
  const [userId, setUserId] = useState(false);
  useEffect(() => {
    if (typeof cookies.get("id") == "undefined") {
      setUserId(false)
    }
    else {
      setUserId(cookies.get("id"));
    }

  }, [])
  return (
    <div className="flex w-auto h-[100vh]">
      {
        userId ? (
          <>
            <Sidebar />
            <Content />
          </>
        ) : (
          <Login />
        )
      }

    </div>
  )
  
}

export default App;
