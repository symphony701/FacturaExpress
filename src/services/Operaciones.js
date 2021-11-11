class Operaciones {
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
    NumVRecibido(NumVNeto, arrayCostos, costoAux) {
        costoAux = 0;
        for (let costo of arrayCostos) {
            costoAux = costoAux + costo.NumMonto
        }
        return parseFloat((NumVNeto - parseFloat(costoAux)).toFixed(2))
    }
    NumVEntregado(NumMonto) {
        return NumMonto;
    }
    NumTCEA(NumMonto, NumVRecibido, DiasXYear, NumPlazoDescuento) {
        return parseFloat(((Math.pow((NumMonto / NumVRecibido), (DiasXYear / NumPlazoDescuento)) - 1) * 100).toFixed(7));

    }

}
export default new Operaciones();