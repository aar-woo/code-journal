/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataObj = localStorage.getItem('local-data-object');

if (previousDataObj.entries !== null) {
  var previousData = JSON.parse(previousDataObj);
  data = previousData;
}

function unload(event) {
  var dataObjJSON = JSON.stringify(data);
  localStorage.setItem('local-data-object', dataObjJSON);
}

window.addEventListener('beforeunload', unload);
