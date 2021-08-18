const BASE = 'https://610bedf566dd8f0017b76b91.mockapi.io/api';

export default class ListFood {

    callAPI(uri, method, data) {

        return axios({
            method,
            url: `${BASE}/${uri}`,
            data,
        })

    }
    getAPI() {
        return axios({
            method: 'GET',
            url: `${BASE}`,
        })


    }
    postAPI(foods) {
        return axios({
            method: 'POST',
            url: `${BASE}/`,
            data: foods,
        })


    }


    deleteAPI(id) {
        return axios({
            method: 'DELETE',
            url: `${BASE}/${id}`,

        })


    }

    getIdAPI(id) {
        return axios({
            method: 'GET',
            url: `${BASE}/${id}`,

        })


    }

    updateFoodAPI(data, id) {

        return axios({
            method: 'PUT',
            url: `${BASE}/${id}`,
            data,
        })

    }
}
