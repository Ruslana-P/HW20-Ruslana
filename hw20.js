const albums = document.getElementById('albums');
const pictures = document.getElementById('pictures');

async function getAllAlbums(url) {
    let response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        console.log ('Error' + response.status);
    }
}

async function getPictures(url) {
    let response = await fetch(url);
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('response.status')
    }
}

function displayPictures(element, array) {
    let lis2 = '';
    for (let el of array) {
        lis2 += `<p><img src='${el.url}' alt='picture'></p>`
    }
    element.innerHTML = lis2;
}

getAllAlbums('http://localhost:3000/albums')
    .then( data => {
        let array = data;
        let lis = '';
        for (let el of array) {
            lis += `<li data-id=${el.id}>${el.title}</li>`
        }
        albums.innerHTML = lis;
    })

getPictures('http://localhost:3000/photos/')
    .then (data => {
        let newArray = data.filter(el => el.albumId === 1);
        displayPictures(pictures, newArray)
    })

albums.addEventListener('click', function(event) {
    let id = event.target.dataset.id;

    getPictures('http://localhost:3000/photos/')
        .then (data => {
                let newArray = data.filter(el => el.albumId === +`${id}`);
                displayPictures(pictures, newArray)
            }
        )
})

