const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 8081;

const authRouter = require('./routes/auth');

const app = express();

app.set('port', PORT);
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/auth', authRouter);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database Connect Success');
    })
    .catch((err) => {
        console.error(err);
    });

app.use((req, res, next) => {
    // const error = new Error("Page Not Found");
    // error.status = 404;
    res.status(404).json({
        "message": "Page Not Found"
    })
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(`express is running on ${app.get('port')}`);
});