let kittens = [];
let kitten = {};
loadKittens();
drawKittens(); // NOTE stops page refresh from hiding your kittens
setKittenMood(kitten);
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault(); // NOTE this prevents page fresh upon submission
  let form = event.target;
  let kittenName = form.name.value;
  let currentKitten = kittens.find((kitten) => kitten.name == kittenName);
  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
    // NOTE we pulled all this from the string of properties at bottom
  };

  if (!currentKitten) {
    if (kittens.length >= 3) {
      alert("Too many kittens!");
      form.reset();
      return;
    }
  }

  if (currentKitten) {
    alert("You already own this kitten!");
    form.reset();
    return;
  }

  kittens.push(kitten);
  saveKittens();
  form.reset();
  console.log(currentKitten);
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
// NOTE JSON (JavaScript Object Notation) is a data-interchange format.
 */
function saveKittens() {
  window.localStorage.setItem("Kittens", JSON.stringify(kittens));
  drawKittens();
}
/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("Kittens"));
  if (storedKittens) {
    kittens = storedKittens;
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  kittenCard = document.getElementById("kittens");
  kittenTemplate = "";
  // NOTE template just like how we did in the contacts project
  kittens.forEach((kitten) => {
    // NOTE when using templates you'll need to use backslashes not quotations.
    // NOTE inside you will be pulling from your HTML
    kittenTemplate += `
    <div id="catImage" class="container m-3 pg-2 bg-dark text-light align-items-center text-center kitten ${kitten.mood} card w-50">
  
    <img src="neutralnobg.png" id="neutral" class = "m5 w-50" alt="Moody Kittens">
    

    <div class="d-grid gap-2 d-md-block">
    <br>
  <button class="btn btn-light button" type="button" onclick="pet('${kitten.id}')">Pet</button>
  <button class="btn btn-secondary button" type="button"  onclick="catnip('${kitten.id}')">Catnip</button>
  </div>
    
    <h3>Name: ${kitten.name}<h3>
    <h3>Mood: ${kitten.mood}<h3>
    <h3>Affection: ${kitten.affection}<h3>
    
    <button class="btn-cancel" type="button" onclick="clearKittens('${kitten.id}')"><i class="fa-solid fa-skull"></i>
    </button>
    </div>
  `;
  });
  kittenCard.innerHTML = kittenTemplate;
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find((kitten) => kitten.id === id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id
 */
function pet(id) {
  let currentKitten = findKittenById(id);
  let rNum = Math.random();

  if (currentKitten.affection == 10) {
    document.getElementById("happy").src = "happy.png";
    return;
  }

  if (currentKitten.affection == 0) {
    return;
  }

  if (rNum > 0.5) {
    currentKitten.affection++;
    setKittenMood(currentKitten);
    saveKittens();
  }

  if (rNum < 0.5) {
    currentKitten.affection++;
    setKittenMood(currentKitten);
    saveKittens();
  }
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let currentKitten = findKittenById(id);
  let rNum = Math.random();

  if (currentKitten.affection == 10) {
    currentKitten.affection--;
  }

  if (currentKitten.affection == 0) {
    return;
  }

  if (rNum > 0.5) {
    currentKitten.affection--;
    setKittenMood(currentKitten);
    saveKittens();
  }

  if (rNum < 0.5) {
    currentKitten.affection--;
    setKittenMood(currentKitten);
    saveKittens();
  }
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  document.getElementById("catImage").classList.remove(kitten.mood);
  if (kitten.affection >= 8) {
    kitten.mood = "happy";
    document.getElementById("neutral").src = "happy.png";
  }

  if (kitten.affection == 5) {
    kitten.mood = "tolerant";
  }

  if (kitten.affection <= 3) {
    kitten.mood = "angry";
  }

  if (kitten.affection == 0) {
    kitten.mood = "gone";
  }
  document.getElementById("catImage").classList.add(kitten.mood);
  saveKittens();
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(id) {
  let kittenIndex = kittens.findIndex((kitten) => kitten.id == id);
  kittens.splice(kittenIndex, 1);
  saveKittens();
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").classList.add("hidden");
  console.log("Good Luck, Take it away");
  document.getElementById("nameInput").classList.remove("hidden");
  document.getElementById("kittens").classList.toggle("hidden");
  loadKittens();
  drawKittens();
}
// document.getElementById("Hiiii").remove();
// console.log("GL, HF");

// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens();
