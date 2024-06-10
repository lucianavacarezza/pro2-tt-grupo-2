const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        contrasenia: {
            type: dataTypes.STRING
        },
        dni: {
            type: dataTypes.INTEGER
        },
        fecha: {
            type: dataTypes.DATE
        },
        foto: {
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    }

    let config = {
        tableName: "usuarios", //si el nombre de la tabla no coincide con el del modelo en plural
        timestamps: true, //deshabilita las columnas para timestamps en este modelo
        underscored: false, //si los campos tienen guiones bajos
    }

    let Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = function (models) {
        Usuario.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "idUsuario"
        } )
        
    }

    return Usuario;
    
}