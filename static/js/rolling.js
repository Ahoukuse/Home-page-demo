var rollingSpans = [];
var currRollingSpan = 0;
var prevRollingSpan = -1;
const RollingCurrAttr = 'data-show-curr';
const RollingPrevAttr = 'data-show-prev';
const RollingInterval = 2000;

window.addEventListener('DOMContentLoaded',main);

function rolling() {
    if (prevRollingSpan != -1) {
        rollingSpans[prevRollingSpan].removeAttribute(RollingPrevAttr);
    }
    prevRollingSpan = currRollingSpan;
    currRollingSpan = (currRollingSpan + 1) % rollingSpans.length;
    rollingSpans[currRollingSpan].setAttribute(RollingCurrAttr, '');
    rollingSpans[prevRollingSpan].removeAttribute(RollingCurrAttr);
    rollingSpans[prevRollingSpan].setAttribute(RollingPrevAttr, '');
}

function main() {
    rollingSpans = Array.from(document.querySelectorAll('.mask > span'));
    setInterval(rolling, RollingInterval);
}