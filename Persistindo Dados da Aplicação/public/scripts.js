const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

// Paginação 
// total Pages = 20
// selectPage = 15
// [1, ..., 13, 14, 15, 16, 17, ... 20 ]

function paginate(selectPages, totalPages) {
    
    let totalPages = 20,
    selectPages = 15,
    pages = [],
    oldPage

    for(let currentPage = 0; currentPage <= totalPages; currentPage++) {
    pages.push(currentPage)

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedpage = currentPage <= selectPages + 2
    const pagesBeforeSelectedpage = currentPage >= selectPages + 2

    if(firstAndLastPage || pagesBeforeSelectedpage && pagesAfterSelectedpage) {
        

            if(oldPage && currentPage - oldPage > 2 ) {
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            oldPage = currentPage
        }
    }   

    return pages

}

function  createPagination(pagination) {

const filter = pagination.dataset.filter
const page = +pagination.dataset.page;
const total = +pagination.dataset.total;
const pages = paginate(page, total)

let elements = ""

for (let page of pages) {
    if(String(page).includes("...")){
        elements += `<span>${page}</span>`
    } else {
        if(filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
}


pagination.innerHTML = elements


}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}









