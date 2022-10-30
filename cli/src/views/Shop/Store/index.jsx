import React, {useState, useEffect, useCallback} from "react";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import bg from "assets/imgs/recommend.jpg";

import evA from "assets/imgs/gA.jpg"
import evB from "assets/imgs/ev-a.jpg";

import StoreContent from "./StoreContent";

function Store() {
  const [books, setBooks] = useState([]);

  const load = useCallback(async () => {
    let bookData = await apiCall(...api.book.getForStore());
    setBooks(bookData);
  }, [])

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="store-detail-header" style={{"backgroundImage": `url(${bg})`}}>
        <div className="container">
          <h1>Book Showncase</h1>
          <p>New, cheap books with quality service.</p>
          <p>Kafka proud to be one of the best service in bringing knowledge closer to people's life.</p>
        </div>
      </div>
      <Breadcrumb
        paths={[
          {path: "/", name: "Home"}
        ]}
        harder={true}
        current="Store"
        viewed
      />
      <div className="event-banner">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div style={{"backgroundImage": `url(${evA})`}}>
                <h2>Upcoming books</h2>
                <p>Calendar of upcoming books on Kafka Stores and pre-order</p>
              </div>
            </div>
            <div className="col-md-7">
              <div style={{"backgroundImage": `url(${evB})`}}>
                <h2>Kafka Recommends</h2>
                <p>Take a look to the list of favourite books from Kafka and choose for yourself</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StoreContent
        books={books}
        title="Book Showcase"
      />
    </div>
  )
}

export default Store;
