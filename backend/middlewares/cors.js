const allowedCors = [
  'https://nishima42.students.nomoredomains.monster',
  'http://nishima42.students.nomoredomains.monster',
  'http://51.250.21.2:3000',
  'https://51.250.21.2:3000',
  'localhost:3000',
];

const cors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://nishima42.students.nomoredomains.monster');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }

};

module.exports = {
  cors,
};
