import request from './utils/request';

class Api {
    static urlAPI() {
        return "https://6555cd2a84b36e3a431e5df4.mockapi.io/api/v1/"
    }

    static getBook() {
        let path = `book`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'GET',
        })
    }
    static addBook(data) {
        let path = `book`;
        return request(`${this.urlAPI()}${path}`, {
            method: 'POST',
            data
        })
    }
}

export default Api