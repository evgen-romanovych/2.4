const express = require('express');
const app = express();
const PORT = 3000;

app.get('/home', (req, res) => {
    res.send('<h1>Ласкаво просимо до нашої піцерії!</h1><a href="/pizza">Замовити піцу</a>');
});

app.get('/pizza', (req, res) => {
    res.send(`
        <h1>Виберіть піцу:</h1>
        <form action="/order" method="get">
            <input type="checkbox" name="pizza" value="paperoni"> Папероні - 200 грн<br>
            <input type="checkbox" name="pizza" value="vegetarian"> Вегетаріанська - 180 грн<br>
            <input type="checkbox" name="pizza" value="hawaiian"> Гаваї - 185 грн<br>
            <button type="submit">Замовити</button>
        </form>
    `);
});

app.get('/order', (req, res) => {
    let selectedPizzas = req.query.pizza || [];
    let totalPrice = 0;

    if (!Array.isArray(selectedPizzas)) {
        selectedPizzas = [selectedPizzas];
    }

    selectedPizzas.forEach(pizza => {
        switch (pizza) {
            case 'paperoni':
                totalPrice += 200;
                break;
            case 'vegetarian':
                totalPrice += 180;
                break;
            case 'hawaiian':
                totalPrice += 185;
                break;
            default:
                break;
        }
    });

    res.send(`<h1>Ваше замовлення:</h1>
              <ul>${selectedPizzas.map(pizza => `<li>${pizza}</li>`).join('')}</ul>
              <h2>Загальна вартість: ${totalPrice} грн</h2>`);
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});