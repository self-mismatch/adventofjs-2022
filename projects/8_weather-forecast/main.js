'use strict';

const mockWeatherForecast = [
    {
        dayOfMonth: 8,
        dayOfWeek: 'Monday',
        temperature: {
            max: 74,
            min: 22,
        },
        precipitation: 'Cloudy',
        precipitationPercent: 25,
    },
    {
        dayOfMonth: 9,
        dayOfWeek: 'Tuesday',
        temperature: {
            max: 80,
            min: 32,
        },
        precipitation: 'Sunny',
        precipitationPercent: 0,
    },
    {
        dayOfMonth: 10,
        dayOfWeek: 'Wednesday',
        temperature: {
            max: 60,
            min: 15,
        },
        precipitation: 'Stormy',
        precipitationPercent: 10,
    },
    {
        dayOfMonth: 11,
        dayOfWeek: 'Thursday',
        precipitation: 'Snowy',
        precipitationPercent: 100,
        temperature: {
            max: 41,    
            min: 2,
        },
    },
    {
        dayOfMonth: 12,
        dayOfWeek: 'Friday',
        temperature: {
            max: 55,
            min: 17,
        },
        precipitation: 'PartlyCloudy',
        precipitationPercent: 45,
    },
    {
        dayOfMonth: 13,
        dayOfWeek: 'Saturday',
        temperature: {
            max: 48,
            min: 12,
        },
        precipitation: 'Rainy',
        precipitationPercent: 90,
    },
    {
        dayOfMonth: 14,
        dayOfWeek: 'Sunday',
        temperature: {
            max: 74,
            min: 29,
        },
        precipitation: 'Sunny',
        precipitationPercent: 15,
    },
];

const Precipitation = {
    Cloudy: 'cloudy',
    PartlyCloudy: 'partly-cloudy',
    Rainy: 'rainy',
    Snowy: 'snowy',
    Stormy: 'stormy',
    Sunny: 'sunny',
};

const DayOfWeek = {
    Monday: 'MON',
    Tuesday: 'TUE',
    Wednesday: 'WED',
    Thursday: 'THUR',
    Friday: 'FRI',
    Saturday: 'SAT',
    Sunday: 'SUN',
};

const WeatherImageSize = {
    Cloudy: {
        width: 264,
        height: 166,
        viewBox: '0 0 264 166',
    },
    PartlyCloudy: {
        width: 230,
        height: 209,
        viewBox: '0 0 230 209',
    },
    Rainy: {
        width: 160,
        height: 222,
        viewBox: '0 0 160 222',
    },
    Snowy: {
        width: 230,
        height: 196,
        viewBox: '0 0 230 196',
    },
    Stormy: {
        width: 246,
        height: 187,
        viewBox: '0 0 246 187',
    },
    Sunny: {
        width: 208,
        height: 213,
        viewBox: '0 0 208 213',
    },
};

const wrapper = document.querySelector('.wrapper');
const dayTemplate = document.querySelector('#day-template');

init();

function init() {
    renderWeatherForecast();
}

function renderWeatherForecast() {
    const fragment = document.createDocumentFragment();

    mockWeatherForecast.forEach((dayForecast) => {
        fragment.appendChild(createWeatherForecastDay(dayForecast));
    });

    wrapper.appendChild(fragment);
}

function createWeatherForecastDay(dayForecast) {
    const day = dayTemplate.content.cloneNode(true);
    
    const dayOfWeek = day.querySelector('.day-of-week');
    const dayOfMonth = day.querySelector('.date');
    const bar = day.querySelector('.bar');
    const imageContainer = bar.querySelector('.weather');
    const maxTemperature = bar.querySelector('.max-temperature');
    const precipitationPercent = bar.querySelector('.precipitation-percent');
    const minTemperature = bar.querySelector('.min-temperature');

    bar.classList.add(Precipitation[dayForecast.precipitation]);
    dayOfWeek.textContent = DayOfWeek[dayForecast.dayOfWeek];
    dayOfMonth.textContent = dayForecast.dayOfMonth;
    maxTemperature.textContent = dayForecast.temperature.max;
    precipitationPercent.textContent = dayForecast.precipitationPercent;
    minTemperature.textContent = dayForecast.temperature.min;

    imageContainer.appendChild(createWeatherImage(dayForecast.precipitation));

    return day;
}

function createWeatherImage(precipitation) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    const { width, height, viewBox } = WeatherImageSize[precipitation];

    svg.setAttribute('role', 'img');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', viewBox);
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${Precipitation[precipitation]}`);

    svg.appendChild(use);

    return svg;
}