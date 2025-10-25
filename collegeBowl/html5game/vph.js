console.log("Poki wrapper load");

// Create stub SDK if it doesn't exist
if (!window.PokiSDK) {
    console.log("PokiSDK not found, creating stub");
    window.PokiSDK = {
        init: function() { return Promise.resolve(); },
        gameLoadingStart: function() {},
        gameLoadingFinished: function() {},
        gameLoadingProgress: function(p) {},
        gameplayStart: function() {},
        gameplayStop: function() {},
        happyTime: function(m) {},
        commercialBreak: function() { return Promise.resolve(); },
        rewardedBreak: function() { return Promise.resolve(false); },
        getURLParam: function(p) {
            const match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
            return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
        }
    };
    window.PokiSDK_OK = false; // Indicate SDK is stubbed
}

// Original functions - now safe because SDK exists
function poki_init_raw() {
    console.log("Poki wrapper init");
    // fix GMS1 bug with iframes
    var ctr = document.getElementById("gm4html5_div_id");
    if (ctr && !ctr.frames) ctr.frames = [];
    return 0;
}

function poki_script_closure_raw(self, other, script, custom) {
    return function(result) {
        window.gml_Script_gmcallback_poki_closure(self, other, script, result, custom)
    }
}

function poki_is_blocked() {
    return !window.PokiSDK_OK;
}

function poki_gameplay_start() {
    if (PokiSDK) PokiSDK.gameplayStart();
}

function poki_gameplay_stop() {
    if (PokiSDK) PokiSDK.gameplayStop();
}

function poki_happy_time(magnitude) {
    if (PokiSDK) PokiSDK.happyTime(magnitude);
}

function poki_commercial_break_raw(fn) {
    if (PokiSDK) {
        PokiSDK.commercialBreak().then(function() { fn(true); });
    } else setTimeout(function() { fn(false); }, 0);
}

function poki_rewarded_break_raw(fn) {
    if (PokiSDK) {
        PokiSDK.rewardedBreak().then(fn);
    } else setTimeout(function() { fn(false); }, 0);
}

var inst = { };

function poki_loadbar(ctx, width, height, total, current, image) {
    if (window.PokiSDK) {
        if (window.PokiSDK_loadState == 0) {
            window.PokiSDK_isLoading = 1;
            PokiSDK.gameLoadingStart();
        }
        PokiSDK.gameLoadingProgress({ percentageDone: current/total });
        if (current >= total && window.PokiSDK_loadState != 2) {
            window.PokiSDK_loadState = 2;
            PokiSDK.gameLoadingFinished();
        }
    }
    
    function getv(s) {
        if (window.gml_Script_gmcallback_poki_loadbar) {
            return window.gml_Script_gmcallback_poki_loadbar(inst, null,
                s, current, total,
                width, height, image ? image.width : 0, image ? image.height : 0)
        } else return undefined;
    }
    function getf(s, d) {
        var r = getv(s);
        return typeof(r) == "number" ? r : d;
    }
    function getw(s, d) {
        var r = getv(s);
        return r && r.constructor == Array ? r : d;
    }
    function getc(s, d) {
        var r = getv(s);
        if (typeof(r) == "number") {
            r = r.toString(16);
            while (r.length < 6) r = "0" + r;
            return "#" + r;
        } else if (typeof(r) == "string") {
            return r;
        } else return d;
    }
    
    var backgroundColor = getc("background_color", "#FFFFFF");
    var barBackgroundColor = getc("bar_background_color", "#FFFFFF");
    var barForegroundColor = getc("bar_foreground_color", "#242238");
    var barBorderColor = getc("bar_border_color", "#242238");
    var barWidth = getf("bar_width", Math.round(width * 0.6));
    var barHeight = getf("bar_height", 20);
    var barBorderWidth = getf("bar_border_width", 2);
    var barOffset = getf("bar_offset", 10);
    
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    var totalHeight, barTop;
    if (image != null) {
        var rect = getw("image_rect");
        if (!rect) rect = [0, 0, image.width, image.height];
        totalHeight = rect[3] + barOffset + barHeight;
        var image_y = (height - totalHeight) >> 1;
        ctx.drawImage(image, rect[0], rect[1], rect[2], rect[3],
            (width - rect[2]) >> 1, image_y, rect[2], rect[3]);
        barTop = image_y + rect[3] + barOffset;
    } else barTop = (height - barHeight) >> 1;
    
    var barLeft = (width - barWidth) >> 1;
    ctx.fillStyle = barBorderColor;
    ctx.fillRect(barLeft, barTop, barWidth, barHeight);
    
    var barInnerLeft = barLeft + barBorderWidth;
    var barInnerTop = barTop + barBorderWidth;
    var barInnerWidth = barWidth - barBorderWidth * 2;
    var barInnerHeight = barHeight - barBorderWidth * 2;
    
    ctx.fillStyle = barBackgroundColor;
    ctx.fillRect(barInnerLeft, barInnerTop, barInnerWidth, barInnerHeight);
    
    var barLoadedWidth = Math.round(barInnerWidth * current / total);
    ctx.fillStyle = barForegroundColor;
    ctx.fillRect(barInnerLeft, barInnerTop, barLoadedWidth, barInnerHeight);
}

function poki_get_team_raw() {
    return PokiSDK.getURLParam('team');
}

function poki_set_team_raw(team) {
    return window.parent.postMessage({type: 'RetroBowl_teamSwitch', content: { team }}, '*');
}
