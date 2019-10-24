import React from "react";

function AddressBox({selected, defAddress, select, rm, ...props}) {
    return (
        <div className={`address-box ${selected ? "selected" : ""}`}>
            <h5>{defAddress ? "Default" : "Alternative"} Address</h5>
            <h3>{props.receiver}</h3>
			<p><b>Address:</b> {props.address}, {props.city}</p>
			<p>{props.country}</p>
			<div>
                <button
                    onClick={select}
                    className={selected ? "selected" : ""}
                    disabled={selected}
                >
                    {selected && <i className="fas fa-check"/>}
                    {selected ? "Selected" : "Use this address"}
                </button>
				<button onClick={rm}>Remove</button>
			</div>
        </div>
    )
}

export default AddressBox;
