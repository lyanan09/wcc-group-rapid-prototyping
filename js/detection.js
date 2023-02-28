let detections = {};
const videoElement = document.getElementById("video");

function gotFaces(results) {
  detections = results;
  // console.log(detections);
}

const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
  },
});

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
faceMesh.onResults(gotFaces);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({ image: videoElement });
  },
  width: 500,
  height: 500,
});
camera.start();

/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression 
        containing some mobile devices keywords 
        to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details
        it returns boolean value*/
let isMobileDevice = regexp.test(details);



function show(id, value) {
  document.getElementById(id).style.display = value ? "block" : "none";
}

onReady(function () {
  show("page", true);
  show("loading", false);
});
