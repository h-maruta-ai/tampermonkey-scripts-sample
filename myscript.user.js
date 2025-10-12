// ==UserScript==
// @name         実験用広告表示
// @namespace    http://your-domain.com/
// @version      0.1
// @description  1分後に広告を表示
// @author       h-maruta
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 1分後に広告を表示
    setTimeout(function() {
        // 広告要素を作成
        const ad = document.createElement('div');
        ad.innerHTML = 'あなたの広告内容';
        ad.style.cssText = 'position:fixed; bottom:0; width:100%; height:100px; background:#f0f0f0; z-index:9999;';
        // ページに追加
        document.body.appendChild(ad);
    }, 60000); // 60秒 = 60000ミリ秒
})();
