/* Importar as configurações do Servidor */
const app = require ('./config/server')
const socket =  require('socket.io')

// Parametrizar a porta de escuta
const server = app.listen(80, () => {
    console.log('Server ON')
})

const io = socket.listen(server)

app.set('io', io)

// Criar uma conexão por WebSocket
io.on('connection', (socket) => {
    console.log(' -> Usuario Conectado')

    socket.on('disconnect' , () => {
        console.log(' -> Usuário Desconectado')
    })

    socket.on('msgParaServidor', (data) => {

        //Dialogo
        socket.emit(
            'msgForUsers',
            {apelido: data.apelido, mensagem: data.mensagem}
        )

        socket.broadcast.emit(
            'msgForUsers',
            {apelido: data.apelido, mensagem: data.mensagem}
        )

        //Relação de Participantes
        if(data.apelido_att_users === 0) {
            socket.emit(
                'users',
                {apelido: data.apelido}
            )
    
            socket.broadcast.emit(
                'users',
                {apelido: data.apelido}
            )
        }
        
    })
})
