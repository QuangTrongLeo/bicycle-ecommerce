export function paginateData(data, page = 1, limit = 5, sortFn = null) {
    let sortedData = [...data];

    if (typeof sortFn === 'function') {
        sortedData.sort(sortFn);
    }

    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;
    const paginatedData = sortedData.slice(startIndex, startIndex + limit);

    return { paginatedData, totalPages };
}
