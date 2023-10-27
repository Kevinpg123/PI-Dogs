const { DataTypes, Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  // console.log(Sequelize.UUIDV4);
  sequelize.define('dog', {
    
    id: {
      type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,

    },
    reference_image_id: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  }, {timestamps: false});

 
};

