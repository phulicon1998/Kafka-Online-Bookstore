import React, {useState, useEffect, useCallback} from "react";
import {Input} from "antd";

function SearchBar({setData, data, keys, ...props}) {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const hdChange = e => setSearch(e.target.value);

    const accessKey = useCallback((keys, obj) => {
        let v = obj;
        if(keys.length > 0) {
            if(v[keys[0]]) {
                v = v[keys[0]];
                keys.splice(0, 1);
                return accessKey(keys, v);
            } else {
                v = ""
            }
        }
        return v.toString().toLowerCase();
    }, []);

    // get an array of values determined by each specified object's key
    const getKey = useCallback((obj) => {
        let vals = keys.map(k => accessKey(k.split("."), obj));
        return {vals, obj}
    }, [accessKey, keys])

    useEffect(() => {
        // run on the first time data is passed
        if(data.length > 0 && list.length === 0) {
            // console.log("case 1", list, data);
            setList(data);
        }

        if(search.length === 0 && list.length > 0) {
            // console.log("case 2", list, data);
            setData(list);
        }

        if(search.length > 0) {
            let sData = list.length > 0 ? list : data;
            let found = sData.map(getKey)
            .filter(d => d.vals.some(v => v.includes(search.toLowerCase())))
            .map(rs => rs.obj);
            setData(found);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <Input
            value={search}
            onChange={hdChange}
            {...props}
        />
    )
}

export default SearchBar;
