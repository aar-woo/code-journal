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
    entryNotes: $entryForm.elements.notes.value
  };
  if (data.editing !== null) {
    newEntry.entryId = data.editing.entryId;
    for (var entryNum = 0; entryNum < data.entries.length; entryNum++) {
      if (data.entries[entryNum].entryId === newEntry.entryId) {
        data.entries[entryNum] = newEntry;
        var $domEntriesList = document.querySelectorAll('.entryList li');
        for (var domEntry = 0; domEntry < $domEntriesList.length; domEntry++) {
          if (parseInt($domEntriesList[domEntry].getAttribute('data-entry-id')) === newEntry.entryId) {
            $domEntriesList[domEntry].replaceWith(renderEntry(newEntry));
          }
        }
        data.editing = null;
      }
    }
  } else {
    newEntry.entryId = data.nextEntryId;
    $entryList.prepend(renderEntry(newEntry));
    data.nextEntryId++;
    data.entries.unshift(newEntry);
  }
  $entryHeader.textContent = 'New Entry';
  switchViews('entries');
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
}

$entryForm.addEventListener('submit', onSubmit);

function renderEntry(entryObj) {
  var listItem = document.createElement('li');
  listItem.setAttribute('data-entry-id', entryObj.entryId);
  var divRow = document.createElement('div');
  divRow.className = 'row margin-bot-two-rem';

  var divImgCol = document.createElement('div');
  divImgCol.className = 'column-half margin-bot-two-rem';

  var imgEl = document.createElement('img');
  imgEl.className = 'img width-100';
  imgEl.setAttribute('src', entryObj.entryURL);

  var divTextCol = document.createElement('div');
  divTextCol.className = 'column-half';

  var divTitleRow = document.createElement('div');
  divTitleRow.className = 'row justify-between';

  var title = document.createElement('h2');
  title.className = 'margin-top-0';
  title.textContent = entryObj.entryTitle;

  var icon = document.createElement('i');
  icon.className = 'fas fa-pencil-alt margin-top-0';

  var notes = document.createElement('p');
  notes.className = 'margin-top-0';
  notes.textContent = entryObj.entryNotes;

  listItem.appendChild(divRow);
  divRow.appendChild(divImgCol);
  divImgCol.appendChild(imgEl);
  divRow.appendChild(divTextCol);
  divTextCol.appendChild(divTitleRow);
  divTitleRow.appendChild(title);
  divTitleRow.appendChild(icon);
  divTextCol.appendChild(notes);

  return listItem;
}

var $entryList = document.querySelector('.entryList');

function onDOMLoad(event) {
  for (var entryNum = 0; entryNum < data.entries.length; entryNum++) {
    var entryRendered = renderEntry(data.entries[entryNum]);
    $entryList.appendChild(entryRendered);
  }
  switchViews(data.view);
  if (data.editing !== null) {
    $entryHeader.textContent = 'Edit Entry';
    $img.setAttribute('src', data.editing.entryURL);
    $photoUrl.value = data.editing.entryURL;
    $titleInput.value = data.editing.entryTitle;
    $notesInput.value = data.editing.entryNotes;
  }
}

window.addEventListener('DOMContentLoaded', onDOMLoad);

var $newButton = document.querySelector('.newButton');
var $entriesTab = document.querySelector('.entriesTab');
var $views = document.querySelectorAll('.view');

function switchViews(view) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].className = 'view';
      data.view = view;
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

function onClick(event) {
  var targetDataView = event.target.getAttribute('data-view');
  switchViews(targetDataView);
  data.editing = null;
  $entryHeader.textContent = 'New Entry';
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $deleteLink.className = ('deleteLink hidden');
  $entryForm.reset();
}

$newButton.addEventListener('click', onClick);
$entriesTab.addEventListener('click', onClick);

var $entryHeader = document.querySelector('.entryHeader');
var $titleInput = document.querySelector('#title');
var $notesInput = document.querySelector('#notes');
var $deleteLink = document.querySelector('.deleteLink');

function onPencilClick(event) {
  if (!event.target.matches('.fa-pencil-alt')) {
    return;
  }
  switchViews('entry-form');
  var entrySelected = event.target.closest('li');

  for (var entryNum = 0; entryNum < data.entries.length; entryNum++) {
    if (data.entries[entryNum].entryId === parseInt(entrySelected.getAttribute('data-entry-id'))) {
      data.editing = data.entries[entryNum];
    }
  }
  $entryHeader.textContent = 'Edit Entry';
  $img.setAttribute('src', data.editing.entryURL);
  $photoUrl.value = data.editing.entryURL;
  $titleInput.value = data.editing.entryTitle;
  $notesInput.value = data.editing.entryNotes;
  $deleteLink.className = 'deleteLink';
}

$entryList.addEventListener('click', onPencilClick);

var $modal = document.querySelector('.overlay');
var $cancelBtn = document.querySelector('.cancel-btn');
var $confirmBtn = document.querySelector('.confirm-btn');

function onDeleteClick(event) {
  $modal.className = 'overlay flex align-center';
}
$deleteLink.addEventListener('click', onDeleteClick);

function onCancelClick(event) {
  $modal.className = 'hidden';
}
$cancelBtn.addEventListener('click', onCancelClick);

function onConfirmDeleteClick(event) {
  for (var entryNum = 0; entryNum < data.entries.length; entryNum++) {
    if (data.editing.entryId === data.entries[entryNum].entryId) {
      data.entries.splice(entryNum, 1);
    }
  }
  var $domEntriesList = document.querySelectorAll('.entryList li');
  for (var domEntry = 0; domEntry < $domEntriesList.length; domEntry++) {
    if (data.editing.entryId === parseInt($domEntriesList[domEntry].getAttribute('data-entry-id'))) {
      $domEntriesList[domEntry].remove();
    }
  }
  $modal.className = 'hidden';
  switchViews('entries');
}
$confirmBtn.addEventListener('click', onConfirmDeleteClick);
