import React from "react";
import {Row, Col} from "antd";
import ContainerHeader from "components/ContainerHeader";
import EcommerceStatus from "components/Metrics/EcommerceStatus";

function BookReport() {
  return <div>
    <ContainerHeader title="Report of Books"/>
    <Row>
      <Col xl={4} lg={8} md={8} sm={12} xs={24}>
        <EcommerceStatus
          icon="visits"
          title="Report A"
          colorTitle="primary"
          subTitle="October 20th, 2019"
          colorSubTitle="grey"
        />
      </Col>
      <Col xl={4} lg={8} md={8} sm={12} xs={24}>
        <EcommerceStatus
          icon="visits"
          title="Report B"
          colorTitle="primary"
          subTitle="October 20th, 2019"
          colorSubTitle="grey"
        />
      </Col>
      <Col xl={4} lg={8} md={8} sm={12} xs={24}>
        <EcommerceStatus
          icon="visits"
          title="Report C"
          colorTitle="primary"
          subTitle="October 20th, 2019"
          colorSubTitle="grey"
        />
      </Col>
    </Row>
  </div>
}

export default BookReport;
