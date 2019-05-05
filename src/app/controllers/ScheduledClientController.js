const moment = require('moment')
const { Op } = require('sequelize')
const { User, Appointment } = require('../models')

class ScheduledClientController {
  async index (req, res) {
    const date = moment(parseInt(req.query.date))

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'Provider' }, { model: User, as: 'Client' }],
      where: {
        provider_id: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    const scheduleds = appointments.map(appointment => {
      const { Client } = appointment
      const time = moment(Client.date).format('HH:mm')

      return {
        Client,
        value: time
      }
    })

    return res.render('scheduled/index', { scheduleds })
  }
}

module.exports = new ScheduledClientController()
