import React, {useState, useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {apiCall} from "constants/apiCall";
import {qualityToString} from "constants/qualityControl";
import api from "constants/api";
import moment from "moment";

import Book from "containers/Product/Book";
import Loader from "components/Shop/Load/Loader";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import SectionBar from "components/Shop/Bar/SectionBar";
import ReviewSection from "./ReviewSection";

import detailBg from "assets/imgs/detailBg.jpg";

function QualityBox({amount, qualityNum, book_id}) {
    let qualityName = qualityToString(qualityNum);
    return (
        <div className="quality-box">
            <h4>{qualityName}</h4>
            <p>{amount} item(s)</p>
            <button><Link to={`/store/quality/${book_id}/${qualityNum}`}>View</Link></button>
        </div>
    )
}

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
                    <div className="col-md-9">
                        <Loader loading={loading}>
                            <div className="store-detail">
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src={edition.book_id.image.url} alt="" className="img-responsive"/>
                                        <div>
                                            {
                                                edition.images.map((v, i) => (
                                                    <img key={i} alt="" src={v.url} className={`img-responsive ${i === 0 ? "active" : ""}`}/>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <p>{edition.genres.map(v => v.name).toString()}</p>
                                        <h2>{edition.book_id.name}</h2>
                                        <p>The <b>15th</b> place in top of <i>world's best seller book this month</i></p>
                                        <p>
                                            <b>Availibility:</b>
                                            <b> {edition.amount > 5 ? "In stock" : `Only ${edition.amount} left`}</b>
                                        </p>
                                        <p>${(edition.price * (100 - edition.discount) / 100).toFixed(2)} <del>${edition.price.toFixed(2)}</del></p>
                                        <hr/>
                                        <p><b>Author:</b> {edition.authors.map(v => v.name).toString()}</p>
                                        <p><b>Bookcare:</b> {edition.book_id.bookcare.toString()}</p>
                                        <hr/>
                                        <p><b>Quantity & Order</b></p>
                                        <div>
                                            <div>
                                                <button>+</button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                                <button>-</button>
                                            </div>
                                            <button>Add to cart</button>
                                        </div>
                                        <div>
                                            <p><a href="/"><i className="fas fa-heart"/> Add to Wishlist</a></p>
                                            <p><a href="/"><i className="fas fa-clock"/> Buy Used books</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Loader>
                    </div>
                    <div className="col-md-3">
                        <h3>This is designed later</h3>
                        {
                            qualities.map((q, i) => (
                                <QualityBox {...q} book_id={edition.book_id._id} key={i}/>
                            ))
                        }
                    </div>
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
                                <div className="col-md-9">
                                    Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist named Augustus Waters suddenly appears at Cancer Kid Support Group, Hazel's story is about to be completely rewritten.
                                    <br/><br/>
                                    Insightful, bold, irreverent, and raw, The Fault in Our Stars is award-winning author John Green's most ambitious and heartbreaking work yet, brilliantly exploring the funny, thrilling, and tragic business of being alive and in love.
                        		</div>
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
