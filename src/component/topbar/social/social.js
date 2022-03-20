import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import './social.css'

function Social (props){

    const brand = props.brand.map( (item , index) => {
        const {brandName , icon } = item;
        const renderTooltip = props => (
            <Tooltip {...props}>{`Follow on ${brandName}`}</Tooltip>
          );
        return(
            <div  key={index} className={`d-flex align-items-center justify-content-center social-icon ${brandName}`}data-bs-toggle="tooltip" data-bs-placement="bottom" title={`Follow on ${brandName}`}>
                <OverlayTrigger placement="bottom" overlay={renderTooltip}>
                    <a href="#">
                        <FontAwesomeIcon icon={icon} />
                    </a>
                </OverlayTrigger>
               
            </div>
        )
    })

    return(
        <div className="d-flex">
            {brand} 
        </div>
    )
}

export default Social