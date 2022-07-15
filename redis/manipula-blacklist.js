const blacklist = require('./blacklist');

const { promisify } = require('util');
const exitsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');

function gerarTokenHash(token) {
    return createHash('sha256').update(token).digest('hex');
}

module.exports = {
    adiciona: async token => {
        const dataExpiracao = jwt.decode(token).exp;
        const tokenHash = gerarTokenHash(token);
        await setAsync(tokenHash, '');
        blacklist.expireat(token, dataExpiracao);
    },
    contemToken: async token => {
        const tokenHash = gerarTokenHash(token);
        const resultado = await exitsAsync(token);
        return resultado === 1;
    }
}
