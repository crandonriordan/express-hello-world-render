const jwtSecret = process.env.JWT_SECRET;
const mongodbUrl = process.env.MONGO_URL;

module.exports = {
    jwtSecret: jwtSecret,
    mongodbUrl: mongodbUrl
}