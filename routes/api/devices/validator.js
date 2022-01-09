const { check, oneOf } = require('express-validator');

exports.newCounterValidation = [
    check('chipId').exists(),
    check('tReset','El tipo de Reset es un parametro requerido').exists(),
    check('timeObst','El numero de timeObst es un parametro requerido').exists(),
    check('countExc','El numero de countExc es un parametro requerido').exists(),
    check('capacity','El numero de capacity es un parametro requerido').exists(),
    check('counter','El numero de counter es un parametro requerido').exists(),
    check('inputs','El numero de inputs es un parametro requerido').exists(),
    check('outputs','El numero de outputs es un parametro requerido').exists()
] 