// ==UserScript==
// @name         実験用広告表示（GitHubファイル表示版）
// @namespace    http://your-domain.com/
// @version      0.3
// @description  1分後にGitHub上の画像・PDFを画面下部に表示
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
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 100px;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.2);
        `;

        // 表示要素（PDFまたは画像）
        const adFrame = document.createElement('iframe');
        adFrame.src = 'https://raw.githubusercontent.com/h-maruta-ai/tampermonkey-scripts-sample/f7c693cdefa9967e7d06ccfa9e56f696f7185726/sampplefile.pdf';
        adFrame.style.cssText = `
            width: 728px;
            height: 90px;
            border: none;
        `;

        // コンテナに追加してページに挿入
        adContainer.appendChild(adFrame);
        document.body.appendChild(adContainer);
    }, 60000); // 60秒後に表示
})();
