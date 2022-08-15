import axios from "axios";

let instance = axios.create({
    baseURL: 'https://62f55046ac59075124cfa259.mockapi.io/'
});

export const pizzaAPI = {
    async getPizzas() {
        return instance.get('items')
            .then(response => response.data)
    }
}