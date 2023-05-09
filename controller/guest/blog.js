const resp = require("../public/response");

exports.getAll = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function getBlogs() {
      // let sql = `SELECT * FROM ds_blog ;

      const results = [
        {
          title:
            "Boost Your Productivity with Keyboard Automation using Python",
          img_url: "",
          tags: ["python", "tools", "tools-1", "tools-2", "tools-3", "tools-4"],
          details: "",
          likes: 1,
          views: 3,
          link: "boost-your-productivity-with-keyboard-automation-using-python",
          date_create: "30/04/2023 15:20",
        },
        {
          title: "Find thai word by python",
          img_url: "",
          tags: ["python", "tools"],
          details: "",
          likes: 0,
          views: 0,
          link: "something_2",
          date_create: "30/04/2023 15:20",
        },
        {
          title: "lllllll",
          img_url: "",
          tags: ["python", "tools"],
          details: "",
          likes: 0,
          views: 0,
          link: "something_3",
          date_create: "30/04/2023 15:20",
        },
        {
          title: "lllllll",
          img_url: "",
          tags: ["python", "tools"],
          details: "",
          likes: 0,
          views: 0,
          link: "something_3",
          date_create: "30/04/2023 15:20",
        },
        {
          title: "Something_4",
          img_url: "",
          tags: ["python", "tools"],
          details: "",
          likes: 0,
          views: 0,
          link: "something",
          date_create: "30/04/2023 15:20",
        },
      ];
      return new Promise((resolve) => {
        // connection.query(sql, (err, results) => {
        // if (err) return next(err);
        resolve(results);
        // });
      });
    }

    async function main() {
      let results = await getBlogs();

      res.json(resp(true, results, null, null));
    }
    main();
  });
};

exports.getDetails = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function getDetailsBlog(id) {
      let sql = `SELECT * FROM ds_blog WHERE id = ${id}`;
      // get.data = JSON.parse(get.data);
      return new Promise((resolve) => {
        connection.query(sql, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function main() {
      let id = req.params.id;
      let results = await getDetailsBlog(id);

      res.json(resp(true, results, null, null));
    }
    main();
  });
};

exports.createBlog = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function postBlog(body) {
      let sql = `INSERT INTO ds_blog SET ?`;

      return new Promise((resolve) => {
        connection.query(sql, body, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function main() {
      // let user_id = await auth.getUserId(req.headers.authorization);
      let { body } = req;

      await postBlog(body);

      res.json(resp(true, null, null, null));
    }
    main();
  });
};

exports.updateBlog = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function putBlog(id, body) {
      let sql = `UPDATE du_branch SET ? WHERE id = ${id}`;
      return new Promise((resolve) => {
        connection.query(sql, body, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function main() {
      let id = req.params.id;
      let { body } = req;

      await putBlog(id, body);

      res.json(resp(true, null, null, null));
    }
    main();
  });
};
