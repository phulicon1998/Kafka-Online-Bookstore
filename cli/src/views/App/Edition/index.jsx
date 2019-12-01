import React, {useState, useEffect, useCallback} from "react";
import {Card, Table, Divider, Spin} from "antd";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import PopConfirm from "components/Shop/Pop/PopConfirm";
import {qualityToString} from "constants/qualityControl";
import {connect} from "react-redux";
import * as permissions from "constants/credentialControl";

function Edition({notify, role, user, ...props}) {
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edition, setEdition] = useState({});

    const load = useCallback(async() => {
        try {
            let editionData = await apiCall(...api.edition.get());
            if(role.isProvider) {
                // Display only the edition provided by that provider
                editionData = editionData.filter(edi => edi.provider_id.user_id === user._id);
            }
            setEditions(editionData);
            setLoading(false);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }, [notify, role.isProvider, user._id]);

    useEffect(() => {
        load();
    }, [load])

    function hdEdit(edition){
        setEdition(edition);
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

    function controlCols() {
        let defaultCols = [
            {
                title: "Name",
                dataIndex: 'book_id',
                render: text => <span>{text.name}</span>
            },
            {
                title: "Quality",
                dataIndex: 'quality',
                render: text => <span>{qualityToString(text)}</span>
            },
            {
                title: "Price",
                dataIndex: 'price',
                render: text => <span>${text}</span>
            },
            {
                title: "Discount",
                dataIndex: 'discount',
                render: text => <span>-{text}%</span>
            },
            {
                title: "Amount",
                dataIndex: 'amount',
                render: text => <span>{text} item(s)</span>
            },
            {
                title: "Provider",
                dataIndex: 'provider_id',
                render: text => <span>{text === null ? "Unknown" : text.name}</span>
            },
            {
                title: "Images",
                dataIndex: 'images',
                render: text => <span>Contains {text.length} image(s)</span>
            }
        ]
        return role.isProvider ? defaultCols.filter(col => col.title !== "Provider") : defaultCols;
    }

    return (
        <Card title="Your Uploaded Editions">
            <Spin spinning={loading}>
                <Table
                    className="gx-table-responsive"
                    dataSource={editions}
                    rowKey="_id"
                    columns={[
                        ...controlCols(),
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

function mapState({user}) {
    const {isPermit} = permissions;
    return {
        user: user.data,
        role: {
            isProvider: isPermit(user.data.role)(permissions.PROVIDER_PERMISSION)
        }
    }
}

export default connect(mapState, null)(withNoti(Edition));
