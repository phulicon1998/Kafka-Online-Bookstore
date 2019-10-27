import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

function Loader({loading, ...props}) {
    if(loading) {
        return <BeatLoader
            css={{
                "display": "flex",
                "width": "100%",
                "height": "300px",
                "alignItems": "center",
                "justifyContent": "center"
            }}
            color="#9ab5b2"
            sizeUnit="px"
            size="15"
            margin="2px"
            loading={loading}
        />
    } else {
        return props.children
    }
}

export default Loader;
