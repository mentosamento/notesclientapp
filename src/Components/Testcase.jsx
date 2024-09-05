import React, { useEffect } from 'react';

function Testcase({grid, title, text, order}) {
    useEffect(() => {
        console.log(order);
        console.log(title);
        console.log(text);
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default Testcase;