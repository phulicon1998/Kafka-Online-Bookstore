const genre = {
    get: () => "/api/genres",
    create: () => "/api/genres",
    remove: (genre_id) => `/api/genres/${genre_id}`,
    edit: (genre_id) => `/api/genres/${genre_id}`
}

const author = {
    get: () => "/api/authors",
    create: () => "/api/authors",
    remove: (author_id) => `/api/authors/${author_id}`,
    edit: (author_id) => `/api/authors/${author_id}`
}

const user = {
    auth: type => `/api/user/${type}`,
    getOne: user_id => `/api/user/${user_id}`,
    activate: user_id => `/api/user/${user_id}`
}

export default {genre, author, user};
