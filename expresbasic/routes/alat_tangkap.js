var express = require("express");
var router = express.Router();
const model_AlatTangkap = require('../model/model_alat_tangkap');

var connection = require('../config/database.js');

router.get('/create', function(req, res, next){
    res.render ('alat_tangkap/create', {
        nama_alat_tangkap: ''
    }); 
});

router.get('/edit/:id', function(req, res, next) {
    let id = req.params.id;

    connection.query('SELECT * FROM alat_tangkap WHERE id_alat_tangkap = ?', [id], function(err, rows) {
        if (err) {
            req.flash('error', 'Query gagal!');
            res.redirect('/alat_tangkap');
        } else {
            res.render('alat_tangkap/edit', {
                id: rows[0].id_alat_tangkap,
                nama_alat_tangkap: rows[0].nama_alat_tangkap
            });
        }
    });
});

router.get('/delete/:id', function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM alat_tangkap WHERE id_alat_tangkap = ?', [id], function (err) {
        if (err) {
            req.flash('error', 'Gagal Menghapus data');
        } else {
            req.flash('success', 'Data terhapus!');
        }
        res.redirect("/alat_tangkap");
    });
});


router.post('/update/:id', function(req, res, next) {
    try {
        let id = req.params.id;
        let { nama_alat_tangkap } = req.body;
        let data = {
            nama_alat_tangkap: nama_alat_tangkap
        };

        connection.query('UPDATE alat_tangkap SET ? WHERE id_alat_tangkap = ?', [data, id], function(err) {
            if (err) {
                req.flash('error', 'Gagal memperbarui data');
            } else {
                req.flash('success', 'Berhasil memperbarui data!');
            }
            res.redirect('/alat_tangkap');
        });
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan pada fungsi');
        res.redirect('/alat_tangkap');
    }
});


router.post('/store', function (req, res, next) {
    try {
      let { nama_alat_tangkap } = req.body;
      let data = { nama_alat_tangkap };
  
      connection.query("INSERT INTO alat_tangkap SET ?", data, function(err, result) {
        if (err) {
          req.flash('error', 'Gagal menyimpan data!');
          res.redirect("/alat_tangkap");
        } else {
          req.flash('success', 'Berhasil menyimpan data!');
          res.redirect("/alat_tangkap");
        }
      });
    } catch (err) {
      req.flash('error', 'Terjadi kesalahan pada fungsi');
      res.redirect("/alat_tangkap");
    }
  });
  

router.get('/', function (req, res, next){
    connection.query('SELECT * FROM alat_tangkap ORDER BY id_alat_tangkap DESC', function(err, rows){
        if(err){
            req.flash('error', err);
            res.redirect('/');
        }else{
            res.render('alat_tangkap/index',{
                data: rows
            });
        }
    });
});

module.exports = router;
