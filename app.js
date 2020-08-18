const searchInput = document.querySelector('.search-input');
let searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', function(){
    document.getElementById('current-lyrics').innerText = "";
    document.getElementById('songItem').innerText = "";
    console.log(searchInput.value);
    fetch(`https://api.lyrics.ovh/suggest/${searchInput.value}`)
    // fetch(`http://api.deezer.com/search?limit=10&q=${searchInput.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const searchList = data;
        for (let i = 0; i < 10; i++) {
            const artist = searchList.data[i].artist.name;
            const songTitle = searchList.data[i].title;
            const img = searchList.data[i].artist.picture_small;
            console.log(songTitle+" Albym by "+artist);
            // document.getElementById('songTitle').innerText = songTitle;
            // document.getElementById('artist').innerText = artist;
            const songItem = document.getElementById('songItem');

            songItem.innerHTML +=   `<div class="single-result row align-items-center my-3 p-3">
                                            <img class="col-md-3" src="${img}" alt="image not found">
                                            <div class="col-md-6">
                                                <h4 id="songTitle" class="lyrics-name">${songTitle}</h4>
                                                <p class="author lead">Album by <span>${artist}</span></p>
                                            </div>                                           
                                        <div class="col-md-3 text-md-right text-center">
                                            <button onclick="searchLyrics('${artist}','${songTitle}')" class="lyricSearch btn btn-success">Get Lyrics</button>
                                        </div>
                                    </div>`;
        }
    })
})
function searchLyrics(artist, songTitle){
    document.getElementById('ly').style.display = "block";
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data.lyrics);
        if(data.error){
            document.getElementById('current-lyrics').innerText = "Lyrics not found.";
        }
        else{
            const lyric = data.lyrics;
            document.getElementById('current-lyrics').innerText = lyric;     
        }
          
    })
}
