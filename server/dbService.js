const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});
const desp_dict = {
  all: "gasoline",
  mid: "midgrade",
  pre: "primium",
  reg: "regular",
};

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getGasoline(
    desp = "all",
    scope = "US",
    col,
    start = "2022-01-01",
    end = "2022-02-28"
  ) {
    try {
      const response = await new Promise((resolve, reject) => {
        const table_name = desp_dict[desp] + "_" + scope;
        const query = `SELECT date, ${col} FROM ${table_name} where date >= "${start}" and date <= "${end}"`;

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;
