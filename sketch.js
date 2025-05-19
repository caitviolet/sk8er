let currentScene = 'title'; // title, autumntl, autumnbg, loading, wintertl, winterbg, loading2, summertl, summerbg, endtitle, bgMusic

// Images
let startpage, startbutton;
let autumntl, autumnbg;
let loadingscr;
let wintertl, winterbg;
let loadingscr2;
let summertl, summerbg;
let endtitle, endbutton;

let skatingText = "";
let skatingActive = false;
let skatingStartTime = 0;
const skatingDuration = 10000; // 10 seconds

// Autumn sequence assets
let oopsImg, ouchImg;
let showOops = false;
let oopsStartTime = 0;
const oopsDuration = 1000; // 1 second jitter
const oopsInterval = 3000; // 3 sec between oops

// Winter sequence assets
let goodImg, okayImg;
let showGood = false;
let goodStartTime = 0;
let winterSceneStartTime = 0; // Total winter jitter duration timer
const goodDuration = 1000; // 1 sec jitter
const goodInterval = 3000; // 3 sec between
const winterJitterTotalDuration = skatingDuration; // same 10 sec for winter jitter

// Summer sequence assets
let insaneImg, insanepopImg;
let showInsane = false;
let insaneStartTime = 0;
let summerSceneStartTime = 0; // Total summer jitter duration timer
const insaneDuration = 1000;
const insaneInterval = 3000;
const summerJitterTotalDuration = skatingDuration; // same 10 sec for summer jitter

function preload() {
  // Load all images here
  startpage = loadImage('startpage.jpg');
  startbutton = loadImage('startbutton.png');

  autumntl = loadImage('autumntl.jpg');
  autumnbg = loadImage('autumnbg.jpg');

  loadingscr = loadImage('loadingscr.jpg');
  loadingscr2 = loadImage('loadingscr.jpg'); // reuse same image for second loading screen

  wintertl = loadImage('wintertl.png');
  winterbg = loadImage('winterbg.jpg');

  summertl = loadImage('summertl.jpg');
  summerbg = loadImage('summerbg.jpg');

  endtitle = loadImage('endtitle.jpg');
  endbutton = loadImage('endbutton.png');

  oopsImg = loadImage('oops.png');
  ouchImg = loadImage('ouchpop.png');

  goodImg = loadImage('good.png');
  okayImg = loadImage('okpop.png');

  insaneImg = loadImage('insane.png');
  insanepopImg = loadImage('insanepop.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255);

  bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.3;  // Adjust volume (0.0 to 1.0)
bgMusic.play().catch(() => {
  // autoplay might be blocked, so wait for user interaction
  console.log("Music autoplay blocked, waiting for user interaction.");
});


  currentScene = 'title';
}

function draw() {
  background(0);

  switch(currentScene) {
    case 'title':
      drawTitlePage();
      break;

    case 'autumntl':
      drawAutumnTitle();
      break;

    case 'autumnbg':
      drawAutumnBackground();
      break;

    case 'loading':
      drawLoadingScreen();
      break;

    case 'wintertl':
      drawWinterTitle();
      break;

    case 'winterbg':
      drawWinterBackground();
      break;

    case 'loading2':
      drawLoadingScreen2();
      break;

    case 'summertl':
      drawSummerTitle();
      break;

    case 'summerbg':
      drawSummerBackground();
      break;

    case 'endtitle':
      drawEndTitle();
      break;
  }
}

// --- SCENE FUNCTIONS ---

function drawTitlePage() {
  image(startpage, width/2, height/2, width, height);
  image(startbutton, width/2, height * 0.85);
}

function drawAutumnTitle() {
  image(autumntl, width/2, height/2, width, height);
}

function drawAutumnBackground() {
  image(autumnbg, width/2, height/2, width, height);

  if (!skatingActive) {
    skatingActive = true;
    skatingStartTime = millis();
    showOops = false;
  }

  let elapsed = millis() - skatingStartTime;

  if (elapsed < skatingDuration) {
    fill(255);
    text(skatingText, width/2, height/4);

    if (!showOops && elapsed > 1000) {
      showOops = true;
      oopsStartTime = millis();
    }

    if (showOops) {
      let oopsElapsed = millis() - oopsStartTime;

      if (oopsElapsed < oopsDuration) {
        let jitterX = random(-3, 3);
        let jitterY = random(-3, 3);
        image(oopsImg, width/2 + jitterX, height/2 + jitterY);
        image(ouchImg, width/2 + 50 + jitterX, height/2 - 50 + jitterY);
      } else if (oopsElapsed < oopsDuration + oopsInterval) {
        // hide
      } else {
        oopsStartTime = millis();
      }
    }
  } else {
    currentScene = 'loading';
    skatingActive = false;
  }
}

function drawLoadingScreen() {
  image(loadingscr, width/2, height/2, width, height);
  fill(255);
  textSize(64);
  text('LATER', width/2, height/2);
}

function drawWinterTitle() {
  image(wintertl, width/2, height/2, width, height);
}

function drawWinterBackground() {
  image(winterbg, width / 2, height / 2, width, height);

  if (!showGood) {
    showGood = true;
    goodStartTime = millis();
    winterSceneStartTime = millis();
  }

  let jitterElapsed = millis() - goodStartTime;
  let totalElapsed = millis() - winterSceneStartTime;

  if (jitterElapsed < goodDuration) {
    let jitterX = random(-3, 3);
    let jitterY = random(-3, 3);
    image(goodImg, width / 2 + jitterX, height / 2 + jitterY);
    image(okayImg, width / 2 + 50 + jitterX, height / 2 - 50 + jitterY);
  } else if (jitterElapsed < goodDuration + goodInterval) {
    // hide jitter images
  } else {
    goodStartTime = millis();
  }

  if (totalElapsed > winterJitterTotalDuration) {
    currentScene = 'loading2';
    showGood = false;
  }
}

function drawLoadingScreen2() {
  image(loadingscr2, width/2, height/2, width, height);
  fill(255);
  textSize(64);
  text('LATER', width/2, height/2);
}

function drawSummerTitle() {
  image(summertl, width/2, height/2, width, height);
}

function drawSummerBackground() {
  image(summerbg, width / 2, height / 2, width, height);

  if (!showInsane) {
    showInsane = true;
    insaneStartTime = millis();
    summerSceneStartTime = millis();
  }

  let jitterElapsed = millis() - insaneStartTime;
  let totalElapsed = millis() - summerSceneStartTime;

  if (jitterElapsed < insaneDuration) {
    let jitterX = random(-3, 3);
    let jitterY = random(-3, 3);
    image(insaneImg, width / 2 + jitterX, height / 2 + jitterY);
    image(insanepopImg, width / 2 + 50 + jitterX, height / 2 - 50 + jitterY);
  } else if (jitterElapsed < insaneDuration + insaneInterval) {
    // hide images
  } else {
    insaneStartTime = millis();
  }

  if (totalElapsed > summerJitterTotalDuration) {
    currentScene = 'endtitle';
    showInsane = false;
  }
}

function drawEndTitle() {
  image(endtitle, width/2, height/2, width, height);
  image(endbutton, width/2, height * 0.85);
}

// --- MOUSE PRESSED ---

function mousePressed() {


  // Resume music on first user interaction if it’s blocked
if (bgMusic.paused) {
  bgMusic.play();
}

  if (currentScene === 'title') {
    let d = dist(mouseX, mouseY, width/2, height * 0.85);
    if (d < 100) {
      currentScene = 'autumntl';
    }
  } else if (currentScene === 'autumntl') {
    currentScene = 'autumnbg';
  } else if (currentScene === 'loading') {
    currentScene = 'wintertl';
  } else if (currentScene === 'wintertl') {
    currentScene = 'winterbg';
  } else if (currentScene === 'loading2') {
    currentScene = 'summertl';
  } else if (currentScene === 'summertl') {
    currentScene = 'summerbg';
  } else if (currentScene === 'endtitle') {
    let d = dist(mouseX, mouseY, width/2, height * 0.85);
    if (d < 100) {
      currentScene = 'title';
    }
  }
}
