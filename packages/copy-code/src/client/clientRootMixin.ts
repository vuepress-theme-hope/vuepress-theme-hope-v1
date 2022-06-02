/**
 * Forked and edited from https://github.com/vxhly/vuepress-plugin-one-click-copy/blob/master/bin/clientRootMixin.js
 *
 * MIT License
 *
 * Copyright (c) 2019 vxhly <pengchengou@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * © 2019 GitHub, Inc.
 */

import Vue from "vue";
import { Message } from "./message";
import { CHECK_ICON, COPY_BUTTON, PURE_COPY_BUTTON } from "./utils";

import "./style/code.styl";
import "balloon-css";

let message: Message;

const options = CODE_COPY_OPIONS;
const locales = CODE_COPY_LOCALES;

const isMobile = (): boolean =>
  navigator
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
        navigator.userAgent
      )
    : false;

const codeCopyMinxin = Vue.extend({
  mounted(): void {
    message = new Message();

    if (!isMobile() || options.showInMobile) this.genCopyButton();
  },

  updated(): void {
    if (!isMobile() || options.showInMobile) this.genCopyButton();
  },

  methods: {
    genCopyButton(): void {
      const selector =
        options.selector ||
        '.theme-default-content div[class*="language-"] pre';

      setTimeout(() => {
        if (typeof selector === "string")
          document
            .querySelectorAll<HTMLElement>(selector)
            .forEach(this.insertCopyButton.bind(this));
        else if (Array.isArray(selector))
          selector.forEach((item) => {
            document
              .querySelectorAll<HTMLElement>(item)
              .forEach(this.insertCopyButton.bind(this));
          });
      }, options.delay || 500);
    },

    insertCopyButton(codeBlockElement: HTMLElement): void {
      if (!codeBlockElement.hasAttribute("copy-code-registerd")) {
        const copyElement = document.createElement("button");

        if (options.pure) {
          copyElement.className = "copy-code-pure-button";
          copyElement.innerHTML = PURE_COPY_BUTTON;
        } else {
          copyElement.className = "copy-code-button";
          copyElement.innerHTML = COPY_BUTTON;
        }

        copyElement.addEventListener("click", () => {
          this.copyToClipboard(codeBlockElement.innerText);
        });

        copyElement.setAttribute(
          "aria-label",
          locales[this.$localePath || "/"].hint
        );
        copyElement.setAttribute("data-balloon-pos", "left");

        if (codeBlockElement.parentElement)
          codeBlockElement.parentElement.insertBefore(
            copyElement,
            codeBlockElement
          );
        codeBlockElement.setAttribute("copy-code-registerd", "");
      }
    },

    copyToClipboard(code: string): void {
      const selection = document.getSelection();

      /** current selection */
      const selectedRange =
        selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

      const textAreaElement = document.createElement("textarea");

      textAreaElement.value = code;
      textAreaElement.setAttribute("readonly", "");
      textAreaElement.style.position = "absolute";
      textAreaElement.style.top = "-9999px";
      document.body.appendChild(textAreaElement);

      textAreaElement.select();
      document.execCommand("copy");

      if (!options.pure)
        message.pop(
          `${CHECK_ICON}<span>${
            locales[this.$localePath || "/"].copy
          } 🎉</span>`,
          options.duration
        );

      document.body.removeChild(textAreaElement);

      // recover the previous selection
      if (selectedRange && selection) {
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      }
    },
  },
});

export default codeCopyMinxin;
