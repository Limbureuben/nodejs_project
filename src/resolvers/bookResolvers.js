const Book = require('../models/bookModel')

const resolvers = {
    Query: {
        getBooks: async ()=> {
            try {
                return await Book.find();
            } catch (error) {
                throw new Error('Failed to fetch books');
            }
        },

        //get one book by ID
        getBooks: async (_, {id}) => {
            try {
                return await Book.findById(id);
            } catch (error) {
              throw new Error('Failed to fetch book');
            }
        },
    },

    Mutation: {
        registerBook: async (_, {title, author, publishedYear, genre, available}) => {
            try {
                const newBook = new Book({
                    title,
                    author,
                    publishedYear,
                    genre,
                    available,
                });

                return await newBook.save();
            } catch (error) {
                throw new Error('Failed to register book');
            }
        },
    },
};

module.exports = resolvers;