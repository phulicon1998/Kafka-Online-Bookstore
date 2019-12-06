import React, {useState, useEffect, useCallback} from "react";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import Sidebar from "components/Shop/Bar/Sidebar";
import TitleBar from "components/Shop/Bar/TitleBar";
import {qualityToString} from "constants/qualityControl";

const DEFAULT_BOOKQUALITY = {
    "1": [],
    "2": [],
    "3": [],
    "4": []
}

function PriceRow({price, discount, provider}) {
    return (
        <div>
            <h3>{price * (100 - discount) / 100} <small>-{discount}%</small></h3>
            <p>Provider - {provider}</p>
        </div>
    )
}

function Button({name, selected, onClick}) {
    return (
        <button onClick={onClick}>
            {name} - {selected ? "Selected" : ""}
        </button>
    )
}

function Quality({match}) {
    const [qualities, setQualities] = useState(DEFAULT_BOOKQUALITY);
    const [selectQuality, setSelectQuality] = useState("1");
    const [book, setBook] = useState({});

    // This is for page showing edition by quality
    const loadBookQuality = useCallback(async() => {
        const {quality, book_id} = match.params;
        if(quality && book_id) {
            let foundBook = await apiCall(...api.book.getOne(book_id));

            // Arrange edition in each quality
            let qualitiesData = foundBook.edition_id.reduce((acc, next) => {
                if(acc[next.quality]) {
                    acc[(next.quality).toString()].push(next);
                } else {
                    acc[(next.quality).toString()] = [next];
                }
                return acc;
            }, {})

            setQualities(qualitiesData);
            setSelectQuality(quality);
            setBook(foundBook);
        }
    }, [match.params]);

    useEffect(() => {
        const {quality, book_id} = match.params;
        if(quality && book_id) loadBookQuality();
    }, [loadBookQuality, match.params]);

    function generateButton() {
        let qualityName = Object.keys(qualities).map((key) => ({
            name: qualityToString(key),
            number: key
        }))
        return qualityName;
    }

    return (
        <div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"},
                    {path: `/store`, name: "Store"}
                ]}
                current="Quality"
                viewed
            />
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h1>All the price in quality <b>{qualityToString(selectQuality)}</b> of {book.name}</h1>
                        {
                            generateButton().map((q, i) =>
                                <Button
                                    {...q}
                                    selected={selectQuality === q.number}
                                    onClick={() => setSelectQuality(q.number)}
                                    key={i}
                                />
                            )
                        }
                        <TitleBar icon="fas fa-list-ul" title="Edition Price"/>
                        {
                            qualities[selectQuality] && qualities[selectQuality.toString()].map((b, i) => (
                                <PriceRow
                                    price={b.price}
                                    discount={b.discount}
                                    provider={b.provider_id.name}
                                    key={i}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Quality;
