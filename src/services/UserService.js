import axios from 'axios';
class UserService {
    BasePath = 'http://localhost:3000'
    headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }
    async login(user, password) {
        const res = await axios.get(`${this.BasePath}/user/validation/${user}/${password}`);
        return res;
    }
    async register(user, email, password) {
        const data = {
            "NUsuario": user,
            "NCorreo": email,
            "NContrasenia": password,
        }
        const res = await axios.post(`${this.BasePath}/user`, data);
    }
}
export default new UserService();