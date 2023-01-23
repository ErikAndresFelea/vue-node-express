module.exports = (app) => {
    app.post('/login', (req, res) => {
        res.send({
            message: `Hello. Your user has been loged in.`
        })
    })
}
