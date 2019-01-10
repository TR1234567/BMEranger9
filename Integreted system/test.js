const mongoose = require('mongoose');
var Assignment = mongoose.model('Assignment', { dueDate: Date });
Assignment.findOne(function (err, doc) {
  doc.dueDate.setMonth(3);
  doc.save(callback); // THIS DOES NOT SAVE YOUR CHANGE
    console.log(callback);
  doc.markModified('dueDate');
  doc.save(callback); // works
  console.log(callback);
})