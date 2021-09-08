/* global data */
/* exported data */
var $entryForm = document.querySelector('#entry-form');
var $photoUrl = document.querySelector('#photoURL');
var $img = document.querySelector('.img');

function photoInput(event) {
  var url = $photoUrl.value;
  $img.setAttribute('src', url);
}

$photoUrl.addEventListener('input', photoInput);

function onSubmit(event) {
  event.preventDefault();
  var newEntry = {
    entryTitle: $entryForm.elements.title.value,
    entryURL: $entryForm.elements.photoURL.value,
    entryNotes: $entryForm.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', onSubmit);

var $myStorage = window.localStorage;

var previousDataObj = $myStorage.getItem('local-data-object');

if (previousDataObj.entries !== null) {
  var previousData = JSON.parse(previousDataObj);
  data.entries = previousData.entries;
  data.view = previousData.view;
  data.editing = previousData.editing;
  data.nextEntryId = previousData.nextEntryId;
}

function unload(event) {
  var dataObjJSON = JSON.stringify(data);
  $myStorage.setItem('local-data-object', dataObjJSON);
}

window.addEventListener('beforeunload', unload);
