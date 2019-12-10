import React, {useState, useEffect, useCallback} from "react";
import {apiCall, apiFdCall} from "constants/apiCall";
import api from "constants/api";
import {connect} from "react-redux";
import * as permissions from "constants/credentialControl";
import withNoti from "hocs/App/withNoti";
import moment from "moment";

import BookForm from "components/App/Form/BookForm";
import BookTable from "components/App/Table/BookTable";

function RequestEdition({notify, user, role}) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState({});

    const load = useCallback(async() => {
        try {
            let requestBooks = await apiCall(...api.user.getRequest(user._id));
            setRequests(requestBooks);
        } catch (e) {
            notify("error", "Data is not loaded");
        }
    }, [notify, user._id])

    useEffect(() => {
        load();
    }, [load])

    async function hdCreate(fd) {
        fd.append("requester", user._id);
        let rsBook = await apiFdCall(...api.book.create(), fd);
        setRequests(prev => [...prev, rsBook]);
        notify("success", "Process is completed", "Adding new book successfully.");
        setLoading(false);
    }

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

    async function hdEdit(fd) {
        let rsBook = await apiFdCall(...api.book.edit(book._id), fd);
        setRequests(requests.map(v => v._id === rsBook._id ? rsBook : v));
        setBook({});
        notify("success", "Process is completed", "Book's information is updated successfully.");
        setLoading(false);
    }

    return (
        <div>
            <BookForm
                title="Request New Book"
                notify={notify}
                loading={loading}
                setLoading={setLoading}
                hdSubmit={book._id ? hdCreate : hdEdit}
                hdSelect={hdSelect}
                {...role}
            />
            <BookTable
                title="Requested Book"
                data={requests}
                loading={loading}
                hdSelect={hdSelect}
                {...role}
            />
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

export default connect(mapState, null)(withNoti(RequestEdition));
