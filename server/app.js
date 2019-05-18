const express = require('express');

const hitRouter = require('./routes/hitRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const customerRouter = require('./routes/customerRouter');
const domainRouter = require('./routes/domainRouter');
const licenseRouter = require('./routes/licenseRouter');
const deviceRouter = require('./routes/deviceRouter');
const statisticRouter = require('./routes/statisticRouter');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const {port} = require('./config');

const session = require('express-session');
const Keycloak = require('keycloak-connect');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


 const uuid = require('uuid/v4');
// @ts-ignore
const crypto = require('crypto');
// @ts-ignore
const sessionSecret =  crypto.randomBytes(100);
const sequelize = require('./database');

const app = express();

app.use(helmet());
app.use(cookieParser());

const store = new SequelizeStore({
    db: sequelize
});

const kc = new Keycloak({store: store});

app.use(session({
    genid: () => uuid(),
    store : store,
    secret: sessionSecret.toString(),
    name: 'sessionId',
    resave: true,
    saveUninitialized: true,
    cookie: {
        sameSite: true,
        secure: true,
    }
}));

store.sync();

app.use(bodyParser.json());
app.use(kc.middleware());

app.use('/api', kc.protect(), hitRouter);
app.use('/api', kc.protect(), feedbackRouter);
app.use('/api', kc.protect(), customerRouter);
app.use('/api', kc.protect(), domainRouter);
app.use('/api', kc.protect(), deviceRouter);
app.use('/api', kc.protect(), licenseRouter);
app.use('/api', kc.protect(), statisticRouter);

app.listen(port);
