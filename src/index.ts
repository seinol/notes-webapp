import express from 'express';
import session from 'express-session';
import path from 'path';
import router from './routes/router';
import expressHbs from 'express-handlebars';
import appConfigs from './config/app';

const app = express();
app.disable('x-powered-by');

const hbs = expressHbs.create({
    helpers: {
        'displayDate'(date: Date) {
            return date.toISOString().substring(0, 10);
        },
        'equal'(first: string, second: string, options: any) {
            return first === second ? options.fn() : options.inverse()
        },
        'equalNumber'(first: number, second: number, options: any) {
            return first === second ? options.fn() : options.inverse()
        }
    }
})

app.engine('handlebars', hbs.engine);
app.set('views', path.resolve('src/views'));
app.set('view engine', 'handlebars');

app.use(session({
    secret: appConfigs.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(path.resolve(), 'src/public')));

app.use(router);

app.listen(appConfigs.PORT, appConfigs.HOST, () => {
    console.log(`Server is running at http://${appConfigs.HOST}:${appConfigs.PORT}`);
});
