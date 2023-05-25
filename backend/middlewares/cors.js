const allowedCors = [
  'https://nishima42.students.nomoredomains.monster',
  'http://nishima42.students.nomoredomains.monster',
  'http://51.250.21.2:3000',
  'https://51.250.21.2:3000',
  'localhost:3000',
];

const cors = (req, res, next) => {
  /*const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    console.log('origin запроса разрешен');
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', origin);*/

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  /*if (method === 'OPTIONS') {
    console.log('предварительый запрос');
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    /*const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    return res.end();
  }*/

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }

};

module.exports = {
  cors,
};
