let crypto = require('crypto')


class PuntoPago {

    createTransaction(url, trx_id, monto) {

        const process = 'transaccion/crear'
        let monto_str = '2000';
    
        let data = { trx_id:trx_id, monto:monto, monto_str:monto_str };
        let header_array = this.TraerHeader(process, trx_id, monto_str);


        console.log(header_array);

        return trx_id

        
        

    }

    CrearTransaccionMP($trx_id, $medio_pago, $monto)
    {
        const funcion = 'transaccion/crear';
        let monto_str = number_format($monto, 2, '.', '');
        let data = { trx_id:trx_id, medio_pago:medio_pago, monto:monto_str }
        let header_array = this.TraerHeader($funcion, $trx_id, $monto_str);
        //return json_decode(this.ExecuteCommand(PUNTOPAGOS_URL.'/'.$funcion, $header_array, $data));
    }

    FirmarMensaje(str) {

        let key = 123
        //let signature = base64_encode(hash_hmac('sha1', $str, PUNTOPAGOS_SECRET, true));

        let signature = crypto.createHash('sha1', key).update(str).digest('base64')

        let object = ` PP PUNTOPAGOS_KEY: ${signature}`


        return object
         
    }

    TraerHeader(process, trx_id, monto_str) {

        var date = new Date();

        let mensaje = `${process} \n ${trx_id} \n ${monto_str} \n ${date} \n`;

        let firma = this.FirmarMensaje(mensaje);

        var header_array = ['Accept: application/json',
                              'Content-Type: application/json; charset=utf-8',
                              'Accept-Charset: utf-8',
                              `Fecha: ${date}`,
                              `Autorizacion: ${firma}`
                            ];

        return header_array;
    }

    TraerHeaderConsulta(funcion, token, trx_id, monto_str) {
        var date = new Date();

        let mensaje = `${funcion} \n ${token} \n ${trx_id} \n ${monto_str} \n ${date} \n`;
        


        let firma = this.FirmarMensaje(mensaje);

        var header_array = ['Accept: application/json',
                              'Content-Type: application/json; charset=utf-8',
                              'Accept-Charset: utf-8',
                              `Fecha: ${date}`,
                              `Autorizacion: ${firma}`
                            ];

        return header_array;

    }
}
module.exports = PuntoPago;