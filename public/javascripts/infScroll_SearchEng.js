const tripList = document.getElementById('tripLists');
const searchBar = document.getElementById('searchBar');
const toursite = Object.entries(toursites)[0][1]

let i = 0;
let htmlString = "";



function addHTML(sites) {
    let img = "https://res.cloudinary.com/samfisher/image/upload/v1637596302/TripSpot/indiaflag_g0crqd.jpg";
    if (sites.images.length) img = String(sites.images[0].url);
    return `<div class="card mb-1">
                <div class="row">
                <div class="col-md-4">
                    <img class="img-fluid" src=${img} alt="">
                </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title" id="data-title">
                                ${sites.title}
                            </h5>
                            <p class="card-text" id="data-description">
                                ${sites.description}
                            </p>
                            <div class="mb-3" style="position: absolute; bottom: 0;" id="in-body">
                                <div class="mb-2">
                                    <small class="text-muted">
                                    ${sites.location}
                                    </small>
                                </div>
                                <a class="btn btn-primary" href="/toursite/${sites._id}">Expand</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
}


let arrOfToursite = [];


searchBar.addEventListener('keyup', (e) => {                                              //Function for searching 
    const searchString = e.target.value.toLowerCase();
    arrOfToursite = toursite;

    const filteredTripList = arrOfToursite.filter((currsite) => {
        return (
            currsite.title.toLowerCase().includes(searchString) ||
            currsite.location.toLowerCase().includes(searchString)
        );
    });
    htmlString = "";
    i = 0;
    arrOfToursite = filteredTripList;
    displayTripspots(filteredTripList);
});


window.addEventListener('scroll', () => {                                                  //Function for infinte scroll
    //console.log(window.scrollY + window.innerHeight, document.documentElement.scrollHeight)
    if (window.scrollY + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
        setTimeout(() => {
            displayTripspots(arrOfToursite, 4)
        }, 1500)
    }
})



const loadTripspots = () => {
    arrOfToursite = toursite;
    displayTripspots(arrOfToursite);
}

const displayTripspots = (filteredTripList, numToursite = 7) => {
    htmlString += filteredTripList.slice(i, i + numToursite)
        .map((currsites) => {
            return addHTML(currsites);
        })
        .join('');
    i += numToursite;
    tripList.innerHTML = htmlString;
};

loadTripspots();
