const express = require('express');
const routes = require('./controllers')
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./utils/passport');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;
const path = require('path');

let cookieVar;
if(process.env.JAWSDB_URL) {
  cookieVar = process.env.JAWSDB_COOKIE;
} else {
  cookieVar = process.env.DB_COOKIE;
}

const sess = {
  secret: cookieVar,
  cookie: {
    maxAge: (1000 * 60 * 60)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening to PORT ${PORT}`));
});