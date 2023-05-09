const resp = require("../public/response");
const auth = require("../public/auth");

exports.post = (req, res, next) => {
  console.log(`post : `);
  auth.getUserId(req.headers.authorization, (id) => {
    async function createRest(sql, body) {
      return new Promise((resolve) => {
        req.getConnection((err, connection) => {
          if (err) return next(err);
          connection.query(sql, body, (err, result) => {
            if (err) return next(err);
            res.json(resp(true, null, null, null));
            // resolve(result);
          });
        });
      });
    }

    async function main() {
      var { body } = req;
      body.user_id = id;
      // let sql = ` SELECT * FROM dres_restaurant WHERE user_id =  '${id}' `;
      let sql = `INSERT INTO dres_restaurant SET ?`;

      // let foundData = await createRest(sql);
      // let foundData = await createRest(sql, body);
      console.log(`sql`, sql);
      await createRest(sql, body);

      // if (foundData.length > 0) {
      //   res.json(resp(true, foundData, null, null));
      // } else {
      //   res.send(
      //     resp(
      //       false,
      //       "Authroization Fali",
      //       "รหัสผ่านผิดพลาด",
      //       "Password is incorrect"
      //     )
      //   );
      // }
    }
    main();
  });
};

exports.getAll = (req, res, next) => {
  console.log(`getAll : `);

  auth.getUserId(req.headers.authorization, (id) => {
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
      // var { body } = req;

      let sql = ` SELECT * FROM dres_restaurant WHERE user_id =  '${id}' `;

      let foundData = await searchUser(sql);

      if (foundData.length > 0) {
        res.json(resp(true, foundData, null, null));
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
    }
    main();
  });
};

exports.generate = (req, res, next) => {
  console.log(`req.headers`, req.headers);
  auth.getUserId(req.headers.authorization, (id) => {
    console.log(`id`, id);
  });
  async function generateItems(count, creator) {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(creator(i));
    }
    return result;
  }

  async function main() {
    let results = await generateItems(3, (i) => ({
      id: i,
      title: `ชื่อกลุ่มอาหารที่ ${i}`,
      detail: `รายละเอียดกลุ่มอาหารที่ ${i}`,
      listMenu: [],
    }));
    let allListMenu = [];
    for (let [index, value] of results.entries()) {
      value.listMenu = await generateItems(10, (i) => ({
        id: `${index} : ${i}`,
        title: `${index} : ชื่ออาหารที่ ${i}`,
        // img: `https://picsum.photos/200/300?random=${index}${i}`,
        img: `https://api.lorem.space/image/burger?w=150&h=150&hash=8B7BCD${index}${i}`,
        detail: `${index} : รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่รายละเอียดอาหารที่ ${i}`,
        price: {
          type: i % 2 == 0 ? "default" : "list",
          default: i * 30,
          list: [
            { title: "s", value: i * 10 },
            { title: "m", value: i * 20 },
            { title: "l", value: i * 30 },
          ],
        },
        tags: [
          { icon: "whatshot", color: "", title: "ขายดี" },
          { icon: "whatshot", color: "", title: "ขายดี2" },
          { icon: "whatshot", color: "", title: "ขายดี2" },
          { icon: "whatshot", color: "", title: "ขายดี2" },
          { icon: "whatshot", color: "", title: "ขายดี2" },
          { icon: "whatshot", color: "", title: "ขายดี2" },
          { icon: "whatshot", color: "", title: "ขายดี2" },
          { icon: "whatshot", color: "", title: "ขายดี2" },
        ],
      }));
      allListMenu.push(...value.listMenu);
    }

    results.unshift({
      id: null,
      title: `ทั้งหมด`,
      detail: `รายการทั้งหมดที่คุณมีอยู่`,
      listMenu: allListMenu,
    });
    res.json(resp(true, results, null, null));
  }
  main();
};

exports.testGet = (req, res, next) => {
  // auth.getUserId(req.headers.authorization, (id) => {
  let sql = `SELECT * FROM du_user`;

  req.getConnection((err, connection) => {
    if (err) return next(err);
    connection.query(sql, (err, results) => {
      if (err) return next(err);
      res.json(resp(true, results[0], null, null));
    });
  });
  // });
};
