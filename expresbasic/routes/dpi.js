var express = require("express");
var router = express.Router();
const model_dpi = require('../model/model_dpi');

var connection = require('../config/database.js');

router.get('/create', function(req, res, next){
    res.render ('dpi/create', {
        nama_dpi: '',
        luas: ''
    }); 
});

router.get('/edit/:id', function(req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM dpi WHERE id_dpi = ?', [id], function(err, rows) {
        if (err) {
            req.flash('error', 'Query gagal!');
            res.redirect('/dpi');
        } else {
            res.render('dpi/edit', {
                id: rows[0].id_dpi,
                nama_dpi: rows[0].nama_dpi,
                luas: rows[0].luas
            });
        }
    });
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM dpi WHERE id_dpi = ?', [id], function (err) {
        if (err) {
            req.flash('error', 'Gagal Menghapus data');
        } else {
            req.flash('success', 'Data terhapus!');
        }
        res.redirect("/dpi");
    });
});


router.post('/update/:id', function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_dpi, luas } = req.body;
        let data = {
            nama_dpi: nama_dpi,
            luas: luas
        };

        connection.query('UPDATE dpi SET ? WHERE id_dpi = ?', [data, id], function(err) {
            if (err) {
                req.flash('error', 'Gagal memperbarui data');
            } else {
                req.flash('success', 'Berhasil memperbarui data!');
            }
            res.redirect('/dpi');
        });
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/dpi');
    }
});


router.post('/store', function (req, res, next) {
    try {
      let { nama_dpi, luas } = req.body;
      let data = { nama_dpi, luas };
  
      connection.query("INSERT INTO dpi SET ?", data, function(err, result) {
        if (err) {
          req.flash('error', 'Gagal menyimpan data!');
          res.redirect("/dpi");
        } else {
          req.flash('success', 'Berhasil menyimpan data!');
          res.redirect("/dpi");
        }
      });
    } catch (err) {
      req.flash('error', 'Terjadi kesalahan pada fungsi');
      res.redirect("/dpi");
    }
  });
  

router.get('/', function (req, res, next){
    connection.query('SELECT * FROM dpi ORDER BY id_dpi DESC', function(err, rows){
        if(err){
            req.flash('error', err);
            res.redirect('/');
        }else{
            res.render('dpi/index',{
                data: rows
            });
        }
    });
});

module.exports = router;
