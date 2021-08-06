const form  = document.getElementById('form');
const search  = document.getElementById('search');
const result  = document.getElementById('result');
const more  = document.getElementById('more');

const apiUrl = 'https://api.lyrics.ovh';

// event listeners
form.addEventListener('submit', e =>{
    e.preventDefault();
    const searchTerm = search.value.trim();
    if(!searchTerm){
        alert('please type in a something ');
    }else{
        searchSongs(searchTerm);
    }
})
// search by song or artist function
async function searchSongs(term){
    const res = await fetch(`${apiUrl}/suggest/${term}`);
    const data = await res.json();
    showData(data);
}
// Show song and artist in DOM
// function showData(data){
//    let output
// }