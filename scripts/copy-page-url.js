// ==UserScript==
// @name         Copy Current URL with Cmd+Shift+C [+Option]
// @namespace    https://tampermonkey.net/
// @version      1.1.0
// @description  Copies the current page URL when Cmd+Shift+C [+Option if markdown style expected] is pressed.
// @match        *://*/*
// @grant        GM_setClipboard
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

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
        return;
      }
    },
    true,
  );
})();
