require('dotenv').config();
const { Router } = require('express');
const axios = require('axios').default;
const { Country, Activity } = require('../db');


const router = Router();

router.get('/', async (req, res, next) => {

    const { name } = req.query;

    if (!name) {

        try {

            const activities = await Activity.findAll({

                include: { model: Country }
            });
            res.status(200).send(activities);

        } catch (err) {
            console.log('Error en GET Activity');
        }


    } else {

        try {

            let arrayActivities = await Activity.findAll({
                attributes: ["name"],
                include: {
                    model: Country,
                    attributes: ['name', 'imgbandera', 'continents'],
                    through: {
                        attributes: [],
                    }
                },

                where: { name: { [Sequelize.Op.iLike]: `${name}` } }
            });

            if (arrayActivities <= 0) {
                res.status(200).send('No existe esa actividad')
            } else {

                res.status(200).send(arrayActivities);
            }

        } catch (err) {
            console.log('Error en Activity por Nombre');
        }

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