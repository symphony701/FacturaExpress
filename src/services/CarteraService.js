import axios from 'axios';
class CarteraService {
    BasePath = 'https://facturabackend.herokuapp.com'
    headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }

    async addCartera(user, tasaModel, porcentajeTasa, plazoTasaModel, plazoTasaNum, diasPorYearModel, periodoCapitalizacionModel, periodoCapitalizacionNum, fechaDescuentoDate) {
        const data = {
            "CUsuario": user,
            "NTipoTasa": tasaModel,
            "NumPorcentajeTasa": porcentajeTasa,
            "NPlazoTasa": plazoTasaModel,
            "NumPlazoTasa": plazoTasaNum,
            "NumDiasXAnio": diasPorYearModel,
            "NPerioCapital": periodoCapitalizacionModel,
            "NumPerioCapital": periodoCapitalizacionNum,
            "DFechaDescuento": fechaDescuentoDate,
        }
        const res = await axios.post(`${this.BasePath}/cartera`, data);
        return res.data;
    }
}
export default new CarteraService();