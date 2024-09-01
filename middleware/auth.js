const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);  // Não autorizado

    jwt.verify(token, 'chave-secreta', (err, usuario) => {
        if (err) return res.sendStatus(403);  // Proibido
        req.usuario = usuario;
        next();
    });
}

module.exports = autenticarToken;
