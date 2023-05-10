const resp = require("../public/response");
const moment = require("moment");

exports.getAll = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function createStockQuery(date_start, date_end) {
      let sql = `SELECT * FROM dg_contract WHERE DATE(date_create) BETWEEN DATE('${date_start}') AND DATE('${date_end}')`;
      return new Promise((resolve) => {
        connection.query(sql, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function main() {
      let user_id = await auth.getUserId(req.headers.authorization);
      let date_start = req.query.date_start || "2020-01-01";
      let date_end = req.query.date_end || "3030-01-01";
      let results = await createBranchQuery(date_start, date_end);

      res.json(resp(true, results, null, null));
    }
    main();
  });
};

exports.getDetails = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function getDetailsContact(id) {
      let sql = `SELECT * FROM dg_contract WHERE id = ${id}`;
      return new Promise((resolve) => {
        connection.query(sql, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function main() {
      let user_id = await auth.getUserId(req.headers.authorization);
      let id = req.params.id;
      let results = await getDetailsContact(id);

      res.json(resp(true, results, null, null));
    }
    main();
  });
};

exports.changeStatus = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function changeStatusContract(id, body) {
      let sql = `UPDATE dg_contract SET ? WHERE id = ${id}`;

      body = {
        status: body.status,
        remark: body.remark,
        date_update: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      return new Promise((resolve) => {
        connection.query(sql, body, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function main() {
      let user_id = await auth.getUserId(req.headers.authorization);
      let id = req.params.id;
      let { body } = req;

      await changeStatusContract(id, body);

      res.json(resp(true, null, null, null));
    }
    main();
  });
};
