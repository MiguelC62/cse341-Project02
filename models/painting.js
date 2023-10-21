module.exports = (mongoose) => {
    const Painting = mongoose.model(
      'painting',
      mongoose.Schema({
        title: {
          type: String
        },
        stylename: {
          type: String
        },
        author_name: {
          type: String
        },
        painting_description: {
          type: String
        },
        painting_data: {
          type: String
        },
        painting_technic: {
          type: String
        },
        price: {
          type: String
        }
      }),
      'painting'
    );
  
    return Painting;
  };

