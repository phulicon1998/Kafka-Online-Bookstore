import React, {useState, useEffect, useCallback} from "react";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

const DEFAULT_BOOKQUALITY = {
    "1": [],
    "2": [],
    "3": [],
    "4": []
}

function Quality({match}) {
    const [quality, setQuality] = useState(DEFAULT_BOOKQUALITY);
    const [book, setBook] = useState({});

    // This is for page showing edition by quality
    const loadBookQuality = useCallback(async() => {
        const {quality, book_id} = match.params;
        if(quality && book_id) {
            let foundBook = await apiCall(...api.book.getOne(book_id));
            let editionByThisQuality = foundBook.edition_id.filter(e => e.quality === quality);
            setQuality(prev => ({...prev, [quality]: editionByThisQuality}));
            setBook(foundBook);
        }
    }, [match.params])

    useEffect(() => {
        const {quality, book_id} = match.params;
        if(quality && book_id) loadBookQuality();
    }, [loadBookQuality, match.params]);

    return (
        <div>
            this is the quality page
        </div>
    )
}

export default Quality;
