import React, {useState, useCallback, useEffect} from "react";
import {Row, Col, Card, Table, Spin} from "antd";
import ContainerHeader from "components/ContainerHeader";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import CustomActiveShapePieChart from "./CustomActiveShapePieChart";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

function GenreReport({notify}) {
  const [genres, setGenres] = useState([]);
  const [eight, setEight] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      let genreData = await apiCall(...api.genre.report());

      let formGenreData = genreData.map((g, i) => {
        g.bookOrders = g.book_id.map(b => b.order_id).flat();
        return {
          _id: g._id,
          name: g.name,
          orderAmount: g.book_id.map(o => o.order_id.length).reduce((a, n) => a + n),
          revenue: g.bookOrders.map(o => o.price).reduce((a, n) => a + n),
          soldAmount: g.bookOrders.map(o => o.quantity).reduce((a, n) => a + n)
        }
      });
      setGenres(formGenreData);

      let eightData = formGenreData.sort((a, b) => {
        if (b.soldAmount > a.soldAmount) return 1;
        if (b.soldAmount === a.soldAmount && b.revenue > a.revenue) return 1;
        if (b.soldAmount === a.soldAmount && b.orderAmount > a.orderAmount) return 1;
        return -1;
      }).slice(0, 8).map((r, i) => ({...r, no: i + 1}))
      setEight(eightData);

      setLoading(false);
    } catch (e) {
      console.log(e);
      notify("error", "Data is not loaded");
    }
  }, [notify])

  useEffect(() => {
    load();
  }, [load])

  return <div>
    <ContainerHeader title="Genre Report on November 25th, 2019"/>
    <Row>
      <Col md={12}>
        <Card title="Best-seller Genres At The Moment">
          <Spin spinning={loading}>
            <Table
              className="gx-table-responsive"
              dataSource={eight}
              rowKey="_id"
              columns={[
                {
                  title: "No",
                  dataIndex: 'no'
                },
                {
                  title: 'Genre Name',
                  dataIndex: 'name'
                },
                {
                  title: "Sold Amount",
                  dataIndex: "soldAmount",
                  render: text => <span>{text} item(s)</span>
                },
                {
                  title: "Revenue",
                  dataIndex: "revenue",
                  render: text => <span>${text.toFixed(2)} </span>
                },
                {
                  title: "Order Amount",
                  dataIndex: "orderAmount",
                  render: text => <span>{text} order(s)</span>
                }
              ]}
            />
          </Spin>
        </Card>
      </Col>
      <Col md={12}>
        <Card className="gx-card" title="Comparison Between Revenue & Sold Amount In Each Eight Genres">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={eight} margin={{
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
      </Col>
      <Col md={12}>
        <Card className="gx-card" title="The Current Rate Of Books Sold Per Genre">
          <CustomActiveShapePieChart data={genres} dataKey="soldAmount"/>
        </Card>
      </Col>
      <Col md={12}>
        <Card className="gx-card" title="The Current Rate Of Order Per Genre">
          <CustomActiveShapePieChart data={genres} dataKey="orderAmount"/>
        </Card>
      </Col>
    </Row>
    <Row>
    </Row>
  </div>
}

export default withNoti(GenreReport);
