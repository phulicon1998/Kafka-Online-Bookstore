import React, {useState, useEffect, useCallback} from "react";
import { Card } from "antd";
import withNoti from "hocs/App/withNoti";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";

import SearchView from "./SearchView";
import AddView from "./AddView";

function CreateEdition({notify, ...props}) {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState({});

    const load = useCallback(async() => {
        try {
            let bookData = await apiCall(...api.book.get());
            console.log(bookData);
            setBooks(bookData);
        } catch (e) {
            return notify("error", "Data is not loaded");
        }
    }, [notify]);

    useEffect(() => {
        load();
    }, [load]);

    function hdSelect(book) {
        setSelectedBook(book);
    }

    async function addEdition(fd) {
        try {
            await apiFdCall(...api.edition.create(), fd);
            setSelectedBook({});
            notify("success", "Data is submitted successfully!", "New edition's information has been saved.");
        } catch(e) {
            notify("error", "Data is not submitted");
        }
    }

    return (
        <div>
            {
                !selectedBook._id && <SearchView
                    books={books}
                    setBooks={setBooks}
                    disabled={!!selectedBook._id}
                    hdSelect={hdSelect}
                />
            }
            {
                books.length === 0 && <Card>There is no subject book found. <u>Create one here.</u></Card>
            }
            {
                selectedBook._id && <AddView
                    selectedBook={selectedBook}
                    setSelectedBook={setSelectedBook}
                    notify={notify}
                    hdSubmit={addEdition}
                />
            }
        </div>
    )
}

export default withNoti(CreateEdition);
