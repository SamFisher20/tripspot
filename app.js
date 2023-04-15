if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');

const expressError = require('./utility/expressError.js');
const user = require('./model/user.js')

const methodOverride = require('method-override');

const CollectionTripspot = require('./model/toursite');
const Review = require('./model/review.js');

const tripspotRoutes = require('./routes/tripspot.js');
const userRoutes = require('./routes/users.js')
const reviewRoutes = require('./routes/reviews.js');

const { initialize } = require('passport');
const { strict } = require('assert');

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/trip-spot'
mongoose.connect(dbUrl, {   //connecting with mongoosedb
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')   //for using the templating lang. to work with
app.set('views', path.join(__dirname, 'views')) //will help to access the required directory from anywhere

app.use(express.urlencoded({ extended: true })) //parsing the response recieved as POST request
app.use(methodOverride('_method'))  //mthod overriding of connection paths
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize())

const secret = process.env.SECRET || "thisshouldntbeseebyanyone"

const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60 //24 hours
});

store.on('error', e => {
    console.log('SESSION STORE ERROR', e);
});

app.set('trust proxy', 1);

const sessionConfig = {
    store,
    name: "_eyh89uyioTiiu3",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        // session expires in 8 days:
        expires: Date.now() + 1000 * 60 * 60 * 24 * 8,
        maxAge: 1000 * 60 * 60 * 24 * 8
    }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(helmet());


app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(user.authenticate()))

passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())


const scriptSrcUrls = [
    "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
    "https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [
    "fonts.gstatic.com",
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/samfisher/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


app.use((req, res, next) => {
    res.locals.currUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})


app.get('/', (req, res) => {
    res.render('home')
})

app.use('/', userRoutes)
app.use('/toursite', tripspotRoutes)

app.use('/toursite/:id/reviews', reviewRoutes)


app.all('*', (res, req, next) => {
    next(new expressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    if (!err.status) err.status = 400;
    if (!err.message) err.message = 'Unknown error caught';
    res.render('error', {
        err
    });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
})