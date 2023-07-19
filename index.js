const displayDiv = document.getElementById('display')
const singleDiv = document.getElementById('single')

const BASE_URL = 'https://fsa-async-await.herokuapp.com/api/guided-practice'
// I included the /api/guided-practice parts since all the api routes share that


// Display all the songs

const fetchSongs = async () => {

    const response = await fetch(`${BASE_URL}/songs`)
    const songs = await response.json()

    return songs
}

async function displaySongs() {
    const songs = await fetchSongs() // lets use the fetch function we wrote to grab all the songs
    console.log(songs) // this displays the songs

    // Using forEach (for every song) we will make a song "card" to display on the page
    songs.forEach(song => {
        const songCard = document.createElement('section')
        const songLength = JSON.stringify(song.length) 
        songCard.innerHTML = `<h1>Title: ${song.title}</h1>
            <h3>Length: ${songLength == 'null' ? 'UNKNOWN': songLength }</h3>
        `

        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', async ()=> {
            // delete
            await deleteSong(song.id)
            songCard.parentElement.removeChild(songCard)

        })

        const selectSong = document.createElement('button')
        selectSong.innerText = 'Select'
        selectSong.addEventListener('click', ()=> {
            // selectSingle Song (needs to be a function)
        })

        songCard.appendChild(deleteButton)
        songCard.appendChild(selectSong)
        displayDiv.appendChild(songCard)
    })
}


const deleteSong = async (id) => {
    const response = await fetch(`${BASE_URL}/songs/${id}`, { method: 'Delete'})
    const data = await response.json
    console.log('Deleted', data)
}


// Display Artists

const fetchArtists = async() => {
    // ... Code here...
}

const displayArtists = async () => {

}

// Display Genre

const fetchGenre = async() => {

}

const displayGenre = async() => {

}


// Form Data
async function addNewSong(song) {
    console.log(song)
    const response = await fetch(`${BASE_URL}/songs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(song),
    });
    const newSong = await response.json();
    return newSong;

}


const form = document.getElementById('addSong')
form.addEventListener('submit', async event => {
    event.preventDefault()
    const title = document.getElementById('title').value;
    const releaseDate = document.getElementById('release-date').value;
    const minutes = Number(document.getElementById('minutes').value);
    const seconds = Number(document.getElementById('seconds').value);
    
    const newSong = {
        title,
        artist_id: 1, // for simplicity I am not adding artist_ids
        genre_id: 1, // for simplicity I am not adding genre_ids
        length: `00:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
        release_date: releaseDate
    };

    await addNewSong(newSong);

    return displaySongs();
})

form.innerHTML = `<label for="title">Title</label>
<input type="text" name="title" id="title" />
<label for='minutes'>Minutes:</label>
<input name='minutes' id='minutes' type='number'/>
<label for='seconds'>Seconds:</label>
<input name='seconds' id='seconds' type='number'/>
<label for="release-date">Release Date</label>
<input type="date" name="release-date" id="release-date" />
<button type="submit">Add Song</button>`


// Select between all three with the nav buttons at the top

const navButtons = document.querySelectorAll('nav > button')
navButtons.forEach(button => {
    button.addEventListener('click', (event) => {

        // Grab the button that was clicked, and more specifically, its inner text
        // We can use the inner text to see what we should render
        const btnText = event.target.innerText

        if (btnText.includes('Song')) {
            displaySongs()
        } else if (btnText.includes('Artists')) {
            displayArtists()
        } else if (btnText.includes('Genre')) {
            displayGenre()
        }
    })
})

