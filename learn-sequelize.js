const { Genre, Movie, Actor } = require('./models');

/*
  currently, the genre table only has 3 entries: Action, Comedy, and Drama
  Add one more Genre of your choice.
*/
function insertNewGenre() {
  // Test might run before database code if 'return' isn't there
  return Genre.create({ name: "Romance" });
}

/*
  currently, there are 5 movies
  Add one more Movie of your choice. But it CANNOT be from 2008.
*/
function insertNewMovie() {
  // .create() is an asynchronous call
  return Movie.create({ title: "Parasite", year: 2019 });
}

/*
  Return the title of the movie with ID=2
*/
function getMovieWithId2() {
  return Movie.findByPk(2).get('title');
}

/*
  Return an array of all the actor names
*/
function getAllActors() {
  const actors = Actor.findAll();
  const names = actors.map(a => a.get('name'));
  return names;
}

/*
  Return an array of all the movie names from 2008
*/
function getAllMoviesFrom2008() {
  const movies = Movie.findAll({ 
    where: {
      year: 2008
    }
  })
  const moviesYear = movies.map(m => m.get('title'));
  return moviesYear;
}

/*
  Delete the genre you added in the first test
*/
function deleteGenreYouAdded() {
  return Genre.destroy({ 
    where: {
      name: 'Romance'
    } 
  })
}

/*
  Rosario Dawson acted in the movie Eagle Eye.
  Add this association.
*/
function associateRosarioToEagleEye() {
  let actor = Actor.findOne({
    where: {
      name: 'Rosario Dawson'
    }
  })

  // let movie = Movie.findByPk(4);
  let movie = Movie.findOne({
    where: {
      title: 'Eagle Eye'
    }
  })

  // This method is better for more cases because the second one would take
  // more time.
  return Promise
    .all([ movie, actor ])
    .then(([ movieResult, actorResult ]) => {
      return movieResult.addActor(actorResult);
      // return actorResult.addMovie(movieResult);
      }
    )
}

/*
  Robert Downey Jr. acted in the movie Tropic Thunder.
  Add this association.
*/
function associateRobertToTropicThunder() {
  return Actor.findOne({
    where: {
      name: 'Robert Downey Jr.'
    }
  })
    .then(Robert => {
      return Movie.findOne({
        where: {
          title: 'Tropic Thunder'
        }
      })
        .then(movie => {
          return movie.addActor(Robert);
        })
    })
}

// async function associateRobertToTropicThunder {
//   let Robert = await Actor.findOne({where: {name: 'Robert Downey Jr.'}})
//   let movie = await Movie.findOne({where: {title: 'Tropic Thunder'}})

//   return movie.addActor(Robert);
// }

module.exports = {
  insertNewGenre,
  insertNewMovie,
  getMovieWithId2,
  getAllActors,
  getAllMoviesFrom2008,
  deleteGenreYouAdded,
  associateRosarioToEagleEye,
  associateRobertToTropicThunder,
};
