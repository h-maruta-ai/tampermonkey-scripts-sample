// ==UserScript==
// @name         実験用広告表示（GitHubファイル表示版）
// @namespace    http://your-domain.com/
// @version      0.4
// @description  1分後にGitHub上の画像を画面下部に表示
// @author       h-maruta
// @match        https://www.jalan.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 1分後に広告を表示
    setTimeout(function() {
        // コンテナを作成
        const adContainer = document.createElement('div');
        adContainer.style.cssText = `
            position:fixed;
            bottom:0;
            width:100%;
            height:100px;
            background:#f0f0f0;
            z-index:9999;
            display:flex;
            justify-content:center;
            align-items:center;
        `;

        // PNG画像を作成
        const img = document.createElement('img');
        img.src = 'https://raw.githubusercontent.com/h-maruta-ai/tampermonkey-scripts-sample/e2ae628d9e9151e7b2e3309fee20a1f27f163e72/sampplefile.png';
        img.style.height = '90px';
        img.style.width = '728px';
        img.style.objectFit = 'contain';

        // コンテナに画像を追加
        adContainer.appendChild(img);

        // ページに追加
        document.body.appendChild(adContainer);
    }, 60000); // 60秒後（60,000ミリ秒）
})();
