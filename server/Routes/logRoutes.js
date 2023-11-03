const express = require('express')

const router = express.Router()
const {
    createLog,
    fetchlog,
    fetchAllLogs,
    updateLog,
    deleteLog
} = require('../Controllers/logController')

const { protect } = require('../Middleware/authMiddleware')

router.post('/',protect, createLog)
router.get('/search',protect, fetchlog)
router.get('/logs',protect, fetchAllLogs)
router.put('/:logId',protect, updateLog)
router.delete('/:logId',protect, deleteLog)

module.exports = router
