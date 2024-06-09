

module.exports = function (sequelize, dataTypes) {
    let alias = "Producto";

    let cols= {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        nombreArchivoImagen : {
            type: dataTypes.STRING
        },
        idUsuario: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    }
    let config= {
        tableName: "productos", //si el nombre de la tabla no coincide con el del modelo en plural
        timestamps: false, //deshabilita las columnas para timestamps en este modelo
        underscored: false, //si los campos tienen guiones bajos
    }

    let Producto = sequelize.define(alias, cols, config);



    return Producto;
}