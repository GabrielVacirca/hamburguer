import sequelize from "./Database.js";
import { DataTypes, Model } from "sequelize";

export default class Avaliacao extends Model {
  static associate(models) {
    Avaliacao.belongsTo(models.Pedido, {
      foreignKey: 'pedido_id',
      as: 'pedido'
    });
  }
}

Avaliacao.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pedido_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  sequelize,
  modelName: 'Avaliacao',
  tableName: 'avaliacoes',
  timestamps: true,
  paranoid: true
});
