const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  // User resolvers
  Query: {
    users: () => {
      return UserList;
    },
    user: (parent, args) => {
      const id = args.id;
      // .find(what do u want to find out, { key })
      // : Number(id) -> only did this to convert string to number.
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },
    // Movie resolvers
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },
};

module.exports = { resolvers };
