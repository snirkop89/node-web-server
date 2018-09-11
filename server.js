const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to apeend to server.log.')
        }
    });

    // oNly after next the app wil continue to run
    next();
});

// app.use((req, res, next) => {
//     res.render('maintanence.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome beautiful user to my site'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Portfolio'
    });
});

// /bad, send json with error message prop
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to Connect'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});