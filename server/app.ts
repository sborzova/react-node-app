const express = require('express');

const hitRouter = require('./routes/hitRouter.ts');
const feedbackRouter = require('./routes/feedbackRouter.ts');
const customerRouter = require('./routes/customerRouter.ts');
const domainRouter = require('./routes/domainRouter.ts');
const licenseRouter = require('./routes/licenseRouter.ts');
const deviceRouter = require('./routes/deviceRouter.ts');
const statisticRouter = require('./routes/statisticRouter.ts');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const {port} = require('./config.ts');

const session = require('express-session');
const Keycloak = require('keycloak-connect');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


 const uuid = require('uuid/v4');
// @ts-ignore
const crypto = require('crypto');
// @ts-ignore
const sessionSecret =  crypto.randomBytes(100);
const sequelize = require('./database.ts');

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
