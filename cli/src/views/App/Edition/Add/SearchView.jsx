import React from "react";
import {Col, Card, Form, Row} from "antd";
import SearchBar from "components/Shop/Bar/SearchBar";
import Widget from "components/Widget/index";

const FormItem = Form.Item;

const Book = ({book, select}) => (
  <Widget styleName="gx-card-full gx-dot-arrow-hover">
    <div className="gx-user-wid-row">
      <div className="gx-user-wid gx-mr-3">
        <img alt="..." src={book.image.url} className="gx-object-cover"/>
      </div>
      <div className="gx-user-wid-body gx-py-3 gx-pr-3">
        <div className="ant-row-flex">
          <h2 className="h4 gx-mr-1 gx-mb-1">{book.name}</h2>
        </div>
        <p className="gx-mb-1 gx-text-grey gx-fs-sm">{book.authors.map(a => a.name).toString()}<br/> ISBN - {book.isbn}
        </p>
        <div className="gx-dot-arrow" onClick={select}>
          <div className="gx-bg-primary gx-hover-arrow">
            <i className="icon icon-long-arrow-right gx-text-white"/>
          </div>
          <div className="gx-dot">
            <i className="icon icon-ellipse-v gx-text-primary"/>
          </div>
        </div>
      </div>
    </div>
  </Widget>
)

function SearchView({books, setBooks, hdSelect, ...props}) {
  return (
    <div>
      <Card className="gx-card" title="Select Subject Book">
        <Form layout="horizontal">
          <FormItem
            label="Select the subject book"
            labelCol={{xs: 24, sm: 6}}
            wrapperCol={{xs: 24, sm: 10}}
          >
            <SearchBar
              placeholder="Enter the name of any book or author..."
              data={books}
              setData={setBooks}
              keys={["name", "authors"]}
              {...props}
            />
          </FormItem>
        </Form>
      </Card>
      {
        props.disabled || <Row>
          {
            books.map((v, i) => (
              <Col xl={6} lg={12} md={12} sm={12} xs={24} key={i}>
                <Book select={hdSelect.bind(this, v)} book={v}/>
              </Col>
            ))
          }
        </Row>
      }
    </div>
  )
}

export default SearchView;
