import React from "react";
import {Row, Col} from "antd";
import ContainerHeader from "components/ContainerHeader";
import EcommerceStatus from "components/Metrics/EcommerceStatus";

function CategoryReport() {
    return <div>
        <ContainerHeader title="Report of Category"/>
        <Row>
            <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <EcommerceStatus
                    icon="card"
                    title="Report A"
                    colorTitle="primary"
                    subTitle="November 25th, 2019"
                    colorSubTitle="grey"
                />
            </Col>
            <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <EcommerceStatus
                    icon="card"
                    title="Report B"
                    colorTitle="primary"
                    subTitle="November 10th, 2019"
                    colorSubTitle="grey"
                />
            </Col>
            <Col xl={4} lg={8} md={8} sm={12} xs={24}>
                <EcommerceStatus
                    icon="card"
                    title="Report C"
                    colorTitle="primary"
                    subTitle="October 29th, 2019"
                    colorSubTitle="grey"
                />
            </Col>
        </Row>
    </div>
}

export default CategoryReport;
