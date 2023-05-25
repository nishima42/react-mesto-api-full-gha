const allowedCors = [
  'https://nishima42.students.nomoredomains.monster',
  'http://nishima42.students.nomoredomains.monster',
  'http://51.250.21.2:3000',
  'https://51.250.21.2:3000',
  'localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  /*if (allowedCors.includes(origin)) {
    console.log('origin запроса разрешен');
    res.header('Access-Control-Allow-Origin', origin);
  }*/
  res.header('Access-Control-Allow-Origin', origin);

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    console.log('предварительый запрос');
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    const requestHeaders = req.headers['access-control-request-headers'];
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  next();
};

module.exports = {
  cors,
};
