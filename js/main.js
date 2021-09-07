/* global data */
/* exported data */
// var $form = document.querySelector('#entry-form');
var $photoUrl = document.querySelector('#photoURL');
var $img = document.querySelector('.img');

function photoInput(event) {
  var url = $photoUrl.value;

  $img.setAttribute('src', url);
}

$photoUrl.addEventListener('input', photoInput);
