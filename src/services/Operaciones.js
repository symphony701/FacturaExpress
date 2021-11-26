import axios from 'axios';
class Operaciones {
    apiConversiones = 'https://v6.exchangerate-api.com/v6/5848dcd0e4f789a68e485a94/latest/USD'
    NumPlazoDescuento(fechaPago, fechaDescuento) {
        let a = (new Date(fechaPago) - new Date(fechaDescuento)) * (1.1574074074074 * Math.pow(10, -8));
        return Math.round(a);
    }
    NumTEA(NTipoTasa, NumPorcentajeTasa, NumPlazoTasa, NumPerioCapital) {
        if (NTipoTasa == 'nominal') {
            return parseFloat(((Math.pow((1 + ((NumPorcentajeTasa / 100) / (NumPlazoTasa / NumPerioCapital))), (360 / NumPerioCapital)) - 1) * 100).toFixed(7))
        } else if (NTipoTasa == 'efectiva') {
            return parseFloat(((Math.pow((1 + (NumPorcentajeTasa / 100)), (360 / NumPlazoTasa)) - 1) * 100).toFixed(7));

        }
    }
    NumTED(NumTEA, NumPlazoDescuento) {
        return parseFloat(((Math.pow((1 + (NumTEA / 100)), (NumPlazoDescuento / 360)) - 1) * 100).toFixed(7));;
    }
    NumD360(NumTED) {
        return parseFloat(((NumTED / 100) / (1 + (NumTED / 100)) * 100).toFixed(7));
    }
    NumDescuento(NumMonto, NumD360) {
        return parseFloat((NumMonto * (NumD360 / 100)).toFixed(2));
    }
    NumVNeto(NumMonto, NumDescuento) {
        return parseFloat((NumMonto - NumDescuento).toFixed(2))
    }
    async NumVRecibido(NumVNeto, arrayCostos, costoAux) {
        const currencyres = await axios.get(this.apiConversiones)
        let currency = currencyres.data.conversion_rates.PEN;
        currency = parseFloat(currency.toFixed(2))

        costoAux = 0.0;
        for (let costo of arrayCostos) {
            if (costo.NMoneda == "Sol") {
                costoAux = costoAux + costo.NumMonto
            } else {
                costoAux = costoAux + (costo.NumMonto * currency)
            }
        }
        return parseFloat((NumVNeto - parseFloat(costoAux)).toFixed(2))
    }

    async ConversorFactura(montoFactura, tipoMoneda) {
        const currencyres = await axios.get(this.apiConversiones)
        const currency = currencyres.data.conversion_rates.PEN;
        if (tipoMoneda == "Sol") {
            return montoFactura
        } else {
            return montoFactura * currency;
        }

    }

    async NumVEntregado(NumMonto, arrayCostos, costoAux) {
        const currencyres = await axios.get(this.apiConversiones)
        let currency = currencyres.data.conversion_rates.PEN;
        currency = parseFloat(currency.toFixed(2));
        costoAux = 0.0;
        for (let costo of arrayCostos) {
            if (costo.NMoneda == "Sol") {
                costoAux = costoAux + costo.NumMonto
            } else {
                costoAux = costoAux + (costo.NumMonto * currency)
            }
        }
        return parseFloat((NumMonto + parseFloat(costoAux)).toFixed(2));

    }
    NumTCEA(NumVEntregado, NumVRecibido, DiasXYear, NumPlazoDescuento) {
        return parseFloat(((Math.pow((NumVEntregado / NumVRecibido), (DiasXYear / NumPlazoDescuento)) - 1) * 100).toFixed(7));

    }




























    /*
        arregloFlujo(valorTotalaRecibir, arregloFacturas) {
            let arregloflujo = []
            arregloflujo.push(valorTotalaRecibir)
            for (let factura of arregloFacturas) {
                arregloflujo.push((factura.NumVEntregado) * -1);
            }
            return arregloflujo;
        }

        NumTCEATotal(arregloflujo) {
            const MAX_ITER = 20;
            const EXCEL_EPSILON = 0.0000001;

            let x = 0.1;
            let iter = 0;
            while (iter++ < MAX_ITER) {

                let x1 = 1.0 + x;
                let fx = 0.0;
                let dfx = 0.0;
                for (let i = 0; i < arregloflujo.length; i++) {
                    let v = arregloflujo[i];
                    let x1_i = Math.pow(x1, i);
                    fx += v / x1_i;
                    let x1_i1 = x1_i * x1;
                    dfx += -i * v / x1_i1;
                }
                let new_x = x - fx / dfx;
                let epsilon = Math.abs(new_x - x);

                if (epsilon <= EXCEL_EPSILON) {
                    if (x == 0.0 && Math.abs(new_x) <= EXCEL_EPSILON) {
                        return 0.0;
                    } else {
                        return new_x * 100;
                    }
                }
                x = new_x;
            }
            return x;
        }
    */

}
export default new Operaciones();