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

  const load = useCallback(async () => {
    try {
      let editionData = await apiCall(...api.edition.get());
      if (role.isProvider) {
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

  async function hdEdit(edition) {
    let foundEdition = await apiCall(...api.edition.getOne(edition._id));
    setEdition(foundEdition);
  }

  async function editEdition(fd) {
    try {
      let updatedEdition = await apiFdCall(...api.edition.edit(edition._id), fd);
      let newEditions = editions.map(e => {
        if (e._id === updatedEdition._id) {
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
        if (v._id === edition_id) {
          return {
            ...v,
            outOfBusiness: !v.outOfBusiness
          }
        }
        return v;
      });
      setEditions(newEditions);
      notify("success", "Process is completed", "Edition's state is updated successfully.");
    } catch (err) {
      notify("error", "Data is not updated");
    }
    setLoading(false);
  }

  function controlCols() {
    let defaultCols = [
      {
        title: "Name",
        dataIndex: 'book_id',
        render: (text, rec) => <span className="edition-table-name">
                    {text.name} {rec.fastDelivery && <i className="fas fa-rocket"/>}
                </span>
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
        render: text => <span className="edition-table-image">
                    {text.map((v, i) => <img src={v.url} alt="" key={i}/>)}
                </span>
      }
    ]
    return role.isProvider ? defaultCols.filter(col => col.title !== "Provider") : defaultCols;
  }

  async function hdRemove(edition_id) {
    try {
      await apiCall(...api.edition.remove(edition_id));
      let newEditions = editions.filter(e => e._id !== edition_id);
      setEditions(newEditions);
      notify("success", "Process is completed", "Edition is removed successfully.");
    } catch (e) {
      return notify("error", "Process is not completed");
    }
  }

  async function hdResubmit(edition_id) {
    try {
      let foundEdition = await apiCall(...api.edition.getOne(edition_id));
      setEdition({...foundEdition, verifyStatus: 0});
    } catch (e) {
      return notify("error", "Process is not completed");
    }
  }

  async function hdVerify(edition_id, verifyStatus) {
    try {
      let rs = await apiCall(...api.edition.verify(edition_id), {verifyStatus});
      let newEditions = editions.map(v => {
        if (v._id === edition_id) {
          return {
            ...v,
            verifyStatus: rs.verifyStatus
          }
        }
        return v;
      });
      setEditions(newEditions);
      notify("success", "Process is completed", "Edition's verify status is updated successfully.");
    } catch (e) {
      return notify("error", "Process is not completed");
    }
  }

  return (
    <div>
      {
        edition._id && <AddView
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
        />
      }
      {
        edition._id || <EditionTable
          title="Unverified Editions"
          dataSource={
            role.isSaleStaff
              ? editions.filter(e => e.verifyStatus === 0)
              : editions.filter(e => e.verifyStatus !== 1)
          }
          loading={loading}
          hdEdit={hdEdit}
          hdStop={hdStop}
          hdRemove={hdRemove}
          controlCols={controlCols}
          hdResubmit={hdResubmit}
          hdVerify={hdVerify}
          {...role}
        />
      }
      {
        edition._id || <EditionTable
          title="Uploaded Editions"
          dataSource={editions.filter(e => e.verifyStatus === 1)}
          loading={loading}
          hdEdit={hdEdit}
          hdStop={hdStop}
          hdRemove={hdRemove}
          hdResubmit={hdResubmit}
          controlCols={controlCols}
          hdVerify={hdVerify}
          {...role}
        />
      }
    </div>
  )
}

function EditionTable({
                        title,
                        dataSource,
                        loading,
                        controlCols,
                        hdEdit,
                        hdStop,
                        isSaleStaff,
                        isProvider,
                        hdRemove,
                        hdResubmit,
                        hdVerify
                      }) {
  return dataSource.length === 0 ? null : (
    <Card title={title}>
      <Spin spinning={loading}>
        <Table
          className="gx-table-responsive"
          dataSource={dataSource}
          rowKey="_id"
          columns={[
            ...controlCols(),
            {
              title: 'Action',
              key: 'action',
              width: 100,
              render: (text, record) => (
                <span className="edition-table-action">
                                    {
                                      record.verifyStatus === 1 && <span
                                        className="gx-link"
                                        onClick={hdEdit.bind(this, record)}
                                      >
                                            Edit
                                            <Divider type="vertical"/>
                                        </span>
                                    }
                  {
                    record.verifyStatus === 1 && <PopConfirm
                      title="Are you sure to change this edition's state?"
                      task={hdStop.bind(this, record._id)}
                      okText="Sure, change it"
                      cancelText="Not now"
                    >
                      <span className="gx-link">{record.outOfBusiness ? "Enable" : "Disable"}</span>
                    </PopConfirm>
                  }
                  {
                    record.verifyStatus === 0 && isProvider && <span>Waiting</span>
                  }
                  {
                    record.verifyStatus === 2 && isProvider && <span
                      className="gx-link"
                      onClick={hdResubmit.bind(this, record._id)}
                    >
                                            Edit & Resubmit
                                            <Divider type="vertical"/>
                                        </span>
                  }
                  {
                    record.verifyStatus === 0 && isSaleStaff && <PopConfirm
                      title="Are you sure to accept this edition?"
                      task={hdVerify.bind(this, record._id, 1)}
                      okText="Sure, accept it"
                      cancelText="Not now"
                    >
                      <span className="gx-link">Accept<Divider type="vertical"/></span>
                    </PopConfirm>
                  }
                  {
                    record.verifyStatus === 0 && isSaleStaff && <PopConfirm
                      title="Are you sure to deny this edition?"
                      task={hdVerify.bind(this, record._id, 2)}
                      okText="Sure, deny it"
                      cancelText="Not now"
                    >
                      <span className="gx-link">Deny<Divider type="vertical"/></span>
                    </PopConfirm>
                  }
                  {
                    record.verifyStatus === 2 && isProvider && <PopConfirm
                      title="Are you sure to remove this edition?"
                      task={hdRemove.bind(this, record._id)}
                      okText="Sure, remove it"
                      cancelText="Not now"
                    >
                      <span className="gx-link">Remove</span>
                    </PopConfirm>
                  }
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
      isProvider: isPermit(user.data.role)(permissions.PROVIDER_PERMISSION),
      isSaleStaff: isPermit(user.data.role)(permissions.SALESTAFF_PERMISSION)
    }
  }
}

export default connect(mapState, null)(withNoti(Edition));
