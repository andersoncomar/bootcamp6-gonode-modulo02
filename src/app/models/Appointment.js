module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { foreignKey: 'user_id', as: 'Client' })
    Appointment.belongsTo(models.User, {
      foreignKey: 'provider_id',
      as: 'Provider'
    })
  }

  return Appointment
}
