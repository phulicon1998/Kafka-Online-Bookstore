import React, {useState, useEffect, useCallback} from "react";
import {Card, Table, Divider, Spin} from "antd";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";
import PopConfirm from "components/Shop/Pop/PopConfirm";
import {qualityToString} from "constants/qualityControl";
import {connect} from "react-redux";
import * as permissions from "constants/credentialControl";

import AddView from "./Add/AddView";

const DEFAULT_EDITION = {
    book: {},
    edition: {}
}

function Edition({notify, role, user, ...props}) {
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edition, setEdition] = useState(DEFAULT_EDITION);

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

    async function hdEdit(edition){
        let foundEdition = await apiCall(...api.edition.getOne(edition._id));
        setEdition(foundEdition);
    }

    async function editEdition(fd) {
        try {
            let updatedEdition = await apiFdCall(...api.edition.edit(edition._id), fd);
            let newEditions = editions.map(e => {
                if(e._id === updatedEdition._id) {
                    return updatedEdition
                }
                return e;
            })
            setEditions(newEditions);
            setEdition(DEFAULT_EDITION);
            notify("success", "Edition data is updated successfully!", "New edition's information has been saved.");
        } catch (e) {
            notify("error", "Update edition information is not completed!");
        }
        setLoading(false);
    }

    async function hdStop(edition_id) {
        setLoading(true);
        try {
            await apiCall(...api.edition.stop(edition_id));
            let newEditions = editions.map(v => {
                if(v._id === edition_id) {
                    return {
                        ...v,
                        outOfBusiness: !v.outOfBusiness
                    }
                }
                return v;
            });
            setEditions(newEditions);
            notify("success", "Process is completed", "Edition's state is updated successfully.");
        } catch(err) {
            notify("error", "Data is not updated");
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
        <div>
            {edition._id && <AddView
                editEdition={{
                    ...edition,
                    images: edition.images.map(img => ({
                        uid: img.cloud_id,
                        url: img.url
                    }))
                }}
                book={{
                    ...edition.book_id,
                    authors: edition.authors,
                    genres: edition.genres
                }}
                setSelectedBook={() => setEdition(DEFAULT_EDITION)}
                notify={notify}
                hdSubmit={editEdition}
                loading={loading}
                setLoading={setLoading}
            />}
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
                                            title="Are you sure to change this edition's state?"
                                            task={hdStop.bind(this, record._id)}
                                            okText="Sure, change it"
                                            cancelText="Not now"
                                        >
                                            <span className="gx-link">{record.outOfBusiness ? "Enable" : "Disable"}</span>
                                        </PopConfirm>
                                    </span>
                                )
                            }
                        ]}
                    />
                </Spin>
            </Card>
        </div>
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
