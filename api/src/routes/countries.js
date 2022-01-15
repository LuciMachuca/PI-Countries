require('dotenv').config();
const { Router } = require('express');
const { Sequelize } = require("sequelize");
const { Country, Activity } = require('../db');


const router = Router();

router.get('/', async (req, res) => {

    const { name } = req.query;

    try {

        if (!name) { // Resumen de todos los paises


            //try {
            const rutaPrincipal = await Country.findAll({ include: Activity });
            res.status(200).send(rutaPrincipal);

            /* } catch (err) {
                console.log('Error en los datos de la Ruta Principal');
            } */

        } else { // búsqueda por nombre
                
                let countryName = await Country.findAll({
                    include: { model: Activity },
                    where: { name: { [Sequelize.Op.iLike]: `%${name}%` } }
                })
                countryName.length > 0 ? 
                res.status(200).send(countryName) : 
                res.status(400).send(`Country Not Found`);
    
            }

        } catch (e) {
            console.log(e)
        }
    });


router.get('/:id', async (req, res) => {

    const { id } = req.params;
    //console.log(req.params);   

    try {

        let pais = await Country.findByPk(id.toUpperCase(), { include: { model: Activity } });

        if (pais) {
            res.status(200).json(pais);
        } else {
            res.status(404).json('no existe pais con ese ID')
        }
    } catch (err) {
        console.log('Error en Detalle por ID');
    }

})

module.exports = router;