import React, {useState, useEffect} from "react";

export default function withEffect(WrapperComponent) {

    function Effect({swMode, effs, ...props}) {
        const [switchMode, setSwitchMode] = useState("");

        useEffect(() => {
            if(switchMode.length === 0 && swMode) {
                return setSwitchMode(effs.hide);
            }
            if(switchMode === effs.hide && !swMode) {
                return setSwitchMode(effs.show);
            }
            if(switchMode === effs.show && swMode) {
                return setSwitchMode(effs.hide);
            }
        }, [swMode]);

        return <WrapperComponent {...props} swMode={switchMode}/>
    }

    return Effect;
}
