'use strict';

const TAX_COEFFICIENT = 0.0975;
const CENTS_IN_DOLLAR = 100;

const dishes = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
    }
];

const menuElement = document.querySelector('ul.menu');
const cartElement = document.querySelector('.cart');
let cartListElement = cartElement.querySelector('.cart-summary');
const dishItemTemplate = document.querySelector('#dish-item');
const dishAddButtonTemplate = document.querySelector('#dish-add-button');
const dishInCartButtonTemplate = document.querySelector('#dish-in-cart-button');
const emptyCartTemplate = document.querySelector('#empty-cart');
const cartListTemplate = document.querySelector('#cart-list');
const cartItemTemplate = document.querySelector('#cart-item');
const cartTotalsTemplate = document.querySelector('#cart-totals');

const cart = new Map();
const prices = new Map();

init();

function init() {
    setPrices();
    renderMenu();
    renderCart();
}

function setPrices() {
    dishes.forEach((dish) => {
        prices.set(dish.name, dish.price);
    });
}

function renderMenu() {
    menuElement.innerHTML = '';

    dishes.forEach((dish) => {
        renderMenuItem(createMenuItem(dish.name));
    });
}

function renderCart() {
    if (cart.size === 0) {
        removeCartList();
        removeCartTotals();
        renderEmptyCart();

        return;
    }

    removeEmptyCart();
    renderCartList();
    renderCartTotals();
}

function renderCartList() {
    const currentCartList = cartElement.querySelector('.cart-summary');
    const newCartList = cartListTemplate.content.cloneNode(true);

    if (currentCartList) {
        cartElement.replaceChild(newCartList, currentCartList);
    } else {
        cartElement.appendChild(newCartList);
    }

    cartListElement = cartElement.querySelector('.cart-summary');

    cart.forEach((value, key) => {
        renderCartItem(createCartItem(key, value));
    });
}

function renderCartTotals() {
    const currentCartTotals = cartElement.querySelector('.totals');
    const newCartTotals = createCartTotals();

    if (currentCartTotals) {
        cartElement.replaceChild(newCartTotals, currentCartTotals);
    } else {
        cartElement.appendChild(newCartTotals);
    }
}

function renderMenuItem(item) {
    menuElement.appendChild(item);
}

function renderEmptyCart() {
    cartElement.appendChild(emptyCartTemplate.content.cloneNode(true));
}

function renderCartItem(item) {
    cartListElement.appendChild(item);
}

function removeEmptyCart() {
    const emptyCart = cartElement.querySelector('.empty');

    emptyCart?.remove();
}

function removeCartList() {
    const cartList = cartElement.querySelector('.cart-summary');

    cartList?.remove();
}

function removeCartTotals() {
    const cartTotals = cartElement.querySelector('.totals');

    cartTotals?.remove();
}

function createMenuItem(dishName) {
    const item = dishes.find((dish) => dish.name === dishName);
    const menuItem = dishItemTemplate.content.cloneNode(true);
    const button = (cart.has(dishName) ? dishInCartButtonTemplate : dishAddButtonTemplate).content.cloneNode(true);

    const image = menuItem.querySelector('img.plate');
    const content = menuItem.querySelector('.content');
    const name = content.querySelector('.menu-item');
    const price = content.querySelector('.price');

    image.src = `images/${item.image}`;
    image.alt = item.alt;
    name.textContent = item.name;
    price.textContent = `$${item.price / CENTS_IN_DOLLAR}`;

    content.appendChild(button);

    const buttonElement = content.querySelector('button');

    buttonElement.dataset.dishName = item.name;

    buttonElement.addEventListener('click', onMenuItemAddButtonClick);

    return menuItem;
}

function createCartItem(dishName, quantity) {
    const cartItem = cartItemTemplate.content.cloneNode(true);

    const item = dishes.find((dish) => dish.name === dishName);
    const image = cartItem.querySelector('img.plate');
    const name = cartItem.querySelector('.menu-item');
    const price = cartItem.querySelector('.price');
    const plateQuantity = cartItem.querySelector('.plate .quantity');
    const commonQuantity = cartItem.querySelector('.quantity__wrapper .quantity');
    const decreaseButton = cartItem.querySelector('.decrease');
    const increaseButton = cartItem.querySelector('.increase');
    const subtotal = cartItem.querySelector('.subtotal');

    image.src = `images/${item.image}`;
    image.alt = `images/${item.alt}`;
    name.textContent = item.name;
    price.textContent = `$${item.price / CENTS_IN_DOLLAR}`;
    plateQuantity.textContent = quantity;
    commonQuantity.textContent = quantity;
    decreaseButton.dataset.dishName = item.name;
    increaseButton.dataset.dishName = item.name;
    subtotal.textContent = `$${item.price * quantity / CENTS_IN_DOLLAR}`;

    decreaseButton.addEventListener('click', onCartItemDecreaseButtonClick);
    increaseButton.addEventListener('click', onCartItemIncreaseButtonClick);

    return cartItem;
}

function createCartTotals() {
    const cartTotals = cartTotalsTemplate.content.cloneNode(true);

    const subtotal = cartTotals.querySelector('.amount.subtotal');
    const tax = cartTotals.querySelector('.amount.tax');
    const price = cartTotals.querySelector('.amount.total');

    const [priceWithoutTaxes, taxes, priceWithTaxes] = calculateCartTotals();

    subtotal.textContent = `$${priceWithoutTaxes}`;
    tax.textContent = `$${taxes}`;
    price.textContent = `$${priceWithTaxes}`;

    return cartTotals;
}

function onMenuItemAddButtonClick(evt) {
    const dishName = getDishName(evt.target);
    const quantity = cart.get(dishName) ?? 1;

    cart.set(dishName, quantity);

    renderMenu();
    renderCart();
}

function onCartItemDecreaseButtonClick(evt) {
    const dishName = getDishName(evt.target);
    const quantity = cart.get(dishName) - 1;

    if (quantity <= 0) {
        cart.delete(dishName);

        renderMenu();
    } else {
        cart.set(dishName, quantity);
    }

    renderCart();
}

function onCartItemIncreaseButtonClick(evt) {
    const dishName = getDishName(evt.target);
    const quantity = cart.get(dishName) + 1;

    cart.set(dishName, quantity);

    renderCart();
}

function getDishName(element) {
    return element.dataset.dishName ?? element.parentElement.dataset.dishName;
}

function calculateCartTotals() {
    const priceWithoutTaxes = Array.from(cart).reduce((accumulator, currentValue) => {
        const [name, amount] = currentValue;
        const price = prices.get(name);

        accumulator += price * amount / CENTS_IN_DOLLAR;

        return accumulator;
    }, 0).toFixed(2);
    const taxes = (Number(priceWithoutTaxes) * TAX_COEFFICIENT).toFixed(2);
    const priceWithTaxes = (Number(priceWithoutTaxes) + Number(taxes)).toFixed(2);

    return [priceWithoutTaxes, taxes, priceWithTaxes];
}
