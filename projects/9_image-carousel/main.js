const contents = [
    {
        image: 'dave-hoefler-okUIdo6NxGo-unsplash.jpg',
        caption: 'Photo by Dave Hoefler on Unsplash',
        isSelected: true,
    },
    {
        image: 'sherman-yang-VBBGigIuaDY-unsplash.jpg',
        caption: 'Photo by Sherman Yang n Unsplash',
    },
    {
        image: 'jakob-owens-EwRM05V0VSI-unsplash.jpg',
        caption: 'Photo by Jakob Owens on Unsplash',
    },
    {
        image: 'finding-dan-dan-grinwis-O35rT6OytRo-unsplash.jpg',
        caption: 'Photo by Dan Grinwis on Unsplash',
    },
    {
        image: 'vincentiu-solomon-ln5drpv_ImI-unsplash.jpg',
        caption: 'Photo by Vincentiu Solomon on Unsplash',
    },
    {
        image: 'silas-baisch-Wn4ulyzVoD4-unsplash.jpg',
        caption: 'Photo by Silas Baisch on Unsplash',
    },
    {
        image: 'eugene-golovesov-EXdXp7Z4X4w-unsplash.jpg',
        caption: 'Photo by Eugene Golovesov on Unsplash',
    },
    {
        image: 'jennifer-reynolds-_8HI5xf4TkE-unsplash.jpg',
        caption: 'Photo by Jennifer reynolds on Unsplash',
    },
    {
        image: 'kellen-riggin-SIBOiXKg0Ds-unsplash.jpg',
        caption: 'Photo by Kellen Riggin on Unsplash',
    },
    {
        image: 'rafael-hoyos-weht-zhkAp8DGkxw-unsplash.jpg',
        caption: 'Photo by Rafael Hoyos on Unsplash',
    },
    {
        image: 'sonya-romanovska-wzdXhyi3AiM-unsplash.jpg',
        caption: 'Photo by Sonya Romanovska on Unsplash',
    },
];

const rightButton = document.querySelector('.right');
const leftButton = document.querySelector('.left');
const thumbnailList = document.querySelector('.thumbnails ul');
const thumbnails = thumbnailList.querySelectorAll('li');
const thumbnailTemplate = document.querySelector('#thumbnail-template');
const featureContentTemplate = document.querySelector(
    '#feature-content-template'
);

let feature = document.querySelector('.feature');

init();

function init() {
    renderSelectedFeature();
    renderThumbnails();

    leftButton.addEventListener('click', onLeftButtonClick);
    rightButton.addEventListener('click', onRightButtonClick);
    thumbnailList.addEventListener('click', onThumbnailsListClick);
}

function renderSelectedFeature() {
    const [selectedFeature] = getSelectedFeature();
    const featureContent = createFeatureContent(selectedFeature);

    feature.innerHTML = '';
    feature.appendChild(featureContent);
}

function renderThumbnails() {
    const fragment = document.createDocumentFragment();

    contents.forEach((content) => {
        const thumbnail = createThumbnail(content);

        fragment.appendChild(thumbnail);
    });

    thumbnailList.innerHTML = '';
    thumbnailList.appendChild(fragment);
}

function createThumbnail(content) {
    const thumbnail = thumbnailTemplate.content.cloneNode(true);

    const item = thumbnail.querySelector('li');
    const image = thumbnail.querySelector('img');

    if (content.isSelected) {
        item.classList.add('selected');
    }

    image.setAttribute('src', `./images/${content.image}`);

    return thumbnail;
}

function createFeatureContent(feature) {
    const featureContent = featureContentTemplate.content.cloneNode(true);

    const image = featureContent.querySelector('img');
    const caption = featureContent.querySelector('.caption');

    image.setAttribute('src', `./images/${feature.image}`);
    caption.textContent = feature.caption;

    return featureContent;
}

function selectPrevFeature() {
    const [selectedFeature, selectedFeatureIndex] = getSelectedFeature();
    const prevFeatureIndex = selectedFeatureIndex - 1;
    const prevFeature = contents[prevFeatureIndex];

    if (!prevFeature) {
        return;
    }

    selectedFeature.isSelected = false;
    prevFeature.isSelected = true;
}

function selectNextFeature() {
    const [selectedFeature, selectedFeatureIndex] = getSelectedFeature();
    const nextFeatureIndex = selectedFeatureIndex + 1;
    const nextFeature = contents[nextFeatureIndex];

    if (!nextFeature) {
        return;
    }

    selectedFeature.isSelected = false;
    nextFeature.isSelected = true;
}

function getSelectedFeature() {
    const index = contents.findIndex((content) => content.isSelected);
    const feature = contents[index];

    return [feature, index];
}

function getFeature(image) {
    return contents.find((content) => image.includes(content.image));
}

function onLeftButtonClick() {
    selectPrevFeature();
    renderSelectedFeature();
    renderThumbnails();
}

function onRightButtonClick() {
    selectNextFeature();
    renderSelectedFeature();
    renderThumbnails();
}

function onThumbnailsListClick(evt) {
    if (evt.target.tagName !== 'IMG') {
        return;
    }

    const [selectedFeature] = getSelectedFeature();
    const feature = getFeature(evt.target.src);

    selectedFeature.isSelected = false;
    feature.isSelected = true;

    renderSelectedFeature();
    renderThumbnails();
}
