const db = require("../config/db");
const {generateKeySync}= require('crypto')


class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;

  }



  async save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    var token = ''
    const key = generateKeySync('hmac', { length: 20 });
    token=key.export().toString('hex')
    let createdAtDate = `${yyyy}-${mm}-${dd}`;

    let sql = `
    INSERT INTO users (
      username,
      email,
      password,
      create_time,
      token
    )
    VALUES(
      '${this.username}',
      '${this.email}',
      '${this.password}',
      '${createdAtDate}',
      '${token}'
    )
    `;
    
    return db.execute(sql);
  }
  
  static findAll() {
    let sql = "SELECT * FROM users;";
    
    return db.execute(sql);
  }
  
  static findById(id) {
    let sql = `SELECT * FROM users WHERE id = ${id};`;
    
    return db.execute(sql);
  }
  static finduser(username) {
    console.log(username);
    let sql = `SELECT * FROM users WHERE username = '${username}'`;
    
    console.log(sql);
    return db.execute(sql);
  }
}

module.exports = User;
