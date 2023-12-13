"use strict"
/* --------- SEARCHING SORTING PAGINATION --------- */

module.exports = (req, res, next) => {

    //? Searching: URL?search[key1]=value1&search[key2]=value2
    const search = req.query?.search || {}
    for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

    //? Sorting: 
    // Mongoose=^8  -> URL?sort[key1]=asc&sort[key2]=desc
    // Mongoose=^<8 -> URL?sort[key1]=1&sort[key2]=-1
    const sort = req.query?.sort || {}

    //! Pagination:
    //? Limit: URL?limit=10
    let limit = Number(req.query?.limit)
    limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)

    //? Page: URL?page=3
    let page = Number(req.query?.page)
    page = (page > 0 ? page : 1) - 1

    //? Skip: URL?skip=30
    let skip = Number(req.query?.skip)
    skip = skip > 0 ? skip : (page * limit)

    //! Run Searching & Sorting & Pagination engine for Model:
    res.getModelList = async function (Model, filters = {}, populate = null) {
        const filtersAndSearch = { ...filters, ...search  }
        return await Model.find(filtersAndSearch).sort(sort).skip(skip).limit(limit).populate(populate)
    }

    //! Details:
    res.getModelListDetails = async function (Model, filters = {}) {
        const filtersAndSearch = { ...filters, ...search }
        const data = await Model.find(filtersAndSearch)
        let details = {
            search,
            sort,
            skip,
            limit,
            page,
            pages: {
                previous: (page > 0 ? page : false),
                current: page + 1,
                next: page + 2,
                total: Math.ceil(data.lengtht / limit)
            },
            totalRecords: data.length,
        }
        details.pages.next = (details.pages.next > details.pages.total ? false : details.pages.next)
        if (details.totalRecords <= limit) details.pages = false
        return details
    }

    next()
}