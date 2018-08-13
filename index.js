let crypto = require('crypto')
const axios = require('axios');



class PuntoPago {

    createTransaction(url, trx_id, monto, medio_pago) {

        const funcion = 'transaccion/crear';
        let monto_str = 2000;
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
    //alo
    CrearTransaccionMP(trx_id, medio_pago, monto, url)
    {
        const funcion = 'transaccion/crear';
        let monto_str = 2000;
        let data = { trx_id:1231231357, medio_pago:"3", monto:20000 }
        let header_array = this.TraerHeader(funcion, 1231231357, 20000);


        console.log(header_array);
        

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


        //return json_decode(this.ExecuteCommand(PUNTOPAGOS_URL.'/'.$funcion, $header_array, $data));
    }

    FirmarMensaje(str) {

        let key = 123
        //let signature = base64_encode(hash_hmac('sha1', $str, PUNTOPAGOS_SECRET, true));

        //let signature = crypto.createHash('sha1', key).update(str).digest('base64')

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