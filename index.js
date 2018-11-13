

var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    path            = require('path'),
    validator       = require('express-validator'),
    morgan          = require('morgan'),
    passport        = require('passport'),
    cors            = require('cors'),

    // harmonize   = require('harmonize')(),   // needed for newest version of mongoose-schema-extend

    params      = require('./config/params'),
    connection  = require('./database');


app.listen(params.port, '0.0.0.0');

console.log('');
console.log('');
console.log('                           '+'... loading ...'.red);
console.log('');
console.log('            ___             |\\             .---.             _'.red);
console.log('           ( o )            | _\\           \\ V /            | |'.red);
console.log('           _| |_           _| |_           _| |_           _| |_'.red);
console.log('         .`_____`.       .`_____`.       .`_____`.       .`_____`.'.red);
console.log('       |\\ /     \\ /|   |\\ /     \\ /|   |\\ /     \\ /|   |\\ /     \\ /|');
console.log('       |||  @ @  |||   |||  9 9  |||   |||  6 6  |||   |||  o o  |||');
console.log('       \\_\\   =   /_/   \\_\\   -   /_/   \\_\\   o   /_/   \\_\\  ._.  /_/');
console.log('        .-\''.green+'-----\''.green+'-.     .-\''.green+'-----\''.green+'-.     .-\''.green+'-----\''.green+'-.     .-\''.green+'-----\''.green+'-.'.green);
console.log('       (_   ___   _)   (_   ___   _)   (_   ___   _)   (_   ___   _)'.green);
console.log('         | |___| |       | |___| |       | |___| |       | |___| |'.green);
console.log('         |       |       |       |       |       |       |       |'.green);
console.log('         (___|___)       (___|___)       (___|___)       (___|___)'.green);
console.log('');
console.log('                   '+' ... server online on '.green + params.port + ' ... '.green);
console.log('');
console.log('');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(validator());
app.use(express.static(path.join(__dirname) + '/webapp'));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());


require('./config/passport')(passport);

app.get('/', function(req, res) {
    res.render('index.html');
});


connection.init('sprinkle');

app.use('/api', require('./server/route/api'));