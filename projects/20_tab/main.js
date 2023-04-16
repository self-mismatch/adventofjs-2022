'use strict';

const episodes = [
    {
        id: 39,
        title: 'Tech to Look Forward to in 2022',
        description: 'In this episode, Amy and James discuss the future of web development: Astro, Veet, Supabase, SvelteKit, Redwood.js, Blitz.js, GitHub Co-Pilot, Web Assembly, Blockchain, w3, no-code, and low-code.',
        cover: 'cover__episode-39.png',
        link: 'https://www.compressed.fm/episode/39'
    },
    {
        id: 38,
        title: '2021 Gift Guide',
        description: 'This episode is full of picks! Amy and James talk about all of their favorite things, just in time for the holidays.',
        cover: 'cover__episode-38.png',
        link: 'https://www.compressed.fm/episode/38'
    },
    {
        id: 37,
        title: 'Building a Course',
        description: 'In this episode, Amy and James discuss all the things that go into course creation: why? What? How? Where to Host? Building the right audience.',
        cover: 'cover__episode-37.png',
        link: 'https://www.compressed.fm/episode/37'
    },
    {
        id: 36,
        title: 'SVGs FTW',
        description: 'In this episode, Amy and James discuss all things SVGs: what is, why and when to reach for it, and seven different ways to get an SVG on the page, and the pros and cons of each method.',
        cover: 'cover__episode-36.png',
        link: 'https://www.compressed.fm/episode/36'
    },
    {
        id: 35,
        title: 'Crossover Episode with Purrfect Dev',
        description: 'This is a crossover episode with our friends, Alex Patterson and Brittney Postma from the Purrfect.dev podcast. In this episode, we all discuss our jobs. Even though we\'re all in tech, our day- to - day work looks vastly different.',
        cover: 'cover__episode-35.png',
        link: 'https://www.compressed.fm/episode/35'
    },
    {
        id: 34,
        title: 'Getting git',
        description: 'In this episode, Amy and James explain the fundamentals of git and their most-used commands. They also explain basic different workflows, if you\'re working with a team or by yourself.',
        cover: 'cover__episode-34.png',
        link: 'https://www.compressed.fm/episode/34'
    },
    {
        id: 33,
        title: 'Small Design Tweaks that Make All the Difference',
        description: 'In this episode, Amy and James talk about small design tweaks that you can make that will make a big difference. These recommendations are helpful if you\'re looking for basic principles and guidelines to take your site to the next level.',
        cover: 'cover__episode-33.png',
        link: 'https://www.compressed.fm/episode/33'
    },
];

const tabList = document.querySelector('.tab-list');
const content = document.querySelector('.content');
const tabItemTemplate = document.querySelector('#tab-item');
const tabContentTemplate = document.querySelector('#tab-content');

let currentEpisode = episodes[0];

init();

function init() {
    renderTabs();
    renderContent(currentEpisode);

    tabList.addEventListener('click', onTabListClick);
}

function changeTab(episodeId) {
    const episode = episodes.find((episode) => episode.id === episodeId);

    content.innerHTML = '';
    renderContent(episode);
}

function renderTabs() {
    const fragment = document.createDocumentFragment();

    episodes.forEach((episode) => {
        const tabItem = tabItemTemplate.content.cloneNode(true);
        const item = tabItem.querySelector('li');
        const number = item.querySelector('.number');
        const title = item.querySelector('.title');

        number.textContent = `Episode ${episode.id}`;
        title.textContent = episode.title;

        if (currentEpisode.id === episode.id) {
            item.classList.add('tab-item--selected');
        }

        item.dataset.episodeId = episode.id;

        fragment.appendChild(tabItem);
    });

    tabList.appendChild(fragment);
}

function renderContent(episode) {
    const tabContent = tabContentTemplate.content.cloneNode(true);
    const image = tabContent.querySelector('.image');
    const title = tabContent.querySelector('.title');
    const description = tabContent.querySelector('.description');
    const link = tabContent.querySelector('.more');

    image.src = `./images/${episode.cover}`;
    image.alt = `Episode ${episode.id}`;
    title.textContent = episode.title;
    description.textContent = episode.description;
    link.href = episode.link;

    content.appendChild(tabContent);
}

function resetTabList() {
    Array.from(tabList.querySelectorAll('li')).forEach((tabItem) => {
        tabItem.classList.remove('tab-item--selected');
    });
}

function onTabListClick(evt) {
    const item = evt.target.closest('li');

    if (!item) {
        return;
    }

    resetTabList();

    item.classList.add('tab-item--selected');

    changeTab(Number(item.dataset.episodeId));
}
