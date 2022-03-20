import React from 'react';
import ReactTextRotator from "react-text-rotator";

function TopBarSlide (props){
    return(
        <>
            <ReactTextRotator content={props.content} time={3500} startDelay={0} />
        </>
    )
}

export default TopBarSlide