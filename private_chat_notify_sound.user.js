// ==UserScript==
// @name         private_chat_notify_sound
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Sound a notification when private chats are received
// @author       nagao
// @match        https://minesweeper.online/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=minesweeper.online
// @grant        none
// ==/UserScript==

{
    'use strict';

    // sound: 弾ける音(https://commons.nicovideo.jp/material/nc269086)
    const audioData = 'data:audio/wav;base64,UklGRngJAABXQVZFZm10IBAAAAABAAIAESsAACJWAAACAAgATElTVEQAAABJTkZPSUNNVCIAAABSZWNvcmRlZCBvbiAyMDIyLzA0LzA1IGluIEVkaXNvbi4ASVNGVA4AAABMYXZmNTkuMjcuMTAwAGRhdGEICQAAe3t+foODiIiNjZOTmJienqGhoKCZmYqKcnJUVDg4JSUfICssRkZjY39/nZ3BwOHh9vb8/PPz3t7BwJ6eeHhSUjEyGBkJCggJFhYuLk1OcnKXl7i41NTm5u3s5ubU1Le3kpJpaUJCIyMQEA0NGxs2N1xciIiystTU6env7+PjyMiionV1SUkmJhISDxAfIEBAbW2dncrJ6ur4+PDw1NSpqXZ2RkYhIRAQFBQuLllZi4u4uNnZ5+fe3sDAlZVmZjw8IiIfHzMzW1uPj8DA4uLt7N7dt7eCgkxMISIMDBISMjJlZZ+f09P09Pn54uKzs3h4PT0SEgAADAwyMmtrqanc3Pv6/v7l5ba2fX1GRhwcCgoTFDU1ZWWamsbG3t7e3sjIoqJ0dEtLMDApKTc3WVmEhK+v0NDe3tbWurqSkmVlPz8nKCQkNDRVVX9/p6fFxdPTzc21tZKSbGxLSzg4NzdISGVmiomrq8HByMi8vKKif39cXEJCNzc9PVRUdnabm7u7zs7Pz729nZ11dU5OMjImJi4uR0dubpmZv7/X19zczc2trIODWlo6OikqLi5FRWpqlJS5udHR19fKya2thoZeXj8/LS0sLD09W1t+fp+ft7fBwbu7qamOjnNzXV1RUVJSX191dY6Oo6OxsbOzqqqYmICAZ2dUVElJSUlTU2ZmfX2UlKalsK+xsampm5uKinl5a2tiYl9fYmJqanV1gICKipCQkpKOjoeHfn51dW9vbW1wcHd3goKQkJubpKSnp6OjmJiJiXh4Z2daWlNTU1NaWmdneXmMjJ2dqqmvr6yso6OTk4GBcHBiYltbWlpfYGpqd3eEhI+PlpaXl5SUjo6Hhn9/eXl2dnV1d3d6en5+gYGDg4ODgoJ/f3x8eHh2dnV1dnZ6en9/hYWLi5CQk5OUlJGRi4uDg3l5b29nZ2NjY2NoaHJyfn6KipWVnZ2fn5yclJSJiX19dHRubmxsb293d4CAiIiPj5GRjo6Hh35+dXVubmtrbW1zc319iIiRkZaWlpaRkYaGeHhsbGJjX19iYm1tfX2Pj6CgrKywsKurnp6Li3V1YGBRUUpKTU1ZWWtsgYGXlqenr6+traOjk5OAgG5uYmJdXWBga2t7e4uLmZmhoaGhmZmLi3p6ampeXllZXV1oaHl5jIydnaioq6ulpZiYhoZ0dGRkW1taWmJib2+AgJCPmpqenpuakZCCgnR0amplZWdocHB+foyMl5ednZyck5OFhXV1ZmZcXFpaYGBtbX5+kJCfn6ioqKihoJKSgIBubmFhWlpcXGZmdXWGhpaWoaGkpJ+fk5OEhHNzZmZeX15eZWVycoGBkJCbm6Cgnp6WloqKfHxvb2ZmYmJkZGtrdnaCgoyMlJSXl5WVj4+IiH9/eHh0dHNzdXV6eoCAhYWIiImJiIiEhH9/e3t3d3Z2d3d7e4CAhYWKioyMjIyJiYWFf395eXV1dHR1dXl5f3+FhYuLj4+QkI+OioqDg3x8dXVxcW9vcXF1dXt7gYGHh4qKjIyKioaGgYF8fHh4dnZ2dnl5fX2CgoaGiYmKioiIhYWAgHt7d3d1dXZ2eXl9fYODh4eKioqKh4eDg35+eXl1dXR0dXV5eX9/hoaMjJGRkpKQkIuLhIR9fXV1cHBubm9vc3N6eoGBiIiNjI+Pjo6Li4WFgIB7e3d3dnZ3d3p6f3+Dg4aGiIiHh4WFgYF9fXp6eHh4eHp6fn6CgoeHiYmKiomJhoaBgXx8d3d0dHNzdXV4eH19goKGhomJioqJiYaGgoJ+fnt7eXl4eXl5e3t9fX9/gYGCgoODg4OCgoKCgoKDg4ODhIODg4ODgYF/f3x8enp5eXl5enp8fICAg4OHh4qKioqJiYaGgoJ+fnp6d3d2dnd3enp/f4ODh4eKiouLioqHh4ODf397e3h4d3d3d3l5fHyAgIKChYWGhoWFhISCgoCAf39+fn19fX1+fn9/gICBgYKCgoKBgYGBgIB/f35+fn5+fn5+fn5/f39/gICAgICAgICAgIGBgYGCgoODg4OCgoKCgYGAgH9/fn59fX19fX1+fn5+gICBgYKCg4ODg4ODgoKCgoGBgIB/f35+fn5+fn9/gICAgIGBgoKCgoKCgoKBgYCAf39+fn19fX19fX5+f3+AgIKCgoKDg4ODgoKBgYCAf39+fn19fX19fX5+f3+AgIGBgYGCgoKCgYGBgYCAf39/f35+fn5/f39/gICBgYKCgoKDg4ODgoKBgYCAf39+fn5+fn5+fn9/gYGCgoODg4ODg4ODgoKBgYCAf39+fn5+fn5/f39/gICBgYGBgYGBgYGBgYGAgICAf39/f39/f39/f39/f39/f39/f39/f4CAgICBgYGBgoKBgYGBgICAgH9/fn59fX19fX1+fn9/gICBgYKCgoKCgoKCgYGAgH9/f39+fn5+fn5/f39/gICBgYGBgYGCgoKCgoKBgYGBgICAgICAf39/f39/f39/f4CAgICBgYKCgoKCgoKCgYGAgH9/f39+fn5+f39/f4CAgYGCgoKCgoKCgoGBgIB/f35+fn5+fn5+f3+AgIGBgYGCgoKCgoKBgYCAgIB/f35+fn5+fn5+f3+AgIGBgYGBgYGBgYGAgICAf39+fn5+fn5+fn9/f3+AgICAgICAgICAgICAgICAgICAgICAgICBgYGBgYGBgYGBgICAgICAf39/f39/f3+AgICAgYGBgYGBgYGBgYGBgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAf39/f39/f3+AgICAgICAgICAgICAgICAgIB/f39/f39/f39/gICAgIGBgYGBgYGBgICAgH9/f39/f39/f3+AgIGBgYGCgoKCgoKBgYCAgIB/f35+fn5+fn5+f3+AgICAgYGBgYKCgoKCgoGBgYGAgICAf39/f39/f3+AgICAgICAgICAgICAgICAgICAgIGBgYGBgYGBgYGAgH9/f39/f39/f39/f4CAgICBgYGBgYGBgYGBgICAgH9/f39/f39/f39/f4CAgICBgYCAgICAgICAgICAgICAgICAgICAgIA=';

    const audio = new Audio(audioData);

    const targetNode = document.getElementsByClassName('menu_chat_count')[1];

    const regexPattern = /^\(\d+\+?\) (\+\d+)?$/;

    let lastMessageCount = 0;

    const notify = () => {
        const match = targetNode.textContent.match(regexPattern);
        if(match) {
            const currentMessageCount = parseInt(match[1] ?? 0);
            if(currentMessageCount > lastMessageCount) {
                audio.play();
            }
            lastMessageCount = currentMessageCount;
        }
    }

    const observer = new MutationObserver(notify);

    const config = { childList: true };

    observer.observe(targetNode, config);
}
