import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendNotes, changeCreating, incrementSelected, editNotes, removeNotes, decrementSelected } from '../features/myinput';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Content() {
    const [ttitle, setTtitle] = useState("");
    const [tbody, setTbody] = useState("");
    const dispatch = useDispatch();
    const myinput = useSelector((state) => state.myinput.value);
    


    useEffect(() => {
        



        if (myinput.selected != -1) {
            fetch(`/data/${myinput.selected}`).then(
                res => res.json()
            ).then(data => {
                dispatch(changeCreating("update"))
                setTtitle(data.title == "No title" ? "" : data.title);
                setTbody(data.body == "No body" ? "" : data.body) }
            )
        }
        else {
            if (myinput.creating == "create") {
                setTtitle("");
                setTbody("");
            }
            else {
                dispatch(changeCreating(false));
                setTtitle("");
                setTbody("");
            }
        }
        
        
    }, [myinput.selected])
    
    
    /*

    


    useEffect(() => {
        if (myinput.creating == "create") {
            setTbody("")
            setTtitle("")
        }
    }, [myinput.creating]);
    function createNote() {
            fetch("/note", {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: cookies.get("id"),
                  title: ttitle,
                  body: tbody,
                })
            }).then(() => {
                dispatch(changeCreating(false));
                window.location.reload(true);

            })
            
            
        
        
    }

    */
    function editNote() {
        dispatch(editNotes({
            index: myinput.selected,
            data: {title: ttitle, body: tbody}
        }))
        fetch(`/edit/${myinput.selected}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: ttitle,
              body: tbody,
            })
        })
    }

    function deleteNote() {
        console.log(myinput.selected);
        dispatch(removeNotes(myinput.selected));
        fetch(`/delete/${myinput.selected}`);
        dispatch(decrementSelected());
    }

    
    function create() {

        fetch("/note", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: cookies.get("id"),
              title: ttitle,
              body: tbody,
            })
        }).then(() => {
            dispatch(changeCreating("update"));
            dispatch(appendNotes({title: ttitle, body: tbody,}));
            dispatch(incrementSelected());

        })
    }

    function renderbutton() {
        if (myinput.creating != "update") {
            return (
                <>
                    <button onClick={create} className="bg-[#FFD52E] rounded-md w-[100px] py-[4px] mr-[1.5%] float-end font-medium">Create</button>

                </>
            )
        
        }
        else {
            return (
                <>
                    <button onClick={editNote} className="bg-[#FFD52E] rounded-md w-[100px] py-[4px] mr-[1.5%] float-end font-medium">Save</button>
                    <button onClick={deleteNote} className="bg-[#cccccc] rounded-md w-[100px] py-[4px] ml-[1.5%] font-medium">Delete</button>

                </>
            )
        }
    }

    function rendercomponents() {
        if (myinput.creating != false) {
            return (
                <div className=" bg-[#ffffff] flex-grow-2 flex-1 ">
                    <input value={ttitle} onChange={(e) => setTtitle(e.target.value)} className='w-[97%] focus:outline-none h-[50px] font-semibold text-lg mx-[1.5%] p-[1.5%] mt-0 pr-0 rounded-lg'  placeholder={myinput.creating == "create" ? "New Note" : "Title"}/>
                    <div className="bg-[#c5c5c5] h-px w-[100%]"></div>
                    <textarea value={tbody} onChange={(e) => setTbody(e.target.value)} placeholder={myinput.creating == "create" ? "New Note" : ""} className="bg-white resize-none focus:outline-none h-[calc(93.5%-80px)] w-[97%] m-[1.5%] mt-0 mb-0 p-[2%] pt-[1%] pl-[1.5%] pr-0 text-left align-text-top" />
                    <div className="bg-[#c5c5c5] h-px w-[100%] mb-[20px]"></div>
                    {renderbutton()}
                </div>
            )
        }
        else {
            return (
                <div className="bg-white w-[100%] h-[100%] flex items-center justify-center flex-col flex-grow-2 flex-1 ">
                    <h1 className='font-semibold'>Select a note to view</h1>
                    <h1>Special thanks DomAB</h1>
                </div>
            )
        }
    }


    return (
        <>
            {rendercomponents()}
        </>
    );
};

export default Content;