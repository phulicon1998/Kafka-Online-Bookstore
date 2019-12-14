import React from "react";
import {Link} from "react-router-dom";
import {qualityToString} from "constants/qualityControl";

function QualityBox({amount, qualityNum, book_id, min}) {
    let qualityName = qualityToString(qualityNum);
    return (
        <Link to={`/store/quality/${book_id}/${qualityNum}`} className="quality-box">
            <h4>{qualityName}</h4>
            <p>{amount} item(s) from <b>${min}</b></p>
        </Link>
    )
}

function SelectQualityBox({amount, onClick, qualityName, selected, minPrice}) {
    return (
        <div className={`quality-box select ${selected ? "active" : ""}`} onClick={onClick}>
            <h4>{qualityName}</h4>
            <p>{amount} item(s) from <b>${minPrice}</b></p>
        </div>
    )
}

export {SelectQualityBox};
export default QualityBox;
