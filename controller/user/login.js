const resp = require("../public/response");
let bcrypt = require("bcrypt");
const auth = require("../public/auth");

//
const passport = require("passport");

const jwt = require("jwt-simple");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
// ------------------- Authorization ------------------- //
exports.requireAuth = passport.authenticate("jwt", {
  session: false,
});
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SALT,
  passReqToCallback: true,
};

const jwtAuth = new JwtStrategy(jwtOptions, function (req, payload, done) {
  return done(null, true);
});

passport.use(jwtAuth);

exports.register = (req, res, next) => {
  let { body } = req;
  delete body.cfPassword;
  delete body.error;
  let sql_check = `SELECT id FROM du_user WHERE email = '${body.email}'`;
  req.getConnection((err, connection) => {
    if (err) return next(err);
    connection.query(sql_check, (err, check) => {
      if (err) return next(err);
      if (check.length > 0) {
        res.json(
          resp(
            false,
            null,
            "ชื่อผู้ใช้งานนี้ถูกใช้ไปแล้ว กรุณาเปลี่ยนใหม่",
            "This email is already registered"
          )
        );
      } else {
        bcrypt.hash(body.password, 10, function (err, hash) {
          body.password = hash;

          let sql = `INSERT INTO du_user SET ?`;

          connection.query(sql, body, (err, new_user) => {
            if (err) return next(err);
            console.log(`err`, err);
            // let newUserId = new_user.rows[0].id;
            res.json(resp(true, null, null, null));
          });
        });
      }
    });
  });
};

exports.login = (req, res, next) => {
  async function searchUser(sql) {
    return new Promise((resolve) => {
      req.getConnection((err, connection) => {
        if (err) return next(err);
        connection.query(sql, (err, result) => {
          if (err) return next(err);
          resolve(result);
        });
      });
    });
  }

  async function main() {
    var { body } = req;
    var email = body.email.toLowerCase();
    var password = body.password;

    let sql = ` SELECT * FROM du_user WHERE lower(email) =  '${email}'`;

    let foundData = await searchUser(sql);
    // console.log(`foundData`, foundData);

    if (foundData.length > 0) {
      let isPasswordCorrect = false;
      let buffer = [];
      for (const elmUSer of foundData) {
        const validPassword = await bcrypt.compare(password, elmUSer.password);

        if (validPassword) {
          isPasswordCorrect = true;
        }
        let payload = {
          id: elmUSer.id,
          type: elmUSer.pagage_id,
          iat: Math.floor(Date.now() / 1000),
        };

        token = jwt.encode(payload, process.env.SALT);
        let objUser = {
          ...elmUSer,
          token: token,
        };

        buffer.push(objUser);
      }

      if (isPasswordCorrect) {
        res.json(resp(true, buffer[0], null, null));
      } else {
        res.send(
          resp(
            false,
            "Authroization Fali",
            "รหัสผ่านผิดพลาด",
            "Password is incorrect"
          )
        );
      }
    } else {
      res.send(
        resp(
          false,
          "Authroization Fali",
          "ชื่อผู้ใช้ หรือ รหัสผ่านผิดพลาด",
          "Username or Password is incorrect"
        )
      );
    }
  }
  main();
};
