const Transaction = require('../../model/bank/transaction')
const User = require('../../model/user/user')

// exports.view_current_balance = async (req,res,next) => {
//     try{
//         let get_user_info = await User.findById(req.user._id).select('name email img current_balance')
//         res.status(200).send({ status: true, msg: 'succes', data: get_user_info })
//     }catch(e){
//         next(e)
//     }
// }

exports.deposit = async (req, res, next) => {
    try {
        let deposit = await User.updateOne({ _id: req.user._id }, { $inc: { current_balance: +req.body.amount } })
        let transfer = new Transaction({
            action: 'Deposit',
            user: req.user._id,
            remain: get_user_form.current_balance + req.body.amount,
            form: req.user._id,
            amount: +req.body.amount
        })
        await transfer.save()
        res.status(200).send({ status: true, msg: 'succes', data: deposit })
    } catch (e) {
        next(e)
    }
}

exports.withdraw = async (req, res, next) => {
    try {
        let get_user_form = await User.findById(req.user._id).select('name current_balance')
        if (get_user_form.current_balance < req.body.amount) {
            throw new Error('current_balance not enough')
        }
        let withdraw = await User.updateOne({ _id: req.user._id }, { $inc: { current_balance: -req.body.amount } })
        let transfer = new Transaction({
            action: 'Withdraw',
            user: req.user._id,
            remain: get_user_form.current_balance - req.body.amount,
            form: req.user._id,
            amount: +req.body.amount
        })
        await transfer.save()
        res.status(200).send({ status: true, msg: 'succes', data: withdraw })
    } catch (e) {
        next(e)
    }
}

exports.table_Transfer = async (req, res, next) => {
    try {
        //Transfer
        let get_table = await Transaction.find({ form: req.user._id, action: 'Transfer' }).populate('user form')
        res.status(200).send({ status: true, msg: 'succes', data: get_table })
    } catch (e) {
        next(e)
    }
}

exports.table_receive = async (req, res, next) => {
    try {
        //Receive
        let get_table = await Transaction.find({ user: req.user._id, action: 'Receive' }).populate('user form')
        res.status(200).send({ status: true, msg: 'succes', data: get_table })
    } catch (e) {
        next(e)
    }
}

exports.transfer = async (req, res, next) => {
    try {
        let get_user_form = await User.findById(req.user._id).select('name current_balance')
        if (get_user_form < +req.body.amount) {
            throw new Error('current_balance not enough')
        }
        let get_user_to = await User.findById(+req.body.user).select('name current_balance')
        if (!get_user_to) {
            throw new Error('user not found')
        }
        let my = await User.updateOne({ _id: req.user._id }, { $inc: { current_balance: -req.body.amount } })
        let another = await User.updateOne({ _id: +req.body.user }, { $inc: { current_balance: +req.body.amount } })
        let transfer = new Transaction({
            action: 'Transfer',
            user: +req.body.user,
            remain: get_user_form.current_balance - req.body.amount,
            form: req.user._id,
            amount: +req.body.amount
        })
        let Receive = new Transaction({
            action: 'Receive',
            user: +req.body.user,
            remain: get_user_to.current_balance + req.body.amount,
            form: req.user._id,
            amount: +req.body.amount
        })
        await transfer.save()
        await Receive.save()
        res.status(200).send({ status: true, msg: 'succes', data: null })
    } catch (e) {
        next(e)
    }
}