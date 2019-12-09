import React, {useState, useEffect, useCallback} from "react";
import {Card, Table, Spin} from "antd";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import moment from "moment";
import BookForm from "components/App/Form/BookForm";

function Book({notify}) {
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);

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

    function hdEdit(book) {
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

    return (
        <div>
            {
                book._id && <BookForm
                    notify={notify}
                    loading={loading}
                    setLoading={setLoading}
                    book={book}
                    hdCancel={(defData) => setBook(defData)}
                />
            }
            {
                books.filter(b => !b.reviewed).length > 0 && <Card title="Unreviewed Subject Books">
                    <Spin spinning={loading}>
                        <Table
                            className="gx-table-responsive"
                            dataSource={books.filter(b => !b.reviewed)}
                            rowKey="_id"
                            columns={[
                                {
                                    title: "Book",
                                    dataIndex: 'name',
                                    render: (text, record) => (
                                        <span className="book-tr-name">
                                            <img src={record.image.url} alt="bookimage"/>
                                            <span>
                                                <h4>{text} <i className="fab fa-bandcamp"/></h4>
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
                                            <span className="gx-link" onClick={hdEdit.bind(this, record)}>
                                                Edit
                                            </span>
                                        )
                                    }
                                ]}
                            />
                    </Spin>
                </Card>
            }
            <Card title="List of Subject Books">
                <Spin spinning={loading}>
                    <Table
                        className="gx-table-responsive"
                        dataSource={books.filter(b => b.reviewed)}
                        rowKey="_id"
                        columns={[
                            {
                                title: "Book",
                                dataIndex: 'name',
                                render: (text, record) => (
                                    <span className="book-tr-name">
                                        <img src={record.image.url} alt="bookimage"/>
                                        <span>
                                            <h4>{text} <i className="fab fa-bandcamp"/></h4>
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
                                        <span className="gx-link" onClick={hdEdit.bind(this, record)}>
                                            Edit
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

export default withNoti(Book);
