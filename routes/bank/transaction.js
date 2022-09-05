var express = require('express');
var router = express.Router();
const Transaction = require('../../controller/bank/transaction')
const Auth = require('../../controller/auth/auth')

router.post('/deposit',Auth.auth, Transaction.deposit)
router.post('/withdraw',Auth.auth, Transaction.withdraw)
router.post('/transfer',Auth.auth, Transaction.transfer)
router.post('/table_transfer',Auth.auth, Transaction.table_Transfer)
router.post('/table_receive',Auth.auth, Transaction.table_receive)

module.exports = router