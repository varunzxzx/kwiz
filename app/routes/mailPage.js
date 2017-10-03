mailPage =  (req, res) =>  {
    let token = req.query.token;
    if (!token)
        return res.status(400).send('invalid request');

    res.render('index', {token});
}

module.exports = mailPage;
