const genre = {
    get: () => "/api/genres",
    create: () => "/api/genres",
    remove: (genre_id) => `/api/genres/${genre_id}`,
    edit: (genre_id) => `/api/genres/${genre_id}`
}

export default {genre};
