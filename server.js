const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log.');
		}
	});
	next();
});

// app.use((req, res) => {
	// res.render('maintenance.hbs');
// });

// this middleware needs to be declared last if static files are to be covered by the other middleware
app.use(express.static(__dirname + '/public'));


/* app.get('/', (req, res) => {
	// res.send('<h1>Hello Express!</h1>');
	res.send({
		name: 'Andrew',
		likes: [
			'pizza',
			'marmalade'
		]
	});
}); */

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the site!',
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad request!'
	});
});

app.listen(3000, () => {
	console.log('The server is up on port 3000');
});