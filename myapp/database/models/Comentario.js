const { FOREIGNKEYS } = require("sequelize/lib/query-types");

module.exports = function (sequelize, dataTypes) {
    let alias = "Comentario";

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        idProducto: {
            type: dataTypes.INTEGER
        },
        idUsuario: {
            type: dataTypes.INTEGER
        },
        texto: {
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
        tableName: "comentarios", //si el nombre de la tabla no coincide con el del modelo en plural
        timestamps: true, //deshabilita las columnas para timestamps en este modelo
        underscored: false, //si los campos tienen guiones bajos
    }

    let Comentario = sequelize.define(alias, cols, config);

    Comentario.associate = function (models) {
        Comentario.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "idProducto"
        }),
        Comentario.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "idUsuario"
        })
    }

    return Comentario;

}