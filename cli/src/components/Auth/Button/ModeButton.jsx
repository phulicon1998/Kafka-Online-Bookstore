import React from "react";
import withEffect from "hocs/Auth/withEffect";

const ModeButton = ({title, button, modeCss, swMode, changeMode}) => {
    return (
        <div className={swMode}>
            <p>{title}</p>
            <button
                className={`${modeCss}`}
                onClick={changeMode}
            >
                {button}
            </button>
        </div>
    )
}

export default withEffect(ModeButton);
