//https://medium.com/javascript-in-plain-english/how-to-host-a-static-website-for-free-7a2a959f5e4

var notesDropdownID = "notes";
var triadTypeDropdownID = "triadType";
var showTriadDivID = "showTriad";

var notesFinderDropdownID = "notesFinder";

var musicalNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A","A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A","A#", "B"]

var noteDiffDict = {
						major: {first: 3, second: 2},
						minor: {first: 2, second: 3},
						aug: {first: 3, second: 3},
						dim: {first: 2, second: 2},
						sus2: {first: 1, second: 4},
						sus4: {first: 4, second: 1}
					};

function findTriads(){
	var triadType = getDropdownSelectedValue("triadTypeFinder");
	//var note = getDropdownSelectedValue(notesFinderDropdownID);
	var position = getDropdownSelectedValue("position");
	var triad = ['', '', ''];	
	
	var triadNoteDiffs = noteDiffDict[triadType];
	
	if(position === "third"){
		triad[2] = getDropdownSelectedText(notesFinderDropdownID);
		
		var thirdNoteIndex = musicalNotes.lastIndexOf(triad[2]);		
		var secondNoteIndex = thirdNoteIndex - triadNoteDiffs.second - 1;
		var rootNoteIndex = secondNoteIndex - triadNoteDiffs.first - 1;
		
		triad[1] = musicalNotes[secondNoteIndex];
		triad[0] = musicalNotes[rootNoteIndex];
	}else if(position === "second"){
		triad[1] = getDropdownSelectedText(notesFinderDropdownID);
		
		var secondNoteIndexFromBeginning = musicalNotes.indexOf(triad[1]);		
		var thirdNoteIndex = secondNoteIndexFromBeginning + triadNoteDiffs.second + 1;
		
		var secondNoteIndexFromLast = musicalNotes.lastIndexOf(triad[1]);	
		var rootNoteIndex = secondNoteIndexFromLast - triadNoteDiffs.first - 1;
		
		triad[2] = musicalNotes[thirdNoteIndex];
		triad[0] = musicalNotes[rootNoteIndex];
	}
	
	document.getElementById("showTriadFinder").innerHTML = triad[0] + " - " + triad[1] + " - " + triad[2];
}

function updateTriad(){
	//var selectedNote = getDropdownSelectedValue(notesDropdownID);
	var selectedTriadType = getDropdownSelectedValue(triadTypeDropdownID);
	var triadNotes = [];
	var rootNote = getDropdownSelectedText(notesDropdownID);
	
	triadNotes.push(rootNote);
	if(selectedTriadType === "major"){		
		triadNotes = getTriadAtSemitones(triadNotes, 3, 2);
	}else if(selectedTriadType === "minor"){
		triadNotes = getTriadAtSemitones(triadNotes, 2, 3);
	}else if(selectedTriadType === "aug"){
		triadNotes = getTriadAtSemitones(triadNotes, 3, 3);
	}else if(selectedTriadType === "dim"){
		triadNotes = getTriadAtSemitones(triadNotes, 2, 2);
	}else if(selectedTriadType === "sus2"){
		triadNotes = getTriadAtSemitones(triadNotes, 1, 4);
	}else if(selectedTriadType === "sus4"){
		triadNotes = getTriadAtSemitones(triadNotes, 4, 1);
	}
	
	 document.getElementById(showTriadDivID).innerHTML = triadNotes[0] + " - " + triadNotes[1] + " - " + triadNotes[2];
}


function getTriadAtSemitones(triad, firstDiff, secondDiff){
	var rootNoteIndex = musicalNotes.indexOf(triad[0]);
	var secondNoteIndex = rootNoteIndex + firstDiff + 1;
	var thirdNoteIndex = secondNoteIndex + secondDiff + 1;
	
	triad.push(musicalNotes[secondNoteIndex]);
	triad.push(musicalNotes[thirdNoteIndex]);
	
	return triad;
}


function getDropdownSelectedValue(dropdownID){
	var dropDown = document.getElementById(dropdownID);
	return dropDown.options[dropDown.selectedIndex].value;
}

function getDropdownSelectedText(dropdownID){
	var dropDown = document.getElementById(dropdownID);
	return dropDown.options[dropDown.selectedIndex].text;
}