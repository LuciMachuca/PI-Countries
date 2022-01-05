const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {

        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },

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
            type: DataTypes.ENUM({ values: ['summer', 'autumn', 'winter', 'spring'] }),
            allowNull: false,
        },

    });
};

