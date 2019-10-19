import React, {useState, useEffect} from "react";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

function Edition({notify, ...props}) {
    const [editions, setEditions] = useState([]);

    useEffect(() => {
        load();
    })

    async function load() {
        try {
            let editionData = await apiCall(...api.edition.get());
            setEditions(editionData);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }

    return (
        <div>
            <h1>View all editions</h1>
        </div>
    )
}

export default withNoti(Edition);
