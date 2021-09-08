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

function renderEntry(entryObj) {
  var listItem = document.createElement('li');
  var divRow = document.createElement('div');
  divRow.className = 'row margin-bot-two-rem';
  listItem.appendChild(divRow);

  var divImgCol = document.createElement('div');
  divImgCol.className = 'column-half';

  var imgEl = document.createElement('img');
  imgEl.className = 'img width-100';
  imgEl.setAttribute('src', entryObj.entryURL);

  var divTextCol = document.createElement('div');
  divTextCol.className = 'column-half';

  var title = document.createElement('h2');
  title.className = 'margin-top-half-rem';
  title.textContent = entryObj.entryTitle;

  var notes = document.createElement('p');
  notes.textContent = entryObj.entryNotes;

  divRow.appendChild(divImgCol);
  divImgCol.appendChild(imgEl);
  divRow.appendChild(divTextCol);
  divTextCol.appendChild(title);
  divTextCol.appendChild(notes);

  return listItem;
}

// renderEntry({
//   entryTitle: 'title',
//   entryURL: 'url',
//   entryNotes: 'notes'
// });

var $entryList = document.querySelector('.entryList');

function onDOMLoad(event) {
  for (var entryNum = 0; entryNum < data.entries.length; entryNum++) {
    var entryRendered = renderEntry(data.entries[entryNum]);
    $entryList.appendChild(entryRendered);
  }
}

window.addEventListener('DOMContentLoaded', onDOMLoad);

var $newButton = document.querySelector('.newButton');
var $formDiv = document.querySelector('.formDiv');
var formDataView = $formDiv.getAttribute('data-view');

var $entriesDiv = document.querySelector('.entriesDiv');

$newButton.addEventListener('click', onNewClick);
data.view = 'entries';

function onNewClick(event) {
  if (data.view === formDataView) {
    return;
  }

  $formDiv.className = 'formDiv';
  $entriesDiv.className = 'entriesDiv hidden';
}
