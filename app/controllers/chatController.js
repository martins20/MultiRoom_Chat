module.exports.chatInit = (application, req, res) => {
    const dadosForm = req.body

    req.assert('apelido','Nome ou Apelido é Obrigatório').notEmpty()
    req.assert('apelido','Nome ou Apelido deve conter entre 3 e 15 caracteres').len(3, 15)

    const erros = req.validationErrors()

    if(erros ) {
        res.render('index', {validation: erros})
        return
    }

    application.get('io').emit(
        'msgForUsers',
        {apelido: dadosForm.apelido, mensagem: 'Acabou de entrar no Chat'}
        )

    res.render('chat', {dadosForm: dadosForm})
}