const resp = require("../public/response");

exports.sentMessage = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function sentContract(body) {
      let sql = `INSERT INTO dg_contract SET ?`;

      return new Promise((resolve) => {
        connection.query(sql, body, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function main() {
      let { body } = req;

      await sentContract(body);

      res.json(resp(true, null, null, null));
    }
    main();
  });
};
