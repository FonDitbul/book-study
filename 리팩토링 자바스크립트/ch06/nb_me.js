// javascript 나이브 베이즈 분류 리팩터링

function createSong(name, chords, label) {
  //테스트 데이터 생성
  return { name: name, chords: chords, label: label };
}

const imagine = createSong(
  "imagine",
  ["c", "cmaj7", "f", "am", "dm", "g", "e7"],
  "easy"
);
const somewhereOverTheRainbow = createSong(
  "someWhereOverTheRainbow",
  ["c", "em", "f", "g", "am"],
  "easy"
);
const tooManyCooks = createSong("tooManyCooks", ["c", "g", "f"], "easy");
const iWillFollowYouIntoTheDark = createSong(
  "iWill~~",
  ["f", "dm", "bb", "c", "a", "bbm"],
  "medium"
);
const babyOneMoreTime = createSong(
  "babyOneMoreTime",
  ["cm", "g", "bb", "eb", "fm", "ab"],
  "medium"
);
const creep = createSong(
  "creep",
  ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"],
  "medium"
);
const army = createSong(
  "army",
  ["ab", "ebm7", "dbadd9", "fm7", "bbm", "abmaj7", "ebm"],
  "?"
);
const paperBag = createSong(
  "paperBag",
  ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7", "em7", "a7", "f7", "b"],
  "hard"
);
const toxic = createSong(
  "toxic",
  ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7", "g7"],
  "hard"
);
const bulletProof = createSong(
  "bulletProof",
  ["d#m", "g#", "b", "f#", "g#m", "c#"],
  "hard"
);

const songs = []; //전체 노래 songs 사용 어떻게하는지 ?
const labels = []; //전체 레이블 easy, medium, hard
const labelCounts = []; //label 개수?
const labelProbabilities = []; // label 확률 ?
const chordCountsInLabels = {}; //레이블안에 chord 개수
let probabilityOfChordsInLabels = {}; //레이블안에 코드의 확률

function train({ chords, label }) {
  songs.push({ label: label, chords: chords });
  if (Object.keys(labelCounts).includes(label)) {
    labelCounts[label] = labelCounts[label] + 1;
  } else {
    labelCounts[label] = 1;
  }
}

function setLabelProbabilities(probability, count) {
  Object.keys(count).forEach(function (label) {
    probability[label] = count[label] / songs.length;
  });
}

function setChordCountsInLabels(totalSong, countInLabel) {
  totalSong.forEach(function (song) {
    if (countInLabel[song.label] === undefined) {
      countInLabel[song.label] = {};
    }
    song.chords.forEach(function (chord) {
      if (countInLabel[song.label][chord] > 0) {
        countInLabel[song.label][chord] += 1;
      } else {
        countInLabel[song.label][chord] = 1;
      }
    });
  });
}

function setProbabilityOfChordsInLabels(probabilityOfChord, chordCount) {
  probabilityOfChord = chordCount;
  Object.keys(probabilityOfChord).forEach(function (i) {
    Object.keys(probabilityOfChord[i]).forEach(function (j) {
      probabilityOfChord[i][j] =
        (probabilityOfChord[i][j] * 1.0) / songs.length;
    });
  });
  return probabilityOfChord;
}

function classify(chords, labelProbability, probabilityOfChord) {
  const total = labelProbability;
  console.log(total);
  const classified = {};
  Object.keys(total).forEach(function (obj) {
    let first = labelProbability[obj] + 1.01;
    chords.forEach(function (chord) {
      if (probabilityOfChord[obj][chord]) return;
      const probabilityOfChordInLabel = probabilityOfChord[obj][chord];
      if (probabilityOfChordInLabel !== undefined)
        first = first * (probabilityOfChordInLabel + 1.01);
    });
    classified[obj] = first;
  });
  console.log(classified);
}

train(imagine);
train(somewhereOverTheRainbow);
train(tooManyCooks);
train(iWillFollowYouIntoTheDark);
train(babyOneMoreTime);
train(creep);
train(paperBag);
train(toxic);
train(bulletProof);

setLabelProbabilities(labelProbabilities, labelCounts);
setChordCountsInLabels(songs, chordCountsInLabels);
probabilityOfChordsInLabels = setProbabilityOfChordsInLabels(
  probabilityOfChordsInLabels,
  chordCountsInLabels
);

classify(
  ["d", "g", "e", "dm"],
  labelProbabilities,
  probabilityOfChordsInLabels
);
classify(
  ["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"],
  labelProbabilities,
  probabilityOfChordsInLabels
);
