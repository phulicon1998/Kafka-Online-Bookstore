import React, {useState, useEffect, useCallback} from "react";
import api from "constants/api";
import {apiCall} from "constants/apiCall";
import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import TitleBar from "components/Shop/Bar/TitleBar";
import {qualityToString} from "constants/qualityControl";
import SectionBar from "components/Shop/Bar/SectionBar";
import {SelectQualityBox} from "components/Shop/Box/QualityBox";

const DEFAULT_BOOKQUALITY = {
  "1": [],
  "2": [],
  "3": [],
  "4": []
}

function PriceRow({price, discount, provider, onClick}) {
  return (
    <div className="quality-price" onClick={onClick}>
      <i className="far fa-id-card"/>
      <div>
        <h3>${(price * (100 - discount) / 100).toFixed(2)} {discount > 0 && <small>-{discount}%</small>} <i
          className="fas fa-star"/> <span>No reviews</span></h3>
        <p>Provided by <b>{provider}</b></p>
      </div>
    </div>
  )
}

function Quality({match, history}) {
  const [qualities, setQualities] = useState(DEFAULT_BOOKQUALITY);
  const [selectQuality, setSelectQuality] = useState("1");
  const [book, setBook] = useState({});

  // This is for page showing edition by quality
  const loadBookQuality = useCallback(async () => {
    const {quality, book_id} = match.params;
    if (quality && book_id) {
      let foundBook = await apiCall(...api.book.getOne(book_id));

      // Arrange edition in each quality
      let qualitiesData = foundBook.edition_id.reduce((acc, next) => {
        if (acc[next.quality]) {
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
    if (quality && book_id) loadBookQuality();
  }, [loadBookQuality, match.params]);

  function generateButton() {
    let qualityName = Object.keys(qualities).map((key) => ({
      name: qualityToString(key),
      number: key,
      min: Math.min(...qualities[key].map(e => (e.price * (100 - e.discount) / 100)))
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
      <div className="container" style={{"marginBottom": "50px"}}>
        <div className="row">
          <div className="col-md-3">
            <TitleBar icon="fas fa-list-ul" title="Edition Information"/>
            <div className="quality-info">
              {book.image && <img src={book.image.url} alt=""/>}
              <h3>{book.name}</h3>
              {
                book.bookcare
                  ? <p><i className="fab fa-bandcamp"/> Bookcare Supported</p>
                  : <p>No bookcare</p>
              }
              <p><b>Page Number:</b> 100 page(s)</p>
              <p><b>Language:</b> {book.language} </p>
              <p><b>ISBN:</b> {book.isbn}</p>
            </div>
          </div>
          <div className="col-md-9">
            <TitleBar icon="fas fa-list-ul" title={`Edition Price In Quality "${qualityToString(selectQuality)}"`}/>
            <div className="quality-nav">
              {
                generateButton().map((q, i) =>
                  <SelectQualityBox
                    qualityName={q.name}
                    selected={selectQuality === q.number}
                    minPrice={q.min}
                    onClick={() => setSelectQuality(q.number)}
                    key={i}
                  />
                )
              }
            </div>
            <SectionBar name="List of editions"/>
            <div className="row">
              {
                qualities[selectQuality] && qualities[selectQuality.toString()].map((b, i) => (
                  <div className="col-md-6">
                    <PriceRow
                      price={b.price}
                      discount={b.discount}
                      provider={b.provider_id.name}
                      onClick={() => history.push(`/store/${b._id}`)}
                      key={i}
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

export default Quality;
