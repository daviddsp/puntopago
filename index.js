let crypto = require('crypto')
const axios = require('axios');

class PuntoPago {

    createTransaction(url, trx_id, monto, medio_pago, key, secret) {

        const funcion = 'transaccion/crear';
        let data = { trx_id:trx_id, medio_pago:medio_pago, monto:monto }
        let header_array = this.TraerHeader(funcion, trx_id, medio_pago, key, secret);
        axios({
            method:'POST',
            url:`${url}/${funcion}`,
            headers: header_array,
            data: data
        })
        .then(function (response) {

            return response.data
            //console.log(response.data);
        })
        .catch(function (error) {
            return error
            //console.log(error);
        });
    }

    CrearTransaccionMP(url, trx_id, monto, medio_pago, key, secret)
    {
        const funcion = 'transaccion/crear';
        let data = { trx_id:trx_id, medio_pago:medio_pago, monto:monto }
        //let header_array = this.TraerHeader(funcion, trx_id, monto);

        var date = new Date();

        let mensaje = `${process} \n ${trx_id} \n ${monto_str} \n ${date} \n`;

        let firma = this.FirmarMensaje(mensaje, key, secret);

        axios({
            method:'POST',
            url:`${url}/${funcion}`,
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept-Charset': 'application/x-www-form-urlencoded',
                'Fecha': date,
                'Autorizacion': firma,

            },
            json: true,
            //headers: header_array,
            data: data
          })
        .then(function (response) {
            return response.data

        })
        .catch(function (error) {
            return error

        });

    }

    FirmarMensaje(str, key, secret) {
        let signature = crypto.createHash('sha1', secret).update(str).digest('base64')
        let object = `PP ${key}: ${signature}`

        return object
         
    }

    TraerHeader(process, trx_id, monto_str, key, secret) {

        var date = new Date();

        let mensaje = `${process} \n ${trx_id} \n ${monto_str} \n ${date} \n`;

        let firma = this.FirmarMensaje(mensaje, key, secret);

        var header_array = [
            'Accept: application/json',
            'Access-Control-Allow-Origin: *',
            'Content-Type: application/json',
            'Accept-Charset: utf-8',
            `Fecha: ${date}`,
            `Autorizacion: ${firma}`
        ];

        console.log(header_array);
        

        return header_array;
    }

    TraerHeaderConsulta(funcion, token, trx_id, monto_str) {
        var date = new Date();

        let mensaje = `${funcion} \n ${token} \n ${trx_id} \n ${monto_str} \n ${date} \n`;
        
        let firma = this.FirmarMensaje(mensaje);

        var header_array = [
            'Accept: application/json',
            'Access-Control-Allow-Origin: *',
            'Content-Type: application/json; charset=utf-8',
            'Accept-Charset: utf-8',
            `Fecha: ${date}`,
            `Autorizacion: ${firma}`
        ];

        console.log(header_array);


        return header_array;

    }
}
module.exports = PuntoPago;