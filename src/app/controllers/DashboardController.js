const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    const { provider } = req.session.user

    if (!provider) {
      const providers = await User.findAll({ where: { provider: true } })

      return res.render('dashboard', { providers })
    }

    return res.render('appointmentsProvider/index')
  }
}

module.exports = new DashboardController()
