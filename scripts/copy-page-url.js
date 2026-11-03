// ==UserScript==
// @name         Copy Current URL with Cmd+Shift+C [+Option]
// @namespace    https://tampermonkey.net/
// @version      1.2.0
// @description  Copies the current page URL when Cmd+Shift+C [+Option if markdown style expected] is pressed.
// @match        *://*/*
// @grant        GM_setClipboard
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  let tipHost;
  let tip;
  let tipTimeout;

  function showTip(message) {
    const root = document.documentElement;
    if (!root) {
      document.addEventListener("DOMContentLoaded", () => showTip(message), { once: true });
      return;
    }

    if (!tipHost) {
      tipHost = document.createElement("div");
      tipHost.style.cssText = "position: fixed; top: 12px; top: max(12px, env(safe-area-inset-top)); right: 12px; right: max(12px, env(safe-area-inset-right)); z-index: 2147483647; pointer-events: none;";
      tip = document.createElement("div");
      tip.setAttribute("role", "status");
      tip.style.cssText = "padding: 8px 12px; border-radius: 6px; background: #222; color: #fff; font: 13px/1.4 system-ui, sans-serif; box-shadow: 0 2px 8px #0004;";
      tipHost.attachShadow({ mode: "closed" }).append(tip);
    }

    if (!tipHost.isConnected) root.append(tipHost);
    tip.textContent = message;
    clearTimeout(tipTimeout);
    tipTimeout = setTimeout(() => {
      tip.textContent = "";
      tipHost.remove();
    }, 1500);
  }

  window.addEventListener(
    "keydown",
    (event) => {
      if (
        event.metaKey &&
        event.shiftKey &&
        event.altKey &&
        !event.ctrlKey &&
        event.code === "KeyC" &&
        !event.repeat
      ) {
        event.preventDefault()
        event.stopImmediatePropagation()
        const pageTitle = document.title
        const hrefMdStyle = `[${pageTitle}](${window.location.href})`
        GM_setClipboard(hrefMdStyle, "text");
        showTip("Markdown link copied");
        return;
      }

      if (
        event.metaKey &&
        event.shiftKey &&
        !event.ctrlKey &&
        !event.altKey &&
        event.code === "KeyC" &&
        !event.repeat
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        GM_setClipboard(window.location.href, "text");
        showTip("Page URL copied");
        return;
      }
    },
    true,
  );
})();
