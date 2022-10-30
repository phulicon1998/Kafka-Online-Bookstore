import React, {useState, useEffect, useCallback} from "react";
import {Card, Button} from "antd";
import api from "constants/api";
import {apiCall, apiFdCall} from "constants/apiCall";
import withNoti from "hocs/App/withNoti";
import moment from "moment";
import BookForm from "components/App/Form/BookForm";
import {connect} from "react-redux";
import * as permissions from "constants/credentialControl";
import BookTable from "components/App/Table/BookTable";

function Book({notify, role}) {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const [add, setAdd] = useState(false);

  const load = useCallback(async () => {
    try {
      let data = await apiCall(...api.book.get());
      setBooks(data);
      setLoading(false);
    } catch (err) {
      notify("error", "Data is not loaded");
    }
  }, [notify])

  useEffect(() => {
    load();
  }, [load]);

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

  async function hdCreate(fd) {
    let rsBook = await apiFdCall(...api.book.create(), fd);
    setBooks(prev => [...prev, rsBook]);
    notify("success", "Process is completed", "Adding new book successfully.");
    setAdd(false);
    setLoading(false);
  }

  async function hdEdit(fd) {
    let rsBook = await apiFdCall(...api.book.edit(book._id), fd);
    setBooks(books.map(v => v._id === rsBook._id ? rsBook : v));
    setBook({});
    notify("success", "Process is completed", "Book's information is updated successfully.");
    setLoading(false);
  }

  async function hdApprove(id) {
    setLoading(true);
    let rsBook = await apiCall(...api.book.review(id));
    setBooks(books.map(v => v._id === rsBook._id ? rsBook : v));
    notify("success", "Process is completed", "A new book is approved and ready for work.");
    setLoading(false);
  }

  return (
    <div>
      {
        add && <BookForm
          title="Add New Book"
          notify={notify}
          loading={loading}
          setLoading={setLoading}
          hdSubmit={hdCreate}
          isProvider={role.isProvider}
          hdCancel={() => setAdd(false)}
        />
      }
      {
        book._id && <BookForm
          title="Edit Book Information"
          notify={notify}
          loading={loading}
          setLoading={setLoading}
          book={book}
          hdSubmit={hdEdit}
          hdCancel={() => setBook({})}
        />
      }
      {
        !add && !book._id && <Card className="gx-card" title="Interactions">
          <Button
            className="btn-primary"
            onClick={() => setAdd(prev => !prev)}
          >
            {add ? "Back to the list" : "New Book"} <i className="icon icon-add"/>
          </Button>
        </Card>
      }
      {
        !add && !book._id && books.filter(b => !b.reviewed).length > 0 && <BookTable
          title="Unreviewed Subject Books"
          data={books.filter(b => !b.reviewed)}
          hdSelect={hdSelect}
          loading={loading}
          hdApprove={hdApprove}
        />
      }
      {
        !add && !book._id && <BookTable
          title="List of Subject Books"
          data={books.filter(b => b.reviewed)}
          hdSelect={hdSelect}
          loading={loading}
        />
      }
    </div>
  )
}

function mapState({user}) {
  const {isPermit} = permissions;
  return {
    role: {
      isProvider: isPermit(user.data.role)(permissions.PROVIDER_PERMISSION)
    }
  }
}


export default connect(mapState, null)(withNoti(Book));
