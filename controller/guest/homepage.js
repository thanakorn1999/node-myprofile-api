const resp = require("../public/response");

exports.getData = (req, res, next) => {
  req.getConnection((err, connection) => {
    if (err) return next(err);

    async function getSkills() {
      let sql = `SELECT ds_group.name group_name ,ds_group.details group_details, ds_skills.name skill,ds_skills.image_url
                  FROM ds_group_skill
                  INNER JOIN ds_skills ON ds_skills.id = ds_group_skill.skill_id AND ds_skills.status
                  INNER JOIN ds_group ON ds_group.id = ds_group_skill.group_id AND ds_group.status`;

      //    get.data = JSON.parse(get.data);
      return new Promise((resolve) => {
        connection.query(sql, (err, results) => {
          if (err) return next(err);
          resolve(results);
        });
      });
    }

    async function getHistory() {
      let sql = `SELECT company_name, position, respon, type FROM dh_history`;
      return new Promise((resolve) => {
        connection.query(sql, (err, results) => {
          if (err) return next(err);
          let edu = [];
          let work = [];
          results.forEach((elm) => {
            elm.position = JSON.parse(elm.position);
            elm.type === "work" && work.push(elm);
            elm.type === "edu" && edu.push(elm);
          });
          // let edu = results.find((elm) => elm.type === "edu");
          // let work = results.find((elm) => elm.type === "work");

          resolve({ edu, work });
        });
      });
    }

    async function getInfo() {
      let sql = `SELECT email, CONCAT(frist_name,' ',last_name) name, phone, image_url, files, social, image_list, details, birthday 
                  FROM du_user
                  WHERE id = 1 AND status`;

      return new Promise((resolve) => {
        connection.query(sql, (err, results) => {
          if (err) return next(err);
          let result = results[0];
          result.image_list = JSON.parse(result.image_list);
          result.files = JSON.parse(result.files);
          resolve(result);
        });
      });
    }

    async function main() {
      let skills = await getSkills();
      let { edu, work } = await getHistory();
      let ownerInfo = await getInfo();

      let results = {
        skills: skills,
        history: {
          edu: edu,
          work: work,
        },
        ownerInfo: ownerInfo,
      };
      res.json(resp(true, results, null, null));
    }
    main();
  });
};
