var express = require("express");
var router = express.Router();
const model_pemilik = require('../model/model_pemilik');

var connection = require('../config/database.js');

router.get('/create', function(req, res, next){
    res.render ('pemilik/create', {
        nama_pemilik: '',
        alamat: '',
        no_hp: ''
    }); 
});

router.get('/edit/:id', function(req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM pemilik WHERE id_pemilik = ?', [id], function(err, rows) {
        if (err) {
            req.flash('error', 'Query gagal!');
            res.redirect('/pemilik');
        } else {
            res.render('pemilik/edit', {
                id: rows[0].id_pemilik,
                nama_pemilik: rows[0].nama_pemilik,
                alamat: rows[0].alamat,
                no_hp: rows[0].no_hp
            });
        }
    });
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM pemilik WHERE id_pemilik = ?', [id], function (err) {
        if (err) {
            req.flash('error', 'Gagal Menghapus data');
        } else {
            req.flash('success', 'Data terhapus!');
        }
        res.redirect("/pemilik");
    });
});


router.post('/update/:id', function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_pemilik, alamat, no_hp } = req.body;
        let data = {
            nama_pemilik: nama_pemilik,
            alamat: alamat,
            no_hp: no_hp
        };

        connection.query('UPDATE pemilik SET ? WHERE id_pemilik = ?', [data, id], function(err) {
            if (err) {
                req.flash('error', 'Gagal memperbarui data');
            } else {
                req.flash('success', 'Berhasil memperbarui data!');
            }
            res.redirect('/pemilik');
        });
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/pemilik');
    }
});


router.post('/store', function (req, res, next) {
    try {
      let { nama_pemilik, alamat, no_hp } = req.body;
      let data = { nama_pemilik, alamat, no_hp };
  
      connection.query("INSERT INTO pemilik SET ?", data, function(err, result) {
        if (err) {
          req.flash('error', 'Gagal menyimpan data!');
          res.redirect("/pemilik");
        } else {
          req.flash('success', 'Berhasil menyimpan data!');
          res.redirect("/pemilik");
        }
      });
    } catch (err) {
      req.flash('error', 'Terjadi kesalahan pada fungsi');
      res.redirect("/pemilik");
    }
  });
  

router.get('/', function (req, res, next){
    connection.query('SELECT * FROM pemilik ORDER BY id_pemilik DESC', function(err, rows){
        if(err){
            req.flash('error', err);
            res.redirect('/');
        }else{
            res.render('pemilik/index',{
                data: rows
            });
        }
    });
});

module.exports = router;
