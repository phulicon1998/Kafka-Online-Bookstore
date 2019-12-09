import React, {useState, useEffect, useCallback} from "react";
import {Card, Table, Spin, Button} from "antd";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import moment from "moment";
import BookForm from "components/App/Form/BookForm";
import {connect} from "react-redux";
import * as permissions from "constants/credentialControl";

function Book({notify, role}) {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const [add, setAdd] = useState(false);

    const load = useCallback(async() => {
        try {
            let data = await apiCall(...api.book.get());
            setBooks(data);
            setLoading(false);
        } catch(err) {
            notify("error", "Data is not loaded");
        }
    }, [notify])

    useEffect(() => {
        load();
    }, [load]);

    function hdSelect(book) {
        setLoading(true);
        // convert the those genre and author object to only id
        let genresForEdit = book.genres.map(v => v._id);
        let authorsForEdit = book.authors.map(v => v._id);

        setBook(prev => ({
            ...prev, ...book,
            image: {
                ...prev.image,
                ...book.image
            },
            publish: {
                at: moment(book.publish.at),
                by: book.publish.by._id
            },
            genre_ids: genresForEdit,
            author_ids: authorsForEdit
        }));
    }

    async function hdCreate(fd) {
        let rsBook = await apiFdCall(...api.book.create(), fd);
        setBooks(prev => [...prev, rsBook]);
        notify("success", "Process is completed", "Adding new book successfully.");
        setAdd(false);
        setLoading(false);
    }

    async function hdEdit(fd) {
        let rsBook = await apiFdCall(...api.book.edit(book._id), fd);
        setBooks(books.map(v => v._id === rsBook._id ? rsBook : v));
        setBook({});
        notify("success", "Process is completed", "Book's information is updated successfully.");
        setLoading(false);
    }

    return (
        <div>
            {
                add && <BookForm
                    notify={notify}
                    loading={loading}
                    setLoading={setLoading}
                    hdSubmit={hdCreate}
                    isProvider={role.isProvider}
                    hdCancel={() => setAdd(false)}
                />
            }
            {
                book._id && <BookForm
                    notify={notify}
                    loading={loading}
                    setLoading={setLoading}
                    book={book}
                    hdSubmit={hdEdit}
                    hdCancel={() => setBook({})}
                />
            }

            {
                !add && !book._id && <Card className="gx-card" title="Interactions">
                    <Button
                        className="btn-primary"
                        onClick={() => setAdd(prev => !prev)}
                    >
                        {add ? "Back to the list" : "New Book"} <i className="icon icon-add"/>
                    </Button>
                </Card>
            }
            {
                !add && !book._id && books.filter(b => !b.reviewed).length > 0 && <BookTable
                    title="Unreviewed Subject Books"
                    data={books.filter(b => !b.reviewed)}
                    hdSelect={hdSelect}
                    loading={loading}
                />
            }
            {
                !add && !book._id && <BookTable
                    title="List of Subject Books"
                    data={books.filter(b => b.reviewed)}
                    hdSelect={hdSelect}
                    loading={loading}
                />
            }
        </div>
    )
}

function mapState({user}) {
    const {isPermit} = permissions;
    return {
        role: {
            isProvider: isPermit(user.data.role)(permissions.PROVIDER_PERMISSION)
        }
    }
}

function BookTable({title, loading, data, hdSelect}) {
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
                        {
                            title: 'Action',
                            key: 'action',
                            width: 100,
                            render: (text, record) => (
                                <span className="gx-link" onClick={hdSelect.bind(this, record)}>
                                    Edit
                                </span>
                            )
                        }
                    ]}
                />
            </Spin>
        </Card>
    )
}

export default connect(mapState, null)(withNoti(Book));
