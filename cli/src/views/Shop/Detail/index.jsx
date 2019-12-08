import React, {useState, useEffect, useCallback} from "react";
import {connect} from "react-redux";
import {apiCall} from "constants/apiCall";
import api from "constants/api";
import moment from "moment";
import parse from "html-react-parser";

import Book from "containers/Product/Book";
// import Loader from "components/Shop/Load/Loader";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import SectionBar from "components/Shop/Bar/SectionBar";
import ReviewSection from "./ReviewSection";
import BookContent from "./BookContent";

import detailBg from "assets/imgs/detailBg.jpg";

function Detail({match, user, ...props}) {
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [edition, setEdition] = useState({
        "_id": "",
        "book_id": {
            bookcare: false,
            name: "...",
            image: {
                url: ""
            },
            publish: {
                at: "",
                by: ""
            },
            isbn: ""
        },
        price: 0,
        discount: 0,
        genres: [],
        authors: [],
        images: []
    })
    const [qualities, setQualities] = useState([]);
    const [sameAuthorBooks, setSameAuthorBooks] = useState([]);
    const [sameGenreBooks, setSameGenreBooks] = useState([]);

    const load = useCallback(async() => {
        const {edition_id} = match.params;
        let retrievedEdition = await apiCall(...api.edition.getOne(edition_id));
        const {review_id, ...editionData} = retrievedEdition;

        let retrievedBook = await apiCall(...api.book.getOne(retrievedEdition.book_id._id));

        // Get all the quality the book has
        let allBookQualities = retrievedBook.edition_id.map(e => e.quality);
        let uniqueBookQualities = [...(new Set(allBookQualities))];
        let bookByQualities = uniqueBookQualities.map(q => ({
            qualityNum: q,
            amount: retrievedBook.edition_id.filter(b => b.quality === q).length
        }))
        setQualities(bookByQualities);

        // Get book in the same genre and same author
        let books = await apiCall(...api.book.getForStore());
        setSameAuthorBooks(books.slice(0, 4));
        setSameGenreBooks(books.slice(4, 8));

        setEdition(editionData);
        setReviews(review_id.reverse());
        setLoading(false);
    }, [match.params]);

    useEffect(() => {
        load();
    }, [load]);

    return (
        <div>
            <div className="store-detail-header" style={{"backgroundImage": `url(${detailBg})`}}>
                <div className="container">
                    <h1>Book Detail</h1>
                    <p>New, cheap books with quality service.</p>
                    <p>Kafka proud to be one of the best service in bringing knowledge closer to people's life.</p>
                </div>
            </div>
            <Breadcrumb
                paths={[
                    {path: "/", name: "Home"},
                    {path: "/store", name: "Store"}
                ]}
                current={edition.book_id.name}
                harder={true}
                viewed
            />
            <div className="container">
                <div className="row" style={{"marginTop": "40px"}}>
                    <BookContent
                        onChange={(e) => setQuantity(e.target.value)}
                        edition={edition}
                        quantity={quantity}
                    />
                    {/* <div className="col-md-3">
                        <h3>This is designed later</h3>
                        {
                            qualities.map((q, i) => (
                                <QualityBox {...q} book_id={edition.book_id._id} key={i}/>
                            ))
                        }
                    </div> */}
                    <div className="col-md-12">
                        <SectionBar name="Other books of this author" />
                        <div className="row">
                            {
                                sameAuthorBooks.map((v, i) => (
                                    <div className="col-md-3" key={i}>
                                        <Book
                                            img={v.image.url}
                                            name={v.name}
                                            author={v.authors.map(v => v.name).toString()}
                                            price={v.bestDeal.price}
                                            discount={v.bestDeal.discount}
                                            editionId={v.bestDeal._id}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        <SectionBar name="Book Description" />
                        <div className="store-detail-description">
                            <div className="row">
                                <div className="col-md-9">{parse(`${edition.desc}`)}</div>
                        		<div className="col-md-3">
                        			<p><b>Publish Date:</b> {moment(edition.book_id.publish.at).format("DD/MM/YYYY")}</p>
                        			<p><b>Publisher:</b> {edition.book_id.publish.by.name} </p>
                        			<p><b>Page Number:</b>100</p>
                        			<p><b>Language:</b> {edition.book_id.language} </p>
                        			<p><b>ISBN:</b> {edition.book_id.isbn}</p>
                        		</div>
                            </div>
                        </div>
                        <ReviewSection
                            user={user}
                            edition={edition}
                            reviews={reviews}
                            setReviews={setReviews}
                        />
                        <SectionBar name="Other books in this genre" />
                        <div className="row">
                            {
                                sameGenreBooks.map((v, i) => (
                                    <div className="col-md-3" key={i}>
                                        <Book
                                            img={v.image.url}
                                            name={v.name}
                                            author={v.authors.map(v => v.name).toString()}
                                            price={v.bestDeal.price}
                                            discount={v.bestDeal.discount}
                                            editionId={v.bestDeal._id}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapState({user}) {
    return {user: user.data}
}

export default connect(mapState, null)(Detail);
