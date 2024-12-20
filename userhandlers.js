const User = require("./../db/user");

async function addUser(model) {
  let user = new User({
    ...model,
  });
  await user.save();
  return user.toObject();
}
async function getUser() {
  const users = await User.find();
  return users.map((user) => user.toObject());
}
async function getUserById(id) {
  const user = await User.findById(id);
  return user.toObject();
}
async function updateUserById(id, model) {
  const filter = { _id: id };
  const user = await User.findOneAndUpdate(filter, model);
  if (filter) {
    return user.toObject();
  }
  return null;
}
async function deleteUserById(id) {
  await User.findOneAndDelete(id);
}
module.exports = {
  addUser,
  updateUserById,
  deleteUserById,
  getUser,
  getUserById,
};
