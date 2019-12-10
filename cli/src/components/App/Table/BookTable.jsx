import React from "react";
import {Card, Spin, Table, Divider} from "antd";
import moment from "moment";
import PopConfirm from "components/Shop/Pop/PopConfirm";

function BookTable({title, loading, data, hdSelect, isProvider, hdApprove}) {
    function renderReviewedStatus() {
        return isProvider ? [{
            title: 'Status',
            dataIndex: 'reviewed',
            render: text => <span>{text ? "Approved" : "Processing"}</span>
        }] : [];
    }

    return (
        <Card title={title}>
            <Spin spinning={loading}>
                <Table
                    className="gx-table-responsive"
                    dataSource={data}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Book",
                            dataIndex: 'name',
                            render: (text, record) => (
                                <span className="book-tr-name">
                                    <img src={record.image.url} alt="bookimage"/>
                                    <span>
                                        <h4>{text} {record.bookcare && <i className="fab fa-bandcamp"/>}</h4>
                                        <p><i className="fas fa-user-friends"/> {record.authors.map(v => v.name).toString().split(",").join(", ")}</p>
                                        <small>ISBN - {record.isbn}</small>
                                    </span>
                                </span>
                            )
                        },
                        {
                            title: "Genres",
                            dataIndex: 'genres',
                            render: text => <span>{text.map(v => v.name).toString().split(",").join(" / ")}</span>
                        },
                        {
                            title: "Language",
                            dataIndex: 'language',
                        },
                        {
                            title: 'Publisher',
                            dataIndex: 'publish.by.name',
                        },
                        {
                            title: 'Publish At',
                            dataIndex: 'publish.at',
                            render: text => <span>{moment(text).format("DD-MM-YYYY")}</span>
                        },
                        ...renderReviewedStatus(),
                        {
                            title: 'Action',
                            key: 'action',
                            width: 100,
                            render: (text, record) => (
                                <span style={{"minWidth": "150px", "display": "flex"}}>
                                    {isProvider || !hdApprove || <PopConfirm
                                        title="Are you sure to approve this book?"
                                        task={hdApprove.bind(this, record._id)}
                                        okText="Sure, do it"
                                        cancelText="Not now"
                                        >
                                            <span className="gx-link">Approve</span>
                                        </PopConfirm>}
                                    {isProvider || !hdApprove || <Divider type="vertical"/>}
                                    {(!isProvider || (isProvider && !record.reviewed)) && <span className="gx-link" onClick={hdSelect.bind(this, record)}>Edit</span>}
                                    {isProvider && record.reviewed && <span style={{"color": "gray"}}><i>None</i></span>}
                                </span>
                            )
                        }
                    ]}
                />
            </Spin>
        </Card>
    )
}

export default BookTable;
