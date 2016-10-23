var router = require('express').Router();
var pg = require('pg');
var config = {
    database: 'rho'
};
var pool = new pg.Pool(config);

router.get('/', function(req, res) {
    pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting to the DB', err);
                res.sendStatus(500);
                return;
            }
            client.query('SELECT * FROM favorites;', function(err, result) {
                if (err) {
                    console.log('Error querying the DB', err);
                    res.sendStatus(500);
                    return;
                }
                console.log('Got rows from the DB:', result.rows);
                res.send(result.rows);
            });
        } finally {
            done();
        }
    });
});

router.post('/', function(req, res) {
    pool.connect(function(err, client, done) {
        try {
            if (err) {
                console.log('Error connecting the DB', err);
                res.sendStatus(500);
                return;
            }
            client.query('INSERT INTO favorites (gif_url, user_comment) VALUES ($1, $2) returning *;', [req.body.gif_url, req.body.user_comment],
                function(err, result) {
                    if (err) {
                        console.log('Error querying the DB', err);
                        res.sendStatus(500);
                        return;
                    }
                    console.log('Got rows from the DB:', result.rows);
                    res.send(result.rows);
                });
        } finally {
            done();
        }
    });
});



module.exports = router;