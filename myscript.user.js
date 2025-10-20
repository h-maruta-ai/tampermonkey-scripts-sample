// ==UserScript==
// @name         実験用広告表示（URL変化対応版）
// @namespace    http://your-domain.com/
// @version      0.6
// @description  朝日新聞デジタルで記事遷移しても常に広告を表示
// @author       h-maruta
// @match        https://www.asahi.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 広告を挿入する関数
    function insertBanner() {
        // 既に存在していればスキップ
        if (document.getElementById('tampermonkey-ad-banner')) return;

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

        const img = document.createElement('img');
        img.src = 'https://raw.githubusercontent.com/h-maruta-ai/tampermonkey-scripts-sample/e2ae628d9e9151e7b2e3309fee20a1f27f163e72/sampplefile.png';
        img.alt = '広告バナー';
        img.style.cssText = `
            max-width: 700px;
            max-height: 100px;
            object-fit: contain;
            cursor: pointer;
        `;

        img.addEventListener('click', () => {
            window.open('https://www.jalan.net/', '_blank');
        });

        adContainer.appendChild(img);
        document.body.appendChild(adContainer);
        console.log('✅ Tampermonkeyバナーを表示しました');
    }

    // ページ読み込み後に最初の広告表示（1分後）
    window.addEventListener('load', function() {
        setTimeout(insertBanner, 60000);
    });

    // URL変化を監視して再挿入する（SPA対応）
    let lastUrl = location.href;
    new MutationObserver(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            console.log('🔄 URL変化を検知:', currentUrl);
            // ページ遷移後にも1分待たず表示したい場合は即時
            insertBanner();
        }
    }).observe(document, {subtree: true, childList: true});
})();
