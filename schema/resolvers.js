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
      // .find(what do I want to find out, { key })
      // : Number(id) -> be sure to let it convert whatever passing value as Number
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

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      // console.log(user);
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    // this name must be same as the one how I defined from type-def.js (updateUsername)
    updateUsername: (parent, args) => {
      // const id = args.input.id;
      // const newUsername = args.input.newUsername
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });
      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
