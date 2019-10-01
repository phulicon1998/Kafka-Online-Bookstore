import React from "react";

const Breadcrumb = ({paths, current, ...props}) => {
    return (
        <div className="shop-breadcrumb">
            <div className="container">
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
    )
}

export default Breadcrumb;
