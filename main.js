// load modules
const { json } = require('express');
const express = require('express');
const handlebars = require('express-handlebars');

// configure environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;
// const myCart = [];

// create an instance of express
const app = express();

// configure hbs
app.engine('hbs', handlebars({ defaultLayout: 'default.hbs' }));
app.set('view engine', 'hbs');

// configure routes
app.get(['/', '/index.html'], (req, res) => {
    const cart = [];
    res.status(200);
    res.type('text/html');
    res.render('index', {
        cartState: JSON.stringify(cart)
    });
});

app.post('/',
    express.urlencoded({ extended: true }),
    (req, res) => {
        // console.info('Body: ', req.body);
       
        // myCart.push(req.body);

        const cart = JSON.parse(req.body.cartState);
        cart.push({
            item: req.body.item,
            qty: req.body.qty,
            price: req.body.price,
        });

        res.status(201);
        res.type('text/html');
        res.render('index', { 
            cartState: JSON.stringify(cart),
            myCart: cart
        });
    }
);

app.use(express.static(__dirname + '/static'));

// start server
app.listen(PORT, () => console.info(`Application started on port ${PORT} at ${new Date()}`));