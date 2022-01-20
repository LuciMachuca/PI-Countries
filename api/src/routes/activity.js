require('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default;
const { Country, Activity } = require('../db');


const router = Router();

router.get('/', async (req, res, next) => {  // para LISTAR LAS ACTIVIDADES en el filtro por actividad

        try {

            const activities = await Activity.findAll({

                include: { model: Country }
            });
            res.status(200).send(activities);

        } catch (err) {
            console.log('Error en GET Activity');
        }
});

// ---------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, pais } = req.body;

    //const naMe = name.trim().toLowerCase(); // saca los espacios en blanco y convierte a minúscula

    try {

        const actDb = await Activity.create({
        
            name,
            difficulty,
            duration,
            season

        })

        const newActivity = await Country.findAll({

            where: { name: pais }
        })
        //console.log(newActivity);

        //await
        await actDb.addCountry(newActivity);

        res.status(200).send('Successfully Created Activity')

    } catch (err) {
        console.log(err);
    }


});


module.exports = router;