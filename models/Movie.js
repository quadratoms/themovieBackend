const db = require("../config/db");

class Movie {
  constructor(n, description, release_date, rating, ticket_price, country, genre, photo, slug) {
    this.name = n;
    this.description = description;
    this.release_date = release_date;
    this.rating = rating;
    this.ticket_price = ticket_price;
    this.country = country;
    this.genre = genre;
    this.photo = photo;
    this.slug= slug
  }
 


  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let createdAtDate = `${yyyy}-${mm}-${dd}`;
    
    let sql = `
    INSERT INTO movies(
      name,
      description,
      release_date,
      rating,
      ticket_price,
      country,
      genre,
      photo,
      create_time,
      slug
    )
    VALUES(
      '${this.name}',
      '${this.description}',
      '${this.release_date}',
      '${this.rating}',
      '${this.ticket_price}',
      '${this.country}',
      '${this.genre}',
      '${this.photo}',
      '${createdAtDate}',
      '${this.slug}'
    )
    `;
    // console.log(sql);

    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM movies;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM movies WHERE slug = '${id}';`;
    console.log(sql);

    return db.execute(sql);
  }
}

module.exports = Movie;
