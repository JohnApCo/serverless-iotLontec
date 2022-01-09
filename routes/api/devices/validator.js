const { check, oneOf } = require('express-validator');

exports.newCounterValidation = [
    check('name').exists(),
    check('codTarjeta','El codigo de tarjeta es un parametro requerido').exists(),
    check('nSensor','El numero de Sensores es un parametro requerido').exists()
] 