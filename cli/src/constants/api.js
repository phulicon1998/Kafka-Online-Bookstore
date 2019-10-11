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

export default {
    genre,
    author,
    user
};
