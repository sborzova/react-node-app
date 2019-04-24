const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const {port} = require('./config');

const session = require('express-session');
const Keycloak = require('keycloak-connect');

const memoryStore = new session.MemoryStore();
const fse = require('fs-extra');
// const https = require('https');
// const uuid = require('uuid/v4');
const crypto = require('crypto');
const RedisStore = require('connect-redis')(session);
const sessionSecret =  crypto.randomBytes(100);
const app = express();

const options = {
    genid: () => uuid(),
    secret: sessionSecret.toString(),
    name: 'kSessionId',
    resave: true,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        secure: true,
    }
};
const store = session.MemoryStore();

const kc = new Keycloak({store: store});

app.use(session({
    store : store,
    secret: sessionSecret.toString(),
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     sameSite: true,
    //     secure: true,
    // }
}));
//

app.use(bodyParser.json());
app.use(kc.middleware());

app.use('/api', kc.protect(), routes);

app.listen(port);
