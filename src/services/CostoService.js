import axios from 'axios';
class CostoService {
    BasePath = 'https://facturabackend.herokuapp.com'
    headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }
    async addCosto(arrayCostes) {
        for (let coste of arrayCostes) {
            const res = await axios.post(`${this.BasePath}/costo-inicial`, coste);
        }
        return "Success"
    }

    async addCostoF(arrayCostes) {
        for (let coste of arrayCostes) {
            const res = await axios.post(`${this.BasePath}/costo-inicial`, coste);
        }
        return "Success"
    }
}
export default new CostoService();