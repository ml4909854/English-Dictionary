const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title")
const meaning = document.getElementById("meaning")
const audio = document.getElementById("audio")

async function fetchApi(word) {
  try {
    infoText.innerHTML = `Searching a meaning of "${word}"`;
    meaningContainer.style.display = "none";
    const Url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(Url);
    const data = await result.json();
if(data.title){
    title.innerHTML = word
    infoText.style.display = "none"
    meaningContainer.style.display = "block";
    meaning.innerHTML = "N/A"
    audio.style.display = "none"
}
else{
    infoText.style.display = "none";
    meaningContainer.style.display = "block";
    audio.style.display = "inline-flex"
    title.innerHTML = data[0].word
    meaning.innerHTML = data[0].meanings[0].definitions[0].definition
    audio.src = data[0].phonetics[0].audio
}

   
  } catch (error) {
    console.log(error, "failed to fetch");
    infoText.innerHTML = "An error happened , try again later"
  }
}

input.addEventListener("keyup", function (e) {
  if (e.target.value && e.key === "Enter") {
    fetchApi(e.target.value);
  }
});
