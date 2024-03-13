var express = require("express");
var router = express.Router();
const model_kapal = require('../model/model_kapal');

var connection = require('../config/database.js');

router.get('/create', function(req, res, next){
    res.render ('kapal/create', {
        nama_kapal: '',
        id_dpi: '',
        id_alat_tangkap: '',
        id_pemilik: ''
    }); 
});

router.get('/edit/:id', function(req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM kapal WHERE id_kapal = ?', [id], function(err, rows) {
        if (err) {
            req.flash('error', 'Query gagal!');
            res.redirect('/kapal');
        } else {
            res.render('kapal/edit', {
                id: rows[0].id_kapal,
                nama_kapal: rows[0].nama_kapal,
                id_dpi: rows[0].id_dpi,
                id_alat_tangkap: rows[0].id_alat_tangkap,
                id_pemilik: rows[0].id_pemilik
            });
        }
    });
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM kapal WHERE id_kapal = ?', [id], function (err) {
        if (err) {
            req.flash('error', 'Gagal Menghapus data');
        } else {
            req.flash('success', 'Data terhapus!');
        }
        res.redirect("/kapal");
    });
});


router.post('/update/:id', function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_kapal, id_dpi, id_alat_tangkap, id_pemilik } = req.body;
        let data = {
            nama_kapal: nama_kapal,
            id_dpi: id_dpi,
            id_alat_tangkap: id_alat_tangkap,
            id_pemilik: id_pemilik
        };

        connection.query('UPDATE kapal SET ? WHERE id_kapal = ?', [data, id], function(err) {
            if (err) {
                req.flash('error', 'Gagal memperbarui data');
            } else {
                req.flash('success', 'Berhasil memperbarui data!');
            }
            res.redirect('/kapal');
        });
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/kapal');
    }
});


router.post('/store', function (req, res, next) {
    try {
      let { nama_kapal, id_dpi, id_alat_tangkap, id_pemilik } = req.body;
      let data = { nama_kapal, id_dpi, id_alat_tangkap, id_pemilik };
  
      connection.query("INSERT INTO kapal SET ?", data, function(err, result) {
        if (err) {
          req.flash('error', 'Gagal menyimpan data!');
          res.redirect("/kapal");
        } else {
          req.flash('success', 'Berhasil menyimpan data!');
          res.redirect("/kapal");
        }
      });
    } catch (err) {
      req.flash('error', 'Terjadi kesalahan pada fungsi');
      res.redirect("/kapal");
    }
  });

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM kapal LEFT JOIN dpi ON kapal.id_dpi = dpi.id_dpi LEFT JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik LEFT JOIN alat_tangkap ON kapal.id_alat_tangkap = alat_tangkap.id_alat_tangkap ORDER BY kapal.id_kapal DESC', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.redirect('/');
        } else {
            res.render('kapal/index', {
                data: rows
            });
        }
    });
});

router.get('/getdpi', function (req, res, next) {
    connection.query('SELECT * FROM dpi', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.redirect('/');
        } else {
            res.json(rows);
        }
    });
});

router.get('/getpemilik', function (req, res, next) {
    connection.query('SELECT * FROM pemilik', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.redirect('/');
        } else {
            res.json(rows);
        }
    });
});

router.get('/getalat_tangkap', function (req, res, next) {
    connection.query('SELECT * FROM alat_tangkap', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.redirect('/');
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;
