const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countries = require('./countries');
const activity = require('./activity');

const router = Router();

router.use('/countries', countries); // GET -> home / id y searchBar
router.use('/activity', activity);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
