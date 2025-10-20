// ==UserScript==
// @name         実験用広告表示（サイト内遷移対応版）
// @namespace    http://your-domain.com/
// @version      0.6
// @description  初回1分後にGitHub上の画像を表示し、サイト内遷移後も表示を維持
// @author       h-maruta
// @match        https://www.asahi.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const STORAGE_KEY = 'tampermonkey_ad_shown_at';
    const DELAY_MS = 60000; // 60秒

    // 広告を表示する関数
    function showAd() {
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

        // クリックで別ページに飛ばす
        img.addEventListener('click', () => {
            window.open('https://www.jalan.net/', '_blank');
        });

        // DOMに追加
        adContainer.appendChild(img);
        document.body.appendChild(adContainer);

        console.log('✅ Tampermonkeyバナーを表示しました');
    }

    // 初期化処理
    function init() {
        const shownAt = sessionStorage.getItem(STORAGE_KEY);
        const now = Date.now();

        if (shownAt) {
            // すでに表示済みの場合は即座に表示
            const elapsed = now - parseInt(shownAt, 10);
            if (elapsed >= DELAY_MS) {
                showAd();
            } else {
                // まだ1分経過していない場合は残り時間後に表示
                setTimeout(showAd, DELAY_MS - elapsed);
            }
        } else {
            // 初回訪問時は1分後に表示
            sessionStorage.setItem(STORAGE_KEY, now.toString());
            setTimeout(() => {
                showAd();
                // 表示完了時刻を記録
                sessionStorage.setItem(STORAGE_KEY, (Date.now() - DELAY_MS).toString());
            }, DELAY_MS);
        }
    }

    // ページロード時に実行
    window.addEventListener('load', init);

    // SPA遷移対応：URL変化を検知して広告を再表示
    let currentUrl = location.href;
    const observer = new MutationObserver(() => {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            console.log('🔄 ページ遷移を検知:', currentUrl);
            
            // 既存の広告を削除
            const existingAd = document.getElementById('tampermonkey-ad-banner');
            if (existingAd) {
                existingAd.remove();
            }
            
            // 条件を満たしていれば再表示
            const shownAt = sessionStorage.getItem(STORAGE_KEY);
            if (shownAt && (Date.now() - parseInt(shownAt, 10)) >= DELAY_MS) {
                // 少し遅延させてDOM構築を待つ
                setTimeout(showAd, 500);
            }
        }
    });

    observer.observe(document, { subtree: true, childList: true });

})();
