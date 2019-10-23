import React, {useState, useEffect, useCallback} from "react";
import {Card, Table, Divider, Spin} from "antd";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import PopConfirm from "components/Shop/Pop/PopConfirm";
import {qualityToString} from "constants/qualityControl";

function Edition({notify, ...props}) {
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async() => {
        try {
            let editionData = await apiCall(...api.edition.get());
            setEditions(editionData);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }, [notify]);

    useEffect(() => {
        load();
    }, [load])

    function hdEdit(){

    }

    async function hdRemove(edition_id) {
        setLoading(true);
        try {
            await apiCall(...api.edition.remove(edition_id));
            let newEditions = editions.filter(v => v._id !== edition_id);
            setEditions(newEditions);
            notify("success", "Process is completed", "Edition is removed successfully.");
        } catch(err) {
            notify("error", "Data is not removed");
        }
        setLoading(false);
    }

    return (
        <Card title="List of Your Book's Edition">
            <Spin spinning={loading}>
                <Table
                    className="gx-table-responsive"
                    dataSource={editions}
                    rowKey="_id"
                    columns={[
                        {
                            title: "Book's Name",
                            dataIndex: 'book_id',
                            render: text => <span>{text.name}</span>
                        },
                        {
                            title: "Book's Quality",
                            dataIndex: 'quality',
                            render: text => <span>{qualityToString(text)}</span>
                        },
                        {
                            title: "Book's Price",
                            dataIndex: 'price',
                            render: text => <span>${text}</span>
                        },
                        {
                            title: "Book's Discount",
                            dataIndex: 'discount',
                            render: text => <span>-{text}%</span>
                        },
                        {
                            title: "Book's Description",
                            dataIndex: 'desc',
                        },
                        {
                            title: "Book's Provider",
                            dataIndex: 'provider_id',
                            render: text => <span>{text.name}</span>
                        },
                        {
                            title: "Book Images",
                            dataIndex: 'images',
                            render: text => <span>Contains {text.length} image(s)</span>
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            width: 100,
                            render: (text, record) => (
                                <span>
                                    <span
                                        className="gx-link"
                                        onClick={hdEdit.bind(this, record)}
                                    >
                                        Edit
                                    </span>
                                    <Divider type="vertical"/>
                                    <PopConfirm
                                        title="Are you sure to delete this edition?"
                                        task={hdRemove.bind(this, record._id)}
                                        okText="Sure, remove it"
                                        cancelText="Not now"
                                    >
                                        <span className="gx-link">Delete</span>
                                    </PopConfirm>
                                </span>
                            )
                        }
                    ]}
                />
            </Spin>
        </Card>
    )
}

export default withNoti(Edition);
