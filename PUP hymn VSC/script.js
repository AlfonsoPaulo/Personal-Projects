const audio = document.getElementById('audioPlayer');
const words = document.querySelectorAll('.word');
const lyricsContainer = document.getElementById('lyricsContainer');

function clearActive() {
    words.forEach(w => w.classList.remove('active'));
}

function scrollToActive(activeWord) {
    if (!lyricsContainer || !activeWord) return;
    // Calculate the container's scroll position to center the active word
    const containerTop = lyricsContainer.getBoundingClientRect().top;
    const wordTop = activeWord.getBoundingClientRect().top;
    const relativeTop = wordTop - containerTop + lyricsContainer.scrollTop;
    const scrollTarget = relativeTop - (lyricsContainer.clientHeight / 2) + (activeWord.clientHeight / 2);
    lyricsContainer.scrollTo({
        top: scrollTarget,
        behavior: 'smooth' // smooth scrolling
    });
}

function updateLyrics() {
    if (!audio) return;
    const currentTime = audio.currentTime;
    let activeIndex = -1;

    for (let i = 0; i < words.length; i++) {
        const start = parseFloat(words[i].dataset.start);
        if (currentTime >= start) {
            activeIndex = i;    
        } else {
            break; 
        }
    }

    clearActive();
    if (activeIndex !== -1) {
        const activeWord = words[activeIndex];
        activeWord.classList.add('active');
        scrollToActive(activeWord); // <-- auto‑scroll to active word
    }
}

audio.addEventListener('timeupdate', updateLyrics);
audio.addEventListener('ended', clearActive);