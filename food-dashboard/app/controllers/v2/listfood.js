export default class ListFood {

    getAPI() {
        return axios({
            method: 'GET',
            url: `https://610bedf566dd8f0017b76b91.mockapi.io/api/foods`,
        })


    }
    postAPI(data) {
        return axios({
            method: 'POST',
            url: `https://610bedf566dd8f0017b76b91.mockapi.io/api/foods`,
            data,
        })


    }


    deleteAPI(id) {
        return axios({
            method: 'DELETE',
            url: `https://610bedf566dd8f0017b76b91.mockapi.io/api/foods/${id}`,

        })


    }

    getIdAPI(id) {
        return axios({
            method: 'GET',
            url: `https://610bedf566dd8f0017b76b91.mockapi.io/api/foods/${id}`,

        })


    }

    updateFoodAPI(data, id) {

        return axios({
            method: 'PUT',
            url: `https://610bedf566dd8f0017b76b91.mockapi.io/api/foods/${id}`,
            data,
        })

    }
}
