import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCreating, changeSelected } from '../features/myinput';

function NoteBar({grid, title, text, order}) {
    const dispatch = useDispatch();
    const myinput = useSelector((state) => state.myinput.value);

    function selectNote() {
        dispatch(changeSelected(order));
    }

    function renderBg() {
        if (!(myinput.selected === order)) {
            if (grid) {
                return "bg-[#FFFFFF]"
            } else {
                return "bg-[#efefef]"
            }
        } else {
            return "bg-[#FFD52E]"
        }
    }
    return (
        <div onClick={selectNote} className={`${renderBg()} px-3.5 h-[60px] cursor-pointer ${myinput.selected === order ? "hover:bg-[#ffda48]" : "hover:bg-[#dfdfdf]"} flex items-center`}>
            <div>
                <h1 className="font-semibold text-ellipsis w-[25vw] whitespace-nowrap overflow-hidden">{title.trim()==="" ? "No Title" : title}</h1>
                <p className="text-ellipsis w-[25vw] text-sm whitespace-nowrap overflow-hidden">{text.trim()==="" ? "No body" : text}</p>
            </div>
        </div>
    );
};

export default NoteBar;