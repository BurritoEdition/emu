// Cursor

function js_isIE() {

    var ua = window.navigator.userAgent;
  var isIE = /MSIE|Trident/.test(ua);

  return isIE;
}

var domMouseDown = false;
var domMouseX = 0;
var domMouseY = 0;


var canvasNode = document.getElementById('canvas');

/*	if(typeof AudioContext != "undefined" || typeof webkitAudioContext != "undefined") 
	{
   var resumeAudio = function() 
   {
      if(typeof g_WebAudioContext == "undefined" || g_WebAudioContext == null) return;
      if(g_WebAudioContext.state == "suspended") g_WebAudioContext.resume();
      document.removeEventListener("click", resumeAudio);
			document.removeEventListener("touchstart", resumeAudio);
			document.removeEventListener("touchend", resumeAudio);
			console.log("initial input");
		};


document.addEventListener("click", resumeAudio);
document.addEventListener("touchstart", resumeAudio);
document.addEventListener("touchend", resumeAudio);
}*/


  const newClickHandler = function(e) {
if (document.disableDefaultMouseEvents)
    e.preventDefault();
  };



function js_toggleClickListener(enable) {
	//return;
  //console.log("toggle listener", enable);
	document.disableDefaultMouseEvents = enable;

	if (false)
	if (enable)
	{

		document.addEventListener('touchstart', handleMouseEvent, { passive:false });
		document.addEventListener('touchmove', handleMouseEvent, { passive:false });
		document.addEventListener('touchend', handleMouseEvent, { passive:false });
		document.addEventListener('touchcancel', handleMouseEvent, { passive:false });
		document.addEventListener('mousedown', handleMouseEvent, { passive:false });
		document.addEventListener('mouseup', handleMouseEvent, { passive:false });
		document.addEventListener('mousemove', handleMouseEvent, { passive:false });
		document.addEventListener('mouseover', handleMouseEvent, { passive:false });
		document.addEventListener('mouseout', handleMouseEvent, { passive:false });
		document.addEventListener('mouseenter', handleMouseEvent, { passive:false });
		document.addEventListener('mouseleave', handleMouseEvent, { passive:false });
		document.addEventListener("click", handleMouseEvent, { passive: false });
	} else
	{
		document.removeEventListener('touchstart', handleMouseEvent);
		document.removeEventListener('touchmove', handleMouseEvent);
		document.removeEventListener('touchend', handleMouseEvent);
		document.removeEventListener('touchcancel', handleMouseEvent);
		document.removeEventListener('mousedown', handleMouseEvent);
		document.removeEventListener('mouseup', handleMouseEvent);
		document.removeEventListener('mousemove', handleMouseEvent);
		document.removeEventListener('mouseover', handleMouseEvent);
		document.removeEventListener('mouseout', handleMouseEvent);
		document.removeEventListener('mouseenter', handleMouseEvent);
		document.removeEventListener('mouseleave', handleMouseEvent);
		document.removeEventListener('click', handleMouseEvent);

	}
}


function js_initMouseFunctions() {

	document.disableDefaultMouseEvents = true;

console.log("int");
		document.addEventListener('touchstart', handleMouseEvent, { passive:false });
		document.addEventListener('touchmove', handleMouseEvent, { passive:false });
		document.addEventListener('touchend', handleMouseEvent, { passive:false });
		document.addEventListener('touchcancel', handleMouseEvent, { passive:false });
		document.addEventListener('mousedown', handleMouseEvent, { passive:false });
		document.addEventListener('mouseup', handleMouseEvent, { passive:false });
		document.addEventListener('mousemove', handleMouseEvent, { passive:false });
		document.addEventListener('mouseover', handleMouseEvent, { passive:false });
		document.addEventListener('mouseout', handleMouseEvent, { passive:false });
		document.addEventListener('mouseenter', handleMouseEvent, { passive:false });
		document.addEventListener('mouseleave', handleMouseEvent, { passive:false });
		document.addEventListener("click", newClickHandler, { passive: false });

  var curs = document.getElementById('img_cursorHandler');

//document.addEventListener('mousemove', function(e) { e.preventDefault(); handleMouseMove(e); }, { passive:false });
//document.addEventListener("click", function(e) { e.preventDefault();  }, { passive:false });
js_toggleClickListener(true);




/*
document.addEventListener('touchstart', handleMouseEvent, { passive:false });
document.addEventListener('touchmove', handleMouseEvent, { passive:false });
document.addEventListener('touchend', handleMouseEvent, { passive:false });
document.addEventListener('touchcancel', handleMouseEvent, { passive:false });
document.addEventListener('mousedown', handleMouseEvent, { passive:false });
document.addEventListener('mouseup', handleMouseEvent, { passive:false });
document.addEventListener('mousemove', handleMouseEvent, { passive:false });
document.addEventListener('mouseover', handleMouseEvent, { passive:false });
document.addEventListener('mouseout', handleMouseEvent, { passive:false });
document.addEventListener('mouseenter', handleMouseEvent, { passive:false });
document.addEventListener('mouseleave', handleMouseEvent, { passive:false });
//document.addEventListener('mousemove', function(e) { e.preventDefault(); handleMouseMove(e); }, { passive:false });
document.addEventListener("click", function(e) { e.preventDefault();  }, { passive:false });*/

function handleMouseEvent(e)
{
var pdomMouseDown = domMouseDown;
var pdomMouseX = domMouseX;
var pdomMouseY = domMouseY;

//console.log(document.disableDefaultMouseEvents);

if (document.disableDefaultMouseEvents)
  e.preventDefault();
  var x = 0, y = 0;
  if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
    var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    x = touch.pageX;
    y = touch.pageY;
  } else 
  if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
    x = e.clientX;
    y = e.clientY;
  }

  if (e.type == 'touchstart' || e.type == 'mousedown' || e.type == 'touchmove')
  {
    //console.log("mousedeown or touchdown");
    //window["gml_Script_gmcallback_onmousedown"]("","");
    domMouseDown = true;
  } else

  if (e.type == 'mouseup' || e.type == 'mouseout' || e.type == 'mouseleave' || e.type == 'touchend' || e.type == 'touchcancel')
  {
    //console.log("mouseup or touchend");
    //window["gml_Script_gmcallback_onmouseup"]("","");
    domMouseDown = false;
  }

  domMouseX = x/window.innerWidth;
  domMouseY = y/window.innerHeight;


  if ((pdomMouseDown != domMouseDown) || (pdomMouseX != domMouseX) || (pdomMouseY != domMouseY))
  window["gml_Script_gmcallback_on_d_mouse_update"]("","", domMouseX, domMouseY, domMouseDown);


  //window["gml_Script_gmcallback_onmousemove"]("","",x / window.innerWidth,y / window.innerHeight);

}

}

function js_isMobileOrTablet() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  
  var touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
  var supportOrientChange = (typeof window.orientation !== 'undefined');

  if (!check)
  {
    return (touchDevice || supportOrientChange);
  }

  return check;
}

// Loading & elements

function dj_place(elemName, pivotX, pivotY, deltaX, deltaY, centerPivot) {
	var elemProps = loadingElements[elemName];
	if (!elemProps) return 1;

	if (centerPivot) {
		elemProps.elem.style.left = loadingDisplayParams.width * (pivotX + deltaX / defaultScreenSizePx.width) - parseInt(elemProps.elem.style.width, 10) * 0.5 + "px";
		elemProps.elem.style.top = loadingDisplayParams.height * (pivotY + deltaY / defaultScreenSizePx.height) - parseInt(elemProps.elem.style.height, 10) * 0.5 + "px";
		//console.log(elemProps.elem.style.width, elemProps.elem.clientHeight);
	} else {
		elemProps.elem.style.left = loadingDisplayParams.width * (pivotX + deltaX / defaultScreenSizePx.width) + "px";
		elemProps.elem.style.top = loadingDisplayParams.height * (pivotY + deltaY / defaultScreenSizePx.height) + "px";

	}
	elemProps.elem.style.display = "block";
};

function dj_scaleRelative(elemName, sizeOnScreen, scaleByHeight, stretch) {
	var elemProps = loadingElements[elemName];
	if (!elemProps) return;

	if (stretch) {
		elemProps.elem.style.width = sizeOnScreen * loadingDisplayParams.width + "px";
		elemProps.elem.style.height = sizeOnScreen * loadingDisplayParams.height + "px";
	} else {
		var sc = sizeOnScreen * loadingDisplayParams.width / elemProps.width;
		if (scaleByHeight) sc = sizeOnScreen * loadingDisplayParams.height / elemProps.height;

		elemProps.elem.style.width = sc * elemProps.width + "px";
		elemProps.elem.style.height = sc * elemProps.height + "px";
	}

};

function dj_scale(elemName, sizeX, sizeY, stretch) {
	var elemProps = loadingElements[elemName];
	if (!elemProps) return;

	if (stretch) {
		elemProps.elem.style.width = sizeX + "px";
		elemProps.elem.style.height = sizeY + "px";
	} else {
		var sc = sizeX / elemProps.width;

		elemProps.elem.style.width = sc * elemProps.width + "px";
		elemProps.elem.style.height = sc * elemProps.height + "px";
	}

};

var loadingDisplayParams =
{
	width: 100,
	height: 100
};

var defaultScreenSizePx =
{
	width: 1400,
	height: 720
};


var loadingElements = {};

var loadingLanguage = 'en';
var runsOnMobileDevice = false;
var loadingHidden = false;


function dg_initLoadingElements() {

/*
	// new
	dj_addLoadingElement('img_fullLoading');
	dj_addLoadingElement('img_emptyLoading');
	dj_addLoadingElement('img_subButton');


	dj_addLoadingElement('img_capLoading');
	dj_addLoadingElement('img_textLoading');
	// ru
	dj_addLoadingElement('img_capLoading_ru');
	dj_addLoadingElement('img_textLoading_ru');
	dj_addLoadingElement('img_subButton_ru');
*/


	dj_addLoadingElement('img_bgLoading');
	dj_addLoadingElement('img_pcLogoLoading');
	dj_addLoadingElement('img_loadingbar');
	dj_addLoadingElement('img_loadingbaroverlay');



	runsOnMobileDevice = dg_mobileAndTabletCheck();

	var detectLanguage = false;
	if (detectLanguage) {
		var navLanguage = window.navigator.userLanguage || window.navigator.language;
		if (navLanguage == 'ru') loadingLanguage = 'ru'; else
			if (navLanguage == 'ru-RU') loadingLanguage = 'ru'; else
				if (navLanguage == 'ru-ru') loadingLanguage = 'ru'; else
					loadingLanguage = 'en';
	}

	//loadingLanguage = 'ru';
	// language
	if (loadingLanguage == 'ru') {
		dg_hideElementByName('img_capLoading');
		dg_hideElementByName('img_textLoading');
		dg_hideElementByName('img_subButton');
	}

	//loadingDisplayParams.width = window.innerWidth;
	//loadingDisplayParams.height = window.innerHeight;

	//dg_updateElements();
};
dg_initLoadingElements();

if (screen)
	if (screen.orientation)
		screen.orientation.addEventListener("change", function (e) {
			if (runsOnMobileDevice) {
				if (!loadingHidden)
					dg_updateElements();
			}
		});

//screen.availHeight > screen.availWidth
function dg_mobileAndTabletCheck() {
	let check = false;
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
};

function dj_addLoadingElement(elementIdName) {
	var el = document.getElementById(elementIdName);
	var obj = { elem: el, width: el.naturalWidth, height: el.naturalHeight };
	
	el.setAttribute('draggable', false);

	loadingElements[elementIdName] = obj;
	if ((elementIdName != 'img_bgLoading') && (elementIdName != 'img_loadingbaroverlay')) {
		el.style.display = "none";
	}

};


function dg_updateElements() {
	//console.log("loading updatte");
	var suffix = '';
	if (loadingLanguage == 'ru') suffix = '_ru';

	dj_place('img_bgLoading', 0, 0, 0, 0, false);
	dj_scale('img_bgLoading', loadingDisplayParams.width, loadingDisplayParams.height, true);
	//dj_scale('img_bgLoading', 1, 1, true);

	dj_place('img_pcLogoLoading' + suffix, 0.5, 0.5, 0, 0, true);
	dj_place('img_loadingbar', 0.5, 1, 0, -120, true);

	if (loadingDisplayParams.width > loadingDisplayParams.height)
	{
		dj_scaleRelative('img_pcLogoLoading' + suffix, 0.45*0.8, true, false);
		loadingElements['img_loadingbar'].elem.style.width = loadingDisplayParams.width * 0.5 + "px";

	} else
	{
		dj_scaleRelative('img_pcLogoLoading' + suffix, 0.27*0.8, true, false);

		loadingElements['img_loadingbar'].elem.style.width = loadingDisplayParams.width * 0.6 + "px";
		}


	//dj_scaleRelative('img_loadingbar' + suffix, 0.75, false, true);

	/*
	dj_place('img_capLoading' + suffix, 0.5, 0.5, 0, -145, true);
	dj_scaleRelative('img_capLoading' + suffix, 0.09, true, false);

	if (subButtonInitialized && subButtonEnabled) {
		dj_place('img_subButton' + suffix, 0.5, 0.5, 0, -100, true);
		dj_scaleRelative('img_subButton' + suffix, 0.036, true, false);
	}

	dj_place('img_textLoading' + suffix, 0.5, 0.5, 0, 75, true);
	dj_scaleRelative('img_textLoading' + suffix, 0.055, true, false);

	// new
	dj_place('img_emptyLoading', 0.5, 0.5, 0, 0, true);
	dj_scaleRelative('img_emptyLoading', 0.09, true, false);
	

	//loadingProgress = 0.7;

	var el = loadingElements['img_emptyLoading'].elem;
	var fl = loadingElements['img_fullLoading'].elem;
	fl.style.display = "block";
	var cropper = document.getElementById("crop-loading");
	var elHeight = parseInt(el.style.height, 10);

	cropper.style.left = el.style.left;
	cropper.style.top = parseInt(el.style.top, 10) + parseInt(el.style.height, 10) * (1 - loadingProgress) + "px";
	cropper.style.width = el.style.width;
	cropper.style.height = elHeight * loadingProgress + "px";

	fl.style.top = -elHeight * (1 - loadingProgress) + "px";
	fl.style.width = el.style.width;
	fl.style.height = el.style.height;
*/

}

var loadingProgress = 0;
var loadingAnimated = false;
var animateInterval = null;

var subButtonInitialized = false;
var subButtonEnabled = false;

function dj_loading(ctx, width, height, total, current, _) {
	if (loadingHidden) return 1;

	if (false)
	//if (runsOnMobileDevice && (window.innerHeight < window.innerWidth))
	{
		loadingDisplayParams.width = window.innerHeight;
		loadingDisplayParams.height = window.innerWidth;
	} else {
		loadingDisplayParams.width = window.innerWidth;
		loadingDisplayParams.height = window.innerHeight;
	}

	canvasNode.width = loadingDisplayParams.width;
	canvasNode.height = loadingDisplayParams.height;

	// Force fullscreen mode:
	var node = ctx.canvas;
	width = loadingDisplayParams.width;
	if (node.width != width) node.width = width;
	height = loadingDisplayParams.height;
	if (node.height != height) node.height = height;

	dg_updateElements();
	loadingProgress = current / total;

	loadingElements['img_loadingbaroverlay'].elem.style.width = (current / total * 100) + "%";
	loadingElements['img_loadingbar'].elem.style.opacity = "1.0";

	if (false)
		if (loadingProgress >= 0.99) {
			dg_hide_loading_pls();
			return 0;
		}

	if (!subButtonInitialized && window.gs) {
		subButtonInitialized = true;

		var suffix = '';
		if (loadingLanguage == 'ru') suffix = '_ru';

		if (window.gs.platform.type == "VK") {
			console.log("sub button for VK");

			loadingElements['img_subButton' + suffix].elem.addEventListener("click", (event) => {
				window.gs.socials.joinCommunity();
			});
			subButtonEnabled = true;

			document.getElementById('img_subButton' + suffix).onclick = function () {
				window.gs.socials.joinCommunity();
			};

		}

	}

	if (false)
		if (!loadingAnimated) {
			//loadingElements['img_loadingbar'].elem.style.opacity = "1.0";
			loadingElements['img_capLoading'].elem.classList.toggle("rotatedCap");
			animateInterval = setInterval(function () {

				loadingElements['img_capLoading'].elem.classList.toggle("rotatedCap");
			}, 2000);
			loadingAnimated = true;
		}
	/*
	*/

	//dj_loading_value("draw_post");
}


function dg_hideElement(elem) {
	if (elem) {
		elem.style.display = "none";
		elem.style.visibility = "hidden";
		elem.style.pointerEvents = 'none';
		if (elem.parentNode)
			elem.parentNode.removeChild(elem);
	}
}


function dg_hideElementByName(elemName) {
	var elem = loadingElements[elemName];
	if (elem) elem = elem.elem;
	dg_hideElement(elem);
}

function dg_hide_loading_pls() {
	//return 1;
	loadingHidden = true;

	//if (animateInterval)
	//	clearInterval(animateInterval);

	for (var key in loadingElements) {
		if (loadingElements.hasOwnProperty(key)) {
			//console.log(key + " -> " + loadingElements[key]);
			dg_hideElement(loadingElements[key].elem);
		}
	}

}
