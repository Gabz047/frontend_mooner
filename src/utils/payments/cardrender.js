const { default: api } = require("@/plugins/api")
const { default: axios } = require("axios")

const renderCardPaymentBrick = async (BrickBuilder) =>{
    const settings = {
        inicialization: {
            amount: 100
        },
        callbacks:{
            onReady: (data)=>{
                console.log(data)
            },
            onSubmit: (FormData) =>{
                return new Promise((reject, resolve) => {
                    api.post('/payment', FormData).then((response)=>{
                        resolve(response.data)
                    }).catch((err) =>{
                        reject(err)
                    })
                })
            },
            onErr: (err)=>{
                console.error(err)
            }
        }
    };

    window.paymentBrickController = await BrickBuilder.create(
        "payment",
        "payments-brick",
        settings
    )
}   

import { loadMercadoPago } from "@mercadopago/sdk-js";


await loadMercadoPago();
const mp = new window.MercadoPago("YOUR_PUBLIC_KEY");