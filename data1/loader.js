// Define both URLs
var adUrls = [
  'https://burritoedition.com/ad/',
  'https://www.effectivegatecpm.com/e3qhw46p40?key=22d32b3624dc968157c567507223d2e8'
];

// Randomly pick one
EJS_AdUrl = adUrls[Math.floor(Math.random() * adUrls.length)];

var VERSION = '0.4.26';
fetch('https://raw.githack.com/ethanaobrien/emulatorjs/main/data/version.json').then(response => {
  if (response.ok) {
    response.text().then(body => {
      var version = JSON.parse(body);
      var usingVersion = VERSION;
      if (usingVersion != version.current_version) {
        console.log('█▄▄ █░█ █▀█ █▀█ █ ▀█▀ █▀█   █▀▀ █▀▄ █ ▀█▀ █ █▀█ █▄░█\n█▄█ █▄█ █▀▄ █▀▄ █ ░█░ █▄█   ██▄ █▄▀ █ ░█░ █ █▄█ █░▀█');
      }
    });
  }
});

(function ensureGtag() {
  if (typeof gtag === 'function') return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-TW1C8W4K8F';
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', 'G-TW1C8W4K8F');
})();

var scriptTag = document.getElementsByTagName('script')[0];
var emu_main = document.createElement('script');
emu_main.src = (function () {
  if (typeof EJS_paths !== 'undefined' && typeof EJS_paths['emu-main.js'] === 'string') {
    return EJS_paths['emu-main.js'];
  } else if (typeof EJS_pathtodata !== 'undefined') {
    return EJS_pathtodata + 'emu-main.js?v=' + VERSION;
  } else {
    return 'emu-main.js?v=' + VERSION;
  }
}());
scriptTag.parentNode.insertBefore(emu_main, scriptTag);

function EJS_openAdPopup() {
  if (typeof EJS_AdUrl !== 'string') return;

  if (typeof gtag === 'function') {
    gtag('event', 'ejs_ad_load_fired', {
      ad_url: EJS_AdUrl,
      event_category: 'emulator_ads',
      game_name: typeof EJS_gameName !== 'undefined' ? EJS_gameName : 'unknown'
    });
  }

  const useNewTab = true;

  if (useNewTab) {
    window.open(EJS_AdUrl, '_blank', 'noopener');
  } else {

    const w = 400;
    const h = 600;
    const left = (window.screen.width - w) / 2;
    const top  = (window.screen.height - h) / 2;
    const features = [
      'toolbar=0',
      'location=0',
      'status=0',
      'menubar=0',
      'scrollbars=1',
      'resizable=1',
      'width=' + w,
      'height=' + h,
      'left=' + left,
      'top=' + top
    ].join(',');

    const win = window.open(EJS_AdUrl, 'EJS_AD_POPUP', features);
    if (win) {
      try { win.location.href = EJS_AdUrl; } catch (e) {}
    }
  }
}

emu_main.onload = function () {
  var emulatorjs = document.createElement('script');
  emulatorjs.async = true;
  emulatorjs.src = (function () {
    if (typeof EJS_paths !== 'undefined' && typeof EJS_paths['emulator.js'] === 'string') {
      return EJS_paths['emulator.js'];
    } else if (typeof EJS_pathtodata !== 'undefined') {
      return EJS_pathtodata + 'emulator.js?v=' + VERSION;
    } else {
      return 'emulator.js?v=' + VERSION;
    }
  }());
  scriptTag.parentNode.insertBefore(emulatorjs, scriptTag);

  emulatorjs.onload = function () {
    var config = {};
    config.gameUrl = EJS_gameUrl;

    typeof EJS_biosUrl        !== 'undefined' && (config.biosUrl        = EJS_biosUrl);
    typeof EJS_gameID         !== 'undefined' && (config.gameId         = EJS_gameID);
    typeof EJS_gameParentUrl  !== 'undefined' && (config.gameParentUrl  = EJS_gameParentUrl);
    typeof EJS_gamePatchUrl   !== 'undefined' && (config.gamePatchUrl   = EJS_gamePatchUrl);
    typeof EJS_AdUrl          !== 'undefined' && (config.adUrla         = EJS_AdUrl);
    typeof EJS_paths          !== 'undefined' && (config.paths          = EJS_paths);
    typeof EJS_netplayUrl     !== 'undefined' && (config.netplayUrl     = EJS_netplayUrl);
    typeof EJS_startOnLoaded  !== 'undefined' && (config.startOnLoad    = EJS_startOnLoaded);
    typeof EJS_core           !== 'undefined' && (config.system         = EJS_core);
    typeof EJS_loadStateURL   !== 'undefined' && (config.loadStateOnStart = EJS_loadStateURL);

    config.onsavestate = null;
    config.onloadstate = null;

    typeof EJS_onSaveState    !== 'undefined' && (config.onsavestate    = EJS_onSaveState);
    typeof EJS_onLoadState    !== 'undefined' && (config.onloadstate    = EJS_onLoadState);
    typeof EJS_lightgun       !== 'undefined' && (config.lightgun       = EJS_lightgun);
    typeof EJS_gameName       !== 'undefined' && (config.gameName       = EJS_gameName);
    typeof EJS_pathtodata     !== 'undefined' && (config.dataPath       = EJS_pathtodata);
    typeof EJS_mouse          !== 'undefined' && (config.mouse          = EJS_mouse);
    typeof EJS_multitap       !== 'undefined' && (config.multitap       = EJS_multitap);
    typeof EJS_playerName     !== 'undefined' && (config.playerName     = EJS_playerName);
    typeof EJS_cheats         !== 'undefined' && (config.cheats         = EJS_cheats);
    typeof EJS_color          !== 'undefined' && (config.color          = EJS_color);

    window.EJS_emulator = new EJS(EJS_player, config);

    if (typeof EJS_onGameStart === 'function') {
      EJS_emulator.on('start-game', function () {
        EJS_onGameStart();
        EJS_openAdPopup();
      });
    } else {
      EJS_emulator.on('start-game', EJS_openAdPopup);
    }
  };
};
