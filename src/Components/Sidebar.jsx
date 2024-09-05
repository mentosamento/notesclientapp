import React, { useEffect, useReducer, useState } from "react";
import NoteBar from "./NoteBar";
import Cookies from "universal-cookie";
import { v4 } from "uuid";
import { connect, useDispatch, useSelector } from "react-redux";
import myinput, { appendNotes, changeCreating, changeMyText, changeNotes, changeSelected } from "../features/myinput";
import Testcase from "./Testcase";
const cookies = new Cookies();

function Sidebar() {
  const dispatch = useDispatch();
  const myinput = useSelector((state) => state.myinput.value);

  function signout() {
    cookies.remove("id");
    window.location.reload();
  }

  function createNew() {
    dispatch(changeSelected(-1));
    dispatch(changeCreating("create"))
  }

  async function fetchData() {
    await fetch("/mynotes").then(
      res => res.json()
    ).then(
      
      data => {
        console.log(data.result);
        dispatch(changeNotes(data.result))
      }
    )
  }
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="bg-[#FFFFFF] flex-grow-1 basis-1/4 border-r-[1px] border-groove border-[#c3c3c3]">
      <div onClick={() => {dispatch(changeSelected(-1)); dispatch(changeCreating(false))}} className="bg-[#FFD52E] h-[50px] border-b-[1px] border-solid border-[#c5c5c5]"></div>
      <div>
        <div className="py-2 border-b-[1px] border-solid border-[#c5c5c5] flex flex-row items-center leading-5">
          <div onClick={() => {dispatch(changeSelected(-1)); dispatch(changeCreating(false))}}  className="w-full">
            <h1 className="text-black text-2xl bold font-semibold font-helvetica px-3">
              Notes
            </h1>
          </div>
          
          <div onClick={createNew} className="ml-auto mr-4 cursor-pointer">
            <svg
              className="active:fill-[#f7cc1e] cursor-pointer mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="#FFD52E"
              class="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </div>
        </div>
        <div className="h-[calc(100vh-130px)] overflow-y-auto">
          {myinput.mynotes && myinput.mynotes.map((val, index) => (
            <NoteBar grid={index%2===0} title={val.title} text={val.body} key={index} order={index}/>
          ))}
        </div>
        <div onClick={() => {dispatch(changeSelected(-1)); dispatch(changeCreating(false))}} className="h-[30px] bg-[#f8f8f8] flex-shrink-0 flex items-center">
          <h1 className="text-xs text-black ml-3">{cookies.get("id")}</h1>
          <h1 onClick={signout} className="ml-auto text-xs mr-3 cursor-pointer">
            Sign out
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
