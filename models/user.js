module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      username: {
        type: String
      },
      password: {
        type: String
      },
      firstname: {
        type: String
      },
      lastname: {
        type: String
      },
      email: {
        type: String
      },
      phonenumber: {
        type: String
      },
      stylename: {
        type: String
      },
      message: {
        type: String
      },
    },{
      versionKey: false 
    
    });
  
    return mongoose.model('user', userSchema, 'user');
  };

