const songsData = [
	{
		sName: "Badass (From Leo)",
		sArtist: "By Anirudh Ravichander",
		sURL: "./media/songs/badass.mp3",
		sImage: "./media/images/badass.jpg",
	},
	{
		sName: "Killers from the northside",
		sArtist: "By Kordhell",
		sURL: "./media/songs/killers.mp3",
		sImage: "./media/images/killer.jpg",
	},
	{
		sName: "Aathma Raama",
		sArtist: "By Brodha V",
		sURL: "./media/songs/AathmaRaama.mp3",
		sImage: "./media/images/aathamaRaama.jpg",
	},
	{
		sName: "Bunny Mafia",
		sArtist: "By Lindsey Leblanc",
		sURL: "./media/songs/BunnyMafia.mp3",
		sImage: "./media/images/bunny-mafia.jpg",
	},
	{
		sName: "Navanda",
		sArtist: "By Audio Picasso",
		sURL: "./media/songs/AudioPicasso.mp3",
		sImage: "./media/images/Navanda.png",
	},
	{
		sName: "Ad Kolima",
		sArtist: "By Demeter, ISHNLV",
		sURL: "./media/songs/AdKolima.mp3",
		sImage: "./media/images/adKolima.jpg",
	},
	{
		sName: "Run It",
		sArtist: "By DJ Snake ",
		sURL: "./media/songs/runIt.mp3",
		sImage: "./media/images/runIt.png",
	},
	{
		sName: "Face Off",
		sArtist: "By Tech N9ne (ft. Dwayne Johnson)",
		sURL: "./media/songs/FaceOff.mp3",
		sImage: "./media/images/faceoff.jpg",
	},
	{
		sName: "Enemy",
		sArtist: "By Imagine Dragons",
		sURL: "./media/songs/ImagineDragons.mp3",
		sImage: "./media/images/Enemy_Imagine_Dragons.jpg",
	},
	{
		sName: "Old Genesis",
		sArtist: "By LJ Beatz (Lemuel J. Sianipar)",
		sURL: "./media/songs/oldGenesis.mp3",
		sImage: "./media/images/oldGenesis.jpg",
	},
	{
		sName: "Intro (Infected)",
		sArtist: "By Sickick",
		sURL: "./media/songs/intro.mp3",
		sImage: "./media/images/Intro (Infected).jpg",
	},
];

// SONG ELEMENTS
let songImage = document.querySelector("#song-img");
let songName = document.querySelector("#song-name");
let songArtist = document.querySelector("#song-artist");
let playList = document.querySelector(".song-list");
let song = document.querySelector("#song");

// BUTTONS ELEMENTs
let playBTN = document.querySelector("#playBTN");
let nextPlayBTN = document.querySelector("#nextPlayBTN");
let backPlayBTN = document.querySelector("#backPlayBTN");
let playlistBTN = document.querySelector("#playlist-title");
let progressBar = document.querySelector("#progress");
let playerBG = document.querySelector(".music-player");

// PLAY/PAUSE
function playPause() {
	if (song.paused) {
		song.play();
		playBTN.classList.replace("fa-play", "fa-pause");
	} else {
		song.pause();
		playBTN.classList.replace("fa-pause", "fa-play");
	}
}

// NEXT SONG
let songIndex = 0;
function playNextSong() {
	songIndex++;

	if (songIndex >= songsData.length) {
		songIndex = 0;
	}
	changeSong(songIndex);
	song.play();
	playBTN.classList.replace("fa-play", "fa-pause");
}

function changeSong(index) {
	let currentSong = songsData[index];
	songImage.src = currentSong.sImage;
	song.src = currentSong.sURL;
	songName.textContent = currentSong.sName;
	songArtist.textContent = currentSong.sArtist;
}

// PREVIUS SONG
function playPreviusSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = 0;
	}
	changeSong(songIndex);
	song.play();
}

// PROGRESS BAR
progressBar.onchange = function () {
	song.play();
	song.currentTime = progressBar.value;
};

if (song.play) {
	setInterval(() => {
		progressBar.value = song.currentTime;
	}, 500);
}

// PLAYLIST TOGGLE
playlistBTN.onclick = () => {
	playList.classList.toggle("toggle-playlist");
};

song.onloadedmetadata = function () {
	progressBar.max = song.duration;
	progressBar.value = song.currentTim;
};

// PLAYLIST
const playlistItems = [];
songsData.forEach((item) => {
	let li = document.createElement("li");

	let div1 = document.createElement("div");
	div1.innerHTML = '<i class="fa-solid fa-play"></i>';

	let div2 = document.createElement("div");

	let p1 = document.createElement("p");
	p1.innerHTML = item.sName;
	let p2 = document.createElement("p");
	p2.innerHTML = item.sArtist;

	li.appendChild(div1);
	li.appendChild(div2).appendChild(p1);
	li.appendChild(div2).appendChild(p2);

	// Add each playlist item to the playlistItems array
	playlistItems.push(li);

	// Add event listener to the created li element
	li.addEventListener("click", function () {
		// Get the index of the clicked li
		const index = playlistItems.indexOf(this);
		changeSong(index);
		playPause();
		song.play();
		playList.classList.remove("toggle-playlist");
	});

	playList.appendChild(li);
});

for (var i = 0; i < playList.length; i++) {
	playList[i].addEventListener("click", function () {
		var index = Array.from(this.parentNode.children).indexOf(this) + 1;
		console.log("Clicked on item number: " + index);
	});
}
