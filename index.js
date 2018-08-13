let crypto = require('crypto')
const axios = require('axios');



class PuntoPago {

    createTransaction(url, trx_id, monto, medio_pago) {

        const funcion = 'transaccion/crear';
        let data = { trx_id:trx_id, medio_pago:medio_pago, monto:monto }
        let header_array = this.TraerHeader(funcion, trx_id, medio_pago);
        axios({
            method:'POST',
            url:`${url}/${funcion}`,
            headers: header_array,
            data: data
        })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    CrearTransaccionMP(trx_id, medio_pago, monto, url)
    {
        const funcion = 'transaccion/crear';
        let data = { trx_id:trx_id, medio_pago:medio_pago, monto:monto }
        let header_array = this.TraerHeader(funcion, trx_id, monto);

        axios({
            method:'POST',
            url:`${url}/${funcion}`,
            headers: header_array,
            data: data
          })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    FirmarMensaje(str) {
        let signature = crypto.createHash('sha1').update(str).digest('base64')
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