const express = require('express')

const router = express.Router()
const {
    createIncident,
    fetchincident,
    fetchAllIncidents,
    updateIncident,
    deleteIncident
} = require('../Controllers/incidentController')

const { protect } = require('../Middleware/authMiddleware')


router.post('/', createIncident)
router.get('/search',protect, fetchincident)
router.get('/incidents',protect, fetchAllIncidents)
router.put('/:incidentId',protect, updateIncident)
router.delete('/:incidentId',protect, deleteIncident)

module.exports = router
