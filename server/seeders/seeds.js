const faker = require("faker");
const db = require("../config/connection");
const { User, Book } = require("../models");
db.once("open", async () => {
  await Book.deleteMany({});
  await User.deleteMany({});
  
  // create user data
  const userData = [];
  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ username, email, password });
  }
  const createdUsers = await User.collection.insertMany(userData);

  //create book
  let createdBooks = [];
    for (let i = 0; i < 100; i += 1) {
      const title = faker.lorem.words(Math.round(Math.random() * 10) + 1);
      const description = faker.lorem.words(Math.round(Math.random() * 40) + 1);
       const genere = faker.lorem.words(Math.round(Math.random() * 15) + 1);
      const author = faker.lorem.words(Math.round(Math.random() * 5) + 1);
      const publish = faker.date.past(2);
      const rent = faker.random.number({ min: 5, max: 10 });
      const createdBook = await Book.create({ title, description,author, genere, rent, publish});
      createdBooks.push(createdBook);
    }

    // create borrowList
    
    for (let i = 0; i < 100; i += 1 ) {
      const randomBookIndex = Math.floor(Math.random() * createdBooks.length);
      const { _id: bookId, title, description, author, publish } = createdBooks[randomBookIndex];
      
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      //const { username } = createdUsers.ops[randomUserIndex];
      const { _id: userId } = createdUsers.ops[randomUserIndex];

      const updatedUser = await User.updateOne(
        { _id: userId },
        { $push: { borrowList: { _id: bookId, title, description, author, publish } } },
        { runValidators: true }
      )

      userData.push(updatedUser);
    }
    
    //create favouriteList
    for (let i = 0; i < 100; i += 1 ) {
      const randomBookIndex = Math.floor(Math.random() * createdBooks.length);
      const { _id: bookId, title, description, author, publish } = createdBooks[randomBookIndex];
      
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { username } = createdUsers.ops[randomUserIndex];
      const { _id: userId } = createdUsers.ops[randomUserIndex];

      const updatedUser = await User.updateOne(
        { _id: userId },
        { $push: { favouriteList: { _id: bookId, title, description, author, publish, username } } },
        { runValidators: true }
      )

      userData.push(updatedUser);
    }

    for (let i = 0; i < 100; i += 1) {
      const reviewText = faker.lorem.words(Math.round(Math.random() * 20) + 1);
  
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { username } = createdUsers.ops[randomUserIndex];
  
      const randomBookIndex = Math.floor(Math.random() * createdBooks.length);
      const { _id: bookId } = createdBooks[randomBookIndex];
  
      await Book.updateOne(
        { _id: bookId },
        { $push: { reactions: { reviewText, username } } },
        { runValidators: true }
      );
    }

    console.log("all done!");
    process.exit(0);
});