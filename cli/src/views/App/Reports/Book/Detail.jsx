import React, {useState, useEffect, useCallback} from "react";
import {Row, Col, Card, Table, Spin} from "antd";
import ContainerHeader from "components/ContainerHeader";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import genData from "./data";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import moment from "moment";

const genDiscuss = () => Math.floor((Math.random() * 200) + 100)

let discusses = genData().slice(0, 5).map(v => ({
    discussAmount: genDiscuss(),
    ...v
})).sort((a, b) => b.discussAmount - a.discussAmount).map((v, i) => ({
    no: `B${i+1}`,
    ...v
}));

function Top8Table({title, dataSource, loading}) {
    return (
        <Card title={title}>
            <Spin spinning={loading}>
                <Table
                    className="gx-table-responsive"
                    dataSource={dataSource}
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
                            dataIndex: "authors",
                            render: text => <span>{
                                text.length > 1 ? `${text[0]}...` : `${text.toString()}`
                            }</span>
                        },
                        {
                            title: "Sold Amount",
                            dataIndex: "soldAmount",
                            render: text => <span>{text} item(s)</span>
                        },
                        {
                            title: "Revenue",
                            dataIndex: "revenue",
                            render: text => <span>${text.toFixed(2)}</span>
                        }
                    ]}
                />
            </Spin>
        </Card>
    )
}

function SoldRevenueChart({title, data}) {
    return (
        <Card className="gx-card" title={title}>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data} margin={{
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
                    <Bar yAxisId="right" dataKey="revenue" fill="#FE9E15"/>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

function BookReportDetail({notify}) {
    const [weekly, setWeekly] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [loading, setLoading] = useState(true);

    const identifyTheEight = useCallback((data) => {
        // group by name then sort by sold amount and revenue then slide to take 8
        return data.reduce((a, n) => {
            let name = a.map(b => b.name);
            if(name.indexOf(n.edition_id.book_id.name) === -1) {
                a.push({
                    name: n.edition_id.book_id.name,
                    authors: n.edition_id.book_id.authors,
                    revenue: n.realPrice,
                    soldAmount: n.quantity
                })
            } else {
                a.forEach(b => {
                    if(b.name === n.edition_id.book_id.name) {
                        b.revenue += n.realPrice;
                        b.soldAmount += n.quantity;
                    }
                })
            }
            return a;
        }, []).sort((a, b) => {
            if(b.soldAmount > a.soldAmount) return 1;
            if(b.soldAmount === a.soldAmount && b.revenue > a.revenue) return 1;
            return -1;
        }).slice(0, 8).map((r, i) => ({...r, no: i+1}));
    }, [])

    const load = useCallback(async() => {
        try {
            let data = await apiCall(...api.book.report());

            // Get all the order made in this week
            let weekData = data.filter(o => moment(o.order_id.createdAt).week() === moment().week());
            let groupWeekData = identifyTheEight(weekData);
            setWeekly(groupWeekData);

            // Get all the order made in this week
            let monthData = data.filter(o => moment(o.order_id.createdAt).month() === moment().month());
            let groupMonthData = identifyTheEight(monthData);
            setMonthly(groupMonthData);

            setLoading(false);
        } catch (e) {
            notify("error", "Data is not loaded");
        }
    }, [identifyTheEight, notify])

    useEffect(() => {
        load();
    }, [load])

    return <div>
        <ContainerHeader title={`Book Report on ${moment().format("MMM Do, YYYY")}`}/>
        <Row>
            <Col md={12}>
                <Top8Table
                    title="Top 8 Weekly Best-seller Books"
                    dataSource={weekly}
                    loading={loading}
                />
            </Col>
            <Col md={12}>
                <Top8Table
                    title="Top 8 Monthly Best-seller Books"
                    dataSource={monthly}
                    loading={loading}
                />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <SoldRevenueChart
                    title="The Contrast Between Amount & Money Received Weekly"
                    data={weekly}
                />
            </Col>
            <Col md={12}>
                <SoldRevenueChart
                    title="The Contrast Between Amount and Money Received Monthly"
                    data={monthly}
                />
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Card title="Top 5 Book Interested At The Moment">
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
                                title: "Reviews",
                                dataIndex: "discussAmount",
                                render: text => <span>{text.toFixed(2)} review(s)</span>
                            },
                            {
                                title: "Sold Amount",
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

    </div>
}

export default withNoti(BookReportDetail);
