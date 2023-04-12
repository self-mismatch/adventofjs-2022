'use strict';

const nav = document.querySelector('.nav');
const navItems = Array.from(nav.querySelectorAll('li'));
const anchors = Array.from(document.querySelectorAll('h3')).map((anchor) => ({
    anchor,
    offsetTop: anchor.offsetTop,
    navItem: navItems.find((navItem) => navItem.children[0].textContent === anchor.textContent)
}));

init();

function init() {
    document.addEventListener('scroll', onScroll);
}

function onScroll() {
    const currentScroll = document.documentElement.scrollTop;

    resetNavItems();
    setActiveNavItem(currentScroll);
}

function resetNavItems() {
    navItems.forEach((navItem) => navItem.classList.remove('selected'));
}

function setActiveNavItem(scroll) {
    const anchor = anchors.findLast((anchorPosition) => anchorPosition.offsetTop <= scroll);

    if (!anchor) {
        return;
    }

    anchor.navItem.classList.add('selected');
}
