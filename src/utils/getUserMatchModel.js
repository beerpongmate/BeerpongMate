export default getUserMatchModel = (user) => ({
  name: user?.email,
  uid: user?.uid,
});
