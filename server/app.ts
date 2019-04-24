const moment = require('moment');
const express = require('express');
const routes = require('./routes/routes.ts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const {port} = require('./config.ts');

const session = require('express-session');
const Keycloak = require('keycloak-connect');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const memoryStore = new session.MemoryStore();
const fse = require('fs-extra');
// const https = require('https');
 const uuid = require('uuid/v4');
// @ts-ignore
const crypto = require('crypto');
const RedisStore = require('connect-redis')(session);
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

app.use('/api', kc.protect(), routes);

app.listen(port);
