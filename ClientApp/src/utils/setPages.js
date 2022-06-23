export const setPages = (array, perPage) => {
    let pages = Math.ceil(array.length / perPage)
    return pages
}