const button = document.getElementById ('button');
const audioElement = document.getElementById('audio')

// Disable/Enable button
function toggleButton (){
    button.disabled =!button.disabled;
}


function tellMe (joke){
    console.log (joke);
    VoiceRSS.speech({
        key: '6fa67adde1cb48b88eed331ce910a951',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false,
      });
}
  
// Get Jokes Api
async function getJokes(){
    let joke = '';

    const apiUrlJokes = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=religious';
  
try{
const resJokes = await fetch(apiUrlJokes);
const data = await resJokes.json();

if (data.setup) {
    joke = `${data.setup} ... ${data.delivery}`
}else {
    joke = data.joke;
}
tellMe (joke)
toggleButton();

}catch(err){
    console.log ('getJokes', err)
}
}

// Event Listener

button.addEventListener ('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
