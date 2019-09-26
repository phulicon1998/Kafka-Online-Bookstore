import React, {useState, useEffect} from "react";

export default function withFadeAnimation(WrapperComponent) {

    function FadeAnimation({swMode, ...props}) {
        const [switchMode, setSwitchMode] = useState("");

        useEffect(() => {
            if(switchMode.length === 0 && swMode) {
                return setSwitchMode("authFadeOut");
            }
            if(switchMode === "authFadeOut" && !swMode) {
                return setSwitchMode("authFadeIn");
            }
            if(switchMode === "authFadeIn" && swMode) {
                return setSwitchMode("authFadeOut");
            }
            return () => console.log("unmount");
        }, [swMode]);

        return <WrapperComponent {...props} swMode={switchMode}/>
    }

    return FadeAnimation;
}
