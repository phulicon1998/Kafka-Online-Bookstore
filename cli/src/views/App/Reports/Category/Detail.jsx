import React from "react";
import {Row, Col, Card, Table} from "antd";
import ContainerHeader from "components/ContainerHeader";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import data from "./data";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";

const genDiscuss = () => Math.floor((Math.random() * 200) + 100)

let discusses = data.map(v => ({
    discussAmount: genDiscuss(),
    ...v
})).sort((a, b) => b.discusses - a.discusses).map((v, i) => ({
    no: `C${i+1}`,
    ...v
}));
let buyRate = discusses.map(v => ({
    name: v.name,
    rate: v.soldAmount / v.discusses
}))

function CategoryReportDetail() {
    return <div>
        <ContainerHeader title="Category Report on November 25th, 2019"/>
        <Row>
            <Col md={12}>
                <Card title="Amount of Category Discussion At The Moment">
                    <Table
                        className="gx-table-responsive"
                        dataSource={discusses}
                        rowKey="_id"
                        columns={[
                            {
                                title: "No",
                                dataIndex: 'no'
                            },
                            {
                                title: 'Category Name',
                                dataIndex: 'name'
                            },
                            {
                                title: "Amount of Review",
                                dataIndex: "discusses",
                                render: text => <span>{text} review(s)</span>
                            },
                            {
                                title: "Amount of Sold",
                                dataIndex: "soldAmount",
                                render: text => <span>{text} item(s)</span>
                            }
                        ]}
                    />
                </Card>
            </Col>
            <Col md={12}>
                <Card className="gx-card" title="The Contrast Between Discuss & Sold Amount In Category Received At The Moment">
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={discusses} margin={{
                            top: 10,
                            right: 0,
                            left: -15,
                            bottom: 0
                        }}>
                            <XAxis dataKey="no"/>
                            <YAxis yAxisId="left" orientation="left" stroke="#03275b"/>
                            <YAxis yAxisId="right" orientation="right" stroke="#FE9E15"/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend/>
                            <Bar yAxisId="left" dataKey="discusses" fill="#003366"/>
                            <Bar yAxisId="right" dataKey="soldAmount" fill="#FE9E15"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Col>
            <Col md={12}>
                <Card className="gx-card" title="The Current Rate Of Books Sold Amount Per Category">
                    <CustomActiveShapePieChart data={data} dataKey="soldAmount"/>
                </Card>
            </Col>
            <Col md={12}>
                <Card className="gx-card" title="The Current Rate Of Ordering Per Category (Based On Current Discussion Amount Made)">
                    <CustomActiveShapePieChart data={buyRate} dataKey="rate"/>
                </Card>
            </Col>
        </Row>
        <Row>
        </Row>
    </div>
}

export default CategoryReportDetail;
