const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {

        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        difficulty: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 1,
            validate: {
                max: 5,
                min: 1
            }
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        season: {
            type: DataTypes.ENUM(['Winter', 'Autumn', 'Spring', 'Summer']),
            allowNull: false,
        },

    });
};

