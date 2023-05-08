// explore.js


window.addEventListener('DOMContentLoaded', init);
const voiceSelect = document.getElementById("voice-select");
const synth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}
populateVoiceList();

function init() {
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  const imgPath = "assets/images/"
  const tts = document.getElementById("text-to-speak");
  const btn = document.querySelector("button");
  const img = document.querySelector("img");
  let utterThis;
  let text = ""

  tts.addEventListener("input", function() {
    text = tts.value;
    utterThis = new SpeechSynthesisUtterance(text);
  });
  

  voiceSelect.addEventListener("change", function() {
    const selected = voiceSelect.selectedOptions[0].getAttribute("data-name");

    for(let i = 0; i < voices.length; i++) {
      if (voices[i].name === selected) {
        console.log(voices[i]);
        utterThis.voice = voices[i];
        
      }
    }
  });

  btn.addEventListener("click", function() {
    synth.speak(utterThis);
    
    utterThis.onstart = function() {
      img.src = imgPath + "smiling-open.png";
    };

    utterThis.onend = function() {
      img.src = imgPath + "smiling.png";
    };
  });

}