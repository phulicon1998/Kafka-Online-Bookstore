const genre = {
    get: () => ["get", "/api/genres"],
    create: () => ["post", "/api/genres"],
    remove: genre_id => ["delete", `/api/genres/${genre_id}`],
    edit: genre_id => ["put", `/api/genres/${genre_id}`]
}

const author = {
    get: () => ["get", "/api/authors"],
    create: () => ["post", "/api/authors"],
    remove: author_id => ["delete", `/api/authors/${author_id}`],
    edit: author_id => ["put", `/api/authors/${author_id}`]
}

const user = {
    auth: type => ["post", `/api/user/${type}`],
    getOne: user_id => ["get", `/api/user/${user_id}`],
    activate: user_id => ["put", `/api/user/${user_id}/activate`]
}

const publisher = {
    get: () => ["get", "/api/publishers"],
    create: () => ["post", "/api/publishers"],
    remove: publisher_id => ["delete", `/api/publishers/${publisher_id}`],
    edit: publisher_id => ["put", `/api/publishers/${publisher_id}`]
}

const book = {
    get: () => ["get", "/api/books"],
    create: () => ["post", "/api/books"],
    remove: book_id => ["delete", `/api/books/${book_id}`],
    edit: book_id => ["put", `/api/books/${book_id}`]
}

const provider = {
    create: user_id => ["post", `/api/user/${user_id}/providers`],
    get: () => ["get", `/api/providers`],
    remove: provider_id => ["delete", `/api/providers/${provider_id}`]
}

const edition = {
    get: () => ["get", "/api/editions"],
    create: () => ["post", `/api/editions`],
    remove: edition_id => ["delete", `/api/editions/${edition_id}`]
}

export default {
    genre,
    author,
    user,
    publisher,
    book,
    provider,
    edition
};
