import axios from 'axios';
class FacturaService {
    BasePath = 'http://localhost:3000'
    headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }
    async getAllFacturasByUser(userId) {
        const response = await axios.get(`${this.BasePath}/factura/user/${userId}`);
        return response.data;
    }
    async addFacturas(facturasArray) {
        for (let factura of facturasArray) {
            console.log("Le enviare:")
            console.log(factura)
            const res = await axios.post(`${this.BasePath}/factura`, factura);
        }
        return "Success!";
    }
}
export default new FacturaService();