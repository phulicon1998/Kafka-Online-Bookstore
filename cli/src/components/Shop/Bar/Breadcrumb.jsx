import React from "react";

const Breadcrumb = ({paths, current, viewed, harder, ...props}) => {
    return (
        <div className={`shop-breadcrumb ${harder ? "harder" : ""}`}>
            <div className="container">
                <div className={`row ${viewed ? "justify-content-between align-items-center" : ""}`}>
                    { viewed && <h4>Watched Books <i className="fas fa-angle-down"/></h4> }
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <i className="fas fa-home"/>
                            {
                                paths.map((v, i) => (
                                    <li className="breadcrumb-item" key={i}>
                                        <a href={v.path}>{v.name}</a>
                                    </li>
                                ))
                            }
                            <li className="breadcrumb-item active" aria-current="page">
                                {current}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Breadcrumb;
