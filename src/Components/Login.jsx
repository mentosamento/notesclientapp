import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import Cookies from "universal-cookie";
const cookies = new Cookies();


function Login() {
    const [inputt, setInputt] = useState("");
    function signup() {
        const id = v4()
        if (typeof cookies.get("id") == "undefined") {
            cookies.set("id", id, {path: "/", expires: new Date(Date.now()+2628000000)});
            fetch("/create");
        }
        window.location.reload();
    }
    function login() {
        async function fetcher() {
            const response = await fetch("/login", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: inputt,
                })
            });
            const data = await response.text()
            return data
        }
        fetcher().then((res) => {
            if (!(res === "Specified ID does not seem to exist")) {
                cookies.set("id", res, {path: "/", expires: new Date(Date.now()+2628000000)});
                window.location.reload();
            } else {
                console.error(res);
            }
        })
        
    }
    return (
        <div className='w-[100%] text-center absolute top-[47%] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <h1 className="text-center font-semibold text-2xl">Log In to Notes</h1>
            <h2>No email needed</h2>
            <input value={inputt} onChange={(e) => setInputt(e.target.value)} placeholder='Enter your id' className='rounded-lg mt-5 border-[2px] pl-3 pr-1 py-2 w-[30vw] mx-auto border-solid border-[#c5c5c5]'/>
            <br/>
            <button onClick={login} className="bg-[#FFD52E] w-[30vw] mt-2 py-[8px] rounded-lg font-medium">Sign In</button>
            <h1 onClick={signup} className='mt-4 cursor-pointer'>No account? Sign up</h1>
        </div>
    );
};

export default Login;