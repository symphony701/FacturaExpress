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
}
export default new UserService();