import express from 'express';
import session from 'express-session';
import path from 'path';
import router from './router';
import expressHbs from 'express-handlebars';
import appConfigs from './config/app';

const app = express();
app.disable('x-powered-by');

const hbs = expressHbs.create({
    helpers: {
        displayDate: function (date: string) {
            return new Date(date).toISOString().substring(0, 10);
        }
    }
})

app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(session({
    secret: appConfigs.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

app.listen(appConfigs.PORT, appConfigs.HOST, () => {
    console.log(`Server is running at http://${appConfigs.HOST}:${appConfigs.PORT}`);
});
