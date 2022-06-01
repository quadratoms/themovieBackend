const db = require("../config/db");

class Comment {
  constructor(n, comment, movieid) {
    this.name = n;
    this.comment = comment;
    this.movieid= movieid
    
  }
 


  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;
    let sql = `
    INSERT INTO comments(
      name,
      comment,
      movieid,
      create_time
    )
    VALUES(
      '${this.name}',
      '${this.comment}',
      '${this.movieid}',
      '${createdAtDate}'
    )
    `;
    // console.log(sql);

    return db.execute(sql);
  }

  static findAll(movieid) {
    let sql = `SELECT * FROM comments WHERE movieid = '${movieid}' order by tstamp desc;`;
    console.log(sql);
    return db.execute(sql);
  }


}

module.exports = Comment;
