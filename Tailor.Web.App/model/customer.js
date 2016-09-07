//packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//user schema
var workerSchema = new Schema({
  firstName: String,
  lastName: String,

  country:{
    type: Schema.ObjectId,
    ref: 'Country'
  },
  department: {
    type: Schema.ObjectId,
    ref: 'Department'
  },
  province: {
    type: Schema.ObjectId,
    ref: 'Province'
  },
  district: {
    type: Schema.ObjectId,
    ref: 'District'
  },
  address: String,
  email: String,
  phone:String,
  mobile:String,
  userName:{
    type:String,
    required:true,
    index:{
      unique:true
    }
  },
  password:{
    type:String,
    required:true,
    select:false
  }
});

workerSchema.pre('save', function(next){
  var worker = this;
  if(!worker.isModified('password')){
    return next();
  }

  //generate to hash
  bcrypt.hash(worker.password, null, null, function(err,hash){
    if(err){
      return next(err);
    }

    //change password
    worker.password = hash;
    next();
  });

});

workerSchema.methods.comparePassword = function(password){
  var worker = this;
  return bcrypt.compareSync(password, worker.password);
}

module.exports = mongoose.model('Worker', workerSchema);
