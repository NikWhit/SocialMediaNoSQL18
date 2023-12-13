//boiler plate

const router = require('express').Router();
// const db = require('./config/connection');
// const routes = require.resolve('./routes');
const apiRoutes = require('./api');

const PORT = process.end.PORT || 3001;
const app = express();

// app.use(express.urlendcoded({ extended: true}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
        });
});

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
