import React from "react";
import {Row, Col, Card, Table} from "antd";
import ContainerHeader from "components/ContainerHeader";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import genData from "./data";

const genDiscuss = () => Math.floor((Math.random() * 200) + 100)

let discusses = genData().slice(0, 5).map(v => ({
    discussAmount: genDiscuss(),
    ...v
})).sort((a, b) => b.discussAmount - a.discussAmount).map((v, i) => ({
    no: `B${i+1}`,
    ...v
}));

let weekly = genData().sort((a, b) => b.soldAmount - a.soldAmount).map((v, i) => ({
    no: `B${i+1}`,
    ...v
}));
let monthly = genData(false).sort((a, b) => b.soldAmount - a.soldAmount).map((v, i) => ({
    no: `B${i+1}`,
    ...v
}));

function BookReportDetail() {
    return <div>
        <ContainerHeader title="Book Report on October 20th, 2019"/>
        <Row>
            <Col md={12}>
                <Card title="Category's Discussed Rate At The Moment">
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
                                title: 'Book Name',
                                dataIndex: 'name'
                            },
                            {
                                title: "Author",
                                dataIndex: "author"
                            },
                            {
                                title: "Amount of Comment",
                                dataIndex: "discussAmount",
                                render: text => <span>{text.toFixed(2)} review(s)</span>
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
                <Card className="gx-card" title="The Contrast Between Discuss & Sold Amount Received At The Moment">
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
                            <Bar yAxisId="left" dataKey="discussAmount" fill="#003366"/>
                            <Bar yAxisId="right" dataKey="soldAmount" fill="#FE9E15"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Card title="Top 8 Weekly Best-seller Books">
                    <Table
                        className="gx-table-responsive"
                        dataSource={weekly}
                        rowKey="_id"
                        columns={[
                            {
                                title: "No",
                                dataIndex: 'no'
                            },
                            {
                                title: 'Book Name',
                                dataIndex: 'name'
                            },
                            {
                                title: "Author",
                                dataIndex: "author"
                            },
                            {
                                title: "Amount of Sold",
                                dataIndex: "soldAmount",
                                render: text => <span>{text} item(s)</span>
                            },
                            {
                                title: "Received Money",
                                dataIndex: "moneyReceived",
                                render: text => <span>${text.toFixed(2)}</span>
                            }
                        ]}
                    />
                </Card>
            </Col>
            <Col md={12}>
                <Card className="gx-card" title="The Contrast Between Amount & Money Received Weekly">
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={weekly} margin={{
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
                            <Bar yAxisId="left" dataKey="soldAmount" fill="#003366"/>
                            <Bar yAxisId="right" dataKey="moneyReceived" fill="#FE9E15"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Card title="Top 8 Monthly Best-seller Books">
                    <Table
                        className="gx-table-responsive"
                        dataSource={monthly}
                        rowKey="_id"
                        columns={[
                            {
                                title: "No",
                                dataIndex: 'no'
                            },
                            {
                                title: 'Book Name',
                                dataIndex: 'name'
                            },
                            {
                                title: "Author",
                                dataIndex: "author"
                            },
                            {
                                title: "Amount of Sold",
                                dataIndex: "soldAmount",
                                render: text => <span>{text} item(s)</span>
                            },
                            {
                                title: "Received Money",
                                dataIndex: "moneyReceived",
                                render: text => <span>${text.toFixed(2)}</span>
                            }
                        ]}
                    />
                </Card>
            </Col>
            <Col md={12}>
                <Card className="gx-card" title="The Contrast Between Amount and Money Received Monthly">
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart data={monthly} margin={{
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
                            <Bar yAxisId="left" dataKey="soldAmount" fill="#003366"/>
                            <Bar yAxisId="right" dataKey="moneyReceived" fill="#FE9E15"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </Col>
        </Row>
    </div>
}

export default BookReportDetail;
