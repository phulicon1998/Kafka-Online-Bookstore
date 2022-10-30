import React, {useEffect, useState, useCallback} from "react";
import Fuse from "fuse.js";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

import Breadcrumb from "components/Shop/Bar/Breadcrumb";
import StoreContent from "../Store/StoreContent";

function Search({match}) {
  const [books, setBooks] = useState([]);

  const load = useCallback(async () => {
    try {
      let data = await apiCall(...api.book.getForStore());
      const fuse = new Fuse(data, {
        keys: ["name", "authors.name"]
      })
      let searchData = fuse.search(match.params.search);
      setBooks(searchData);
    } catch (e) {
      console.log(e);
    }
  }, [match.params.search])

  useEffect(() => {
    load();
  }, [load])

  return (
    <div>
      <Breadcrumb
        paths={[
          {path: "/", name: "Home"}
        ]}
        current="Search"
        viewed
      />
      <StoreContent
        books={books}
        title={`Search results for "${match.params.search}"`}
      />
    </div>
  )
}

export default Search;
