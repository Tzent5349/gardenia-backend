// lib/cors.js

import Cors from 'cors';

const cors = Cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

export default cors;
