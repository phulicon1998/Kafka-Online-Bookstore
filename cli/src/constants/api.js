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
    generate: () => ["post", `/api/user/generate`],
    getOne: user_id => ["get", `/api/user/${user_id}`],
    get: () => ["get", `/api/user`],
    social: () => ["post", `/api/user/social`],
    activate: user_id => ["put", `/api/user/${user_id}/activate`],
    changePassword: user_id => ["post", `/api/user/${user_id}/password`]
}

const publisher = {
    get: () => ["get", "/api/publishers"],
    create: () => ["post", "/api/publishers"],
    remove: publisher_id => ["delete", `/api/publishers/${publisher_id}`],
    edit: publisher_id => ["put", `/api/publishers/${publisher_id}`]
}

const book = {
    get: () => ["get", "/api/books"],
    getOne: book_id => ["get", `/api/books/${book_id}`],
    create: () => ["post", "/api/books"],
    remove: book_id => ["delete", `/api/books/${book_id}`],
    edit: book_id => ["put", `/api/books/${book_id}`],
    getForStore: () => ["get", `/api/books/store`]
}

const provider = {
    create: user_id => ["post", `/api/user/${user_id}/providers`],
    get: () => ["get", `/api/providers`],
    remove: provider_id => ["delete", `/api/providers/${provider_id}`]
}

const edition = {
    get: () => ["get", "/api/editions"],
    getOne: edition_id => ["get", `/api/editions/${edition_id}`],
    getInCart: () => ["post", "/api/editions/cart"],
    create: () => ["post", `/api/editions`],
    stop: edition_id => ["put", `/api/editions/${edition_id}/stop`],
    edit: edition_id => ["put", `/api/editions/${edition_id}`],
    compare: edition_id => ["post", `/api/editions/${edition_id}/compare`]
}

const shipment = {
    create: user_id => ["post", `/api/user/${user_id}/shipments`],
    get: user_id => ["get", `/api/user/${user_id}/shipments`],
    remove: (user_id, shipment_id) => ["delete", `/api/user/${user_id}/shipments/${shipment_id}`]
}

const order = {
    create: user_id => ["post", `/api/user/${user_id}/orders`],
    getByUser: user_id => ["get", `/api/user/${user_id}/orders`],
    get: () => ["get", `/api/orders`],
    getOne: order_id => ["get", `/api/orders/${order_id}`],
    edit: order_id => ["put", `/api/orders/${order_id}`]
}

const review = {
    create: edition_id => ["post", `/api/editions/${edition_id}/reviews`],
    get: edition_id => ["get", `/api/editions/${edition_id}/reviews`],
    remove: (edition_id, review_id) => ["delete", `/api/editions/${edition_id}/reviews/${review_id}`]
}

const message = {
    getOne: user_id => ["get", `/api/user/${user_id}/messages`],
    get: () => ["get", `/api/messages/all`],
    create: user_id => ["post", `/api/user/${user_id}/messages`]
}

export default {
    genre, author, user,
    publisher, book, provider,
    shipment, order, edition,
    review, message
};
