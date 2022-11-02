const ES_ADMIN = true

const verificarAdmin = (solicitud, respuesta, next)=> {
    if(!ES_ADMIN) return respuesta.send({error: 'no estas autorizado'})
    next();
};

export { verificarAdmin }