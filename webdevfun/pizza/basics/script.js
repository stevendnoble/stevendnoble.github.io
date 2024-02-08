document.getElementById('toppingButton').addEventListener('click', function() {
    const toppings = [
        'Pepperoni',
        'Mushrooms',
        'Onions',
        'Sausage',
        'Bacon',
        'Extra cheese',
        'Black olives',
        'Green peppers',
        'Pineapple',
        'Spinach'
    ];

    const randomTopping = toppings[Math.floor(Math.random() * toppings.length)];
    document.getElementById('toppingSuggestion').innerText = `How about some ${randomTopping}?`;
});