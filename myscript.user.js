// ==UserScript==
// @name         実験用広告表示（GitHubファイル表示版）
// @namespace    http://your-domain.com/
// @version      0.5
// @description  1分後にGitHub上の画像を画面下部に表示
// @author       h-maruta
// @match        https://www.asahi.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ページのロードが完了してから実行
    window.addEventListener('load', function() {
        setTimeout(function() {
            // すでに広告がある場合は重複追加しない
            if (document.getElementById('tampermonkey-ad-banner')) return;

            // コンテナ作成
            const adContainer = document.createElement('div');
            adContainer.id = 'tampermonkey-ad-banner';
            adContainer.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 120px;
                background: #ffffff;
                border-top: 1px solid #ccc;
                z-index: 999999;
                display: flex;
                justify-content: center;
                align-items: center;
                box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
            `;

            // 画像要素を作成
            const img = document.createElement('img');
            img.src = 'https://raw.githubusercontent.com/h-maruta-ai/tampermonkey-scripts-sample/e2ae628d9e9151e7b2e3309fee20a1f27f163e72/sampplefile.png';
            img.alt = '広告バナー';
            img.style.cssText = `
                max-width: 700px;
                max-height: 100px;
                object-fit: contain;
                cursor: pointer;
            `;

            // クリックで別ページに飛ばす例（任意）
            img.addEventListener('click', () => {
                window.open('https://www.jalan.net/', '_blank');
            });

            // DOMに追加
            adContainer.appendChild(img);
            document.body.appendChild(adContainer);

            console.log('✅ Tampermonkeyバナーを表示しました');
        }, 60000); // 60秒後に表示
    });
})();
