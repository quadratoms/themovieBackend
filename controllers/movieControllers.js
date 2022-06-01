const Movie = require("../models/Movie");
const download = require('image-downloader');
const fs = require('fs').promises;



exports.getAllmovies = async (req, res, next) => {
  try {
    const [movies, _] = await Movie.findAll();

    res.status(200).json({ count: movies.length, movies });
  } catch (error) {
    next(error);
  }
};
async function dataURLtoFile(dataurl, filename) {

  var img = dataurl;
  // strip off the data: url prefix to get just the base64-encoded bytes
  var data = img.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');
  await fs.writeFile(filename, buf);
}

exports.createNewmovie = async (req, res, next) => {
  try {
    let { name,
      description,
      release_date,
      rating,
      ticket_price,
      country,
      genre,
      photo,
      create_time } = req.body;
    console.log(req.body);
    let slug= name.replace(/  /g, ' ').replace(/ /g, '-')
    let photodir=null
    if (photo) {
      
      let file = dataURLtoFile(photo, `public/movie-${slug}.png`);
      photodir=`movie-${slug}.png`
    }
    let movie = new Movie(name,
      description,
      release_date,
      rating,
      ticket_price,
      country,
      genre,
      photodir,
      slug);

    movie = await movie.save();

    res.status(201).json({ message: "movie created" });
  } catch (error) {
    next(error);
  }
};

exports.getmovieById = async (req, res, next) => {
  try {
    // console.log(req);
    let slug = req.params.id;
    console.log(slug);
    let [movie, _] = await Movie.findById(slug);

    res.status(200).json({ movie: movie[0] });
  } catch (error) {
    next(error);
  }
};
