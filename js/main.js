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
  $entryList.prepend(renderEntry(newEntry));
  $formDiv.className = data.view + ' hidden';
  data.view = 'entries';
  $entriesDiv.className = data.view;
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

var $entryList = document.querySelector('.entryList');

function onDOMLoad(event) {
  for (var entryNum = 0; entryNum < data.entries.length; entryNum++) {
    var entryRendered = renderEntry(data.entries[entryNum]);
    $entryList.appendChild(entryRendered);
  }
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === data.view) {
      $views[i].className = 'view';
      // data.view = targetDataView;
    } else {
      $views[i].className = 'view hidden';
    }
  }
  // if (data.view === 'entries') {
  //   $formDiv.className = data.view + ' hidden';
  //   data.view = 'entries';
  //   $entriesDiv.className = data.view;
  // }
}

window.addEventListener('DOMContentLoaded', onDOMLoad);

var $entriesDiv = document.querySelector('.entries');
var $formDiv = document.querySelector('.entry-form');

// function onNewClick(event) {
//   $entriesDiv.className = data.view + ' hidden';
//   data.view = 'entry-form';
//   $formDiv.className = data.view;
// }

// function onEntriesClick(event) {
//   $formDiv.className = data.view + ' hidden';
//   data.view = 'entries';
//   $entriesDiv.className = data.view;
// }

// $newButton.addEventListener('click', onNewClick);
// $entriesTab.addEventListener('click', onEntriesClick);
var $newButton = document.querySelector('.newButton');
var $entriesTab = document.querySelector('.entriesTab');
var $views = document.querySelectorAll('.view');

function switchViews(event) {
  var targetDataView = event.target.getAttribute('data-view');
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetDataView) {
      $views[i].className = 'view';
      data.view = targetDataView;
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

$newButton.addEventListener('click', switchViews);
$entriesTab.addEventListener('click', switchViews);
