const connection = require('../config/database');

class kapal {

    static async getAll() {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM kapal LEFT JOIN dpi ON kapal.id_dpi = dpi.id_dpi LEFT JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik LEFT JOIN alat_tangkap ON kapal.id_alat_tangkap = alat_tangkap.id_alat_tangkap ORDER BY kapal.id_kapal DESC', (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    
      static async store(data) {
        return new Promise((resolve, reject) => {
          connection.query('INSERT INTO kapal SET ?', data, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
      
      static async getById(id) {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM kapal WHERE id_kapal = ' + id, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
      }
    
      static async update(id, data) {
        return new Promise((resolve, reject) => {
          connection.query('UPDATE kapal SET ? WHERE id_kapal = ' + id, data, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
    
      static async delete(id) {
        return new Promise((resolve, reject) => {
          connection.query('DELETE FROM kapal WHERE id_kapal =' + id, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
      }
}

module.exports = kapal;
