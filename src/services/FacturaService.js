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
}
export default new FacturaService();