
// ==UserScript==
// @name         GeoGuessr right click zoom v1.0
// @namespace    GeoGuessr scripts
// @version      1.0
// @description  Zoom with right mouse button
// @include      https://www.geoguessr.com/*
// @grant        none
// @license      GNU
// ==/UserScript==

 (function(){
    let interval = null;
    let _dir = 1200;

    function doZoom(e){
        if (e.which != 3) return;
        e.stopImmediatePropagation();

        clearInterval(interval);

        let evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("wheel", true, true, window, 0, 0, 0, e.x, e.y, false, false, false, false, 0, null);
        //if (e.which == 3) evt.deltaY = +120;
        //if (e.which == 2) evt.deltaY = -120;
        this._dir = this._dir == 1200? -1200: 1200;
        evt.deltaY = this._dir;

        this.dispatchEvent(evt);

        interval = setInterval(function(){
           this.dispatchEvent(evt);
        }.bind(this), 200);

        let tint = interval;

        setTimeout(function(){
            clearInterval(tint);
        }, 1100);
    }
   
    let checkForCanvasTimer = setInterval(function zzzz(){
        let el = document.querySelector('canvas');
        if (!el) return; // No canvas yet.

       // clearInterval(checkForCanvasTimer);

        if (!el._dir){
            el.addEventListener("mousedown", doZoom);
            el._dir = 1200;
        }

        el = document.querySelector('.guess-map__canvas .gm-style').querySelector('[aria-label="Map"]');
        if (!el) return; // No map yet.

        if (!el._dir){
            el.addEventListener("mousedown", doZoom);
            el._dir = 1200;
        }
   }, 2000);
})();
