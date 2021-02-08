import React from "react";

export default function RecordTable(props) {


    return (
        <div style={{display: 'flex', flexDirection: 'column', color: 'azure', alignItems:'center'}}>
            <div style={{fontWeight:'bold'}}> Record on this computer: {localStorage.getItem('record') || 0} </div>
            <div>
                Player: {props.player} record: {props.record}</div>
        </div>
    );
}
