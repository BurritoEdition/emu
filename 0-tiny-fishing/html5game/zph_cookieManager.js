var version = "1.0";
var nameFile = 'TinyFishing';
var storeOb = JSON.parse(window.localStorage.getItem(nameFile)) || {};

function cookieSet(argument0, argument1) {
  storeOb[argument0] = argument1;
}

function cookieGet(argument0) {
  return storeOb[argument0];
}

function cookieExsists(argument0) {
  return argument0 in storeOb;
}



function js_saveLocalStorage()
{
  window.localStorage.setItem(nameFile, JSON.stringify(storeOb));
}
