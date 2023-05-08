// expose.js

window.addEventListener('DOMContentLoaded', init);
const con = new JSConfetti();

function init() {
  // TODO
  var audioPath = "assets/audio/";
  var imgPath = "assets/images/"

  // Get all elements for horn sound and image
  const horn = document.getElementById("horn-select");
  const audio = document.querySelector("audio");
  const img = document.querySelector("img");

  /* Add event listener for form horn selector and change the 
   * paths of img and audio files accordingly
   */
  horn.addEventListener("change", function () {
    var imgSrc = horn.value + ".svg"
    var audioSrcrc = horn.value + ".mp3";
    audio.src = audioPath + audioSrcrc;
    img.src = imgPath + imgSrc;
  });

  // Changes for volume slider 
  var iconsPath = "/assets/icons/volume-level-"
  const vol = document.getElementById("volume");
  const volImg = document.getElementById("volume-controls").querySelector("img")
  vol.addEventListener("input", function () {
    var val = vol.value;
    if (val == 0) {
      volImg.src = iconsPath + "0.svg";
    }
    else if (val > 0 && val < 33) {
      volImg.src = iconsPath + "1.svg";
    }
    else if (val >= 33 && val < 67) {
      volImg.src = iconsPath + "2.svg";
    }
    else {
      volImg.src = iconsPath + "3.svg";
    }
    audio.volume = val / vol.max
  });

  /* Get the button element and add on click event listener 
   * to play the sound of correct horn on click 
   */
  const btn = document.querySelector("button");
  btn.addEventListener("click", function () {
    if (horn.value == "party-horn") {
      con.addConfetti({
        confettiRadius: 8,
        confettiNumber: 100,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }
    audio.play();
  });
}