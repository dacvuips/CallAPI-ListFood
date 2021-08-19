import Food from "./../../controllers/v2/food.js"
import ListFood from "./../../controllers/v2/listfood.js"
const listfood = new ListFood
const getEle = (id) => document.getElementById(id);

const fetch = () => {
    listfood.callAPI(`foods`, 'GET', null)
        .then((arr) => {
            let resp = arr.data

            renderHTML(resp)


        })
        .catch((error) => {
            console.log("Lỗi")

        })


}

fetch()



const renderHTML = (resp) => {
    let html = resp.reduce((total, value) => {

        let value1 = `
            <tr>
            <td>${value.id}</td>
            <td>${value.tenMon}</td>
            <td><img src="./../../assets/img/${value.hinhMon}"></td>
            <td>${value.loaiMon ==="loai1"? "Chay":"Mặn"} </td>
            <td>${value.giaMon}</td>
            <td>${value.khuyenMai}</td>
            <td>${value.giaKhuyenMai}</td>
            <td>${value.tinhTrang ==="0"? "Hết":"Còn"}</td>
            <td>${value.moTa}</td>

            <td>
            <button class="btn btn-info" action="update"data-id="${value.id}">Cập nhật</button>
            <button class="btn btn-danger" data-id="${value.id}"onclick="deleteMon(${value.id})">Xóa</button>
            </td>
           
            </tr>
           
            `
        return total + value1
    }, []);


    getEle("tbodyFood").innerHTML = html;

}


getEle("btnThem").addEventListener('click', () => {
    getEle('foodID').disabled = "true"
    document.querySelector(".modal-footer").innerHTML = `
    <td>
    <button class="btn btn-warning" onclick="themFood()">Thêm</button>
    <button class="btn btn-danger" onclick="dongForm()">Đóng</button>
    </td>
    `
})

const dongForm = () => {

    document.getElementsByClassName('close')[0].click()
    showUpdate("")

}
window.dongForm = dongForm;

const themFood = () => {

    const tenMon = getEle('tenMon').value;
    const loaiMon = getEle('loai').value;
    const giaMon = getEle('giaMon').value;
    const giaKhuyenMai = getEle('khuyenMai').value;
    const tinhTrang = getEle('tinhTrang').value;
    let hinhMon = "";
    const moTa = getEle('moTa').value;


    if (getEle('hinhMon').files.length > 0) {

        hinhMon = getEle('hinhMon').files[0].name;
    }

    const foods = new Food("", tenMon, loaiMon, giaMon, giaKhuyenMai, tinhTrang, hinhMon, moTa)

    console.log(foods)


    listfood.callAPI(`foods`, "POST", foods)
        .then(() => {

            fetch()

        })
        .catch(() => {

            console.log('Lỗi')

        })
    showUpdate("")
}


window.themFood = themFood;


const deleteMon = async(id) => {


    try {
        await listfood.callAPI(`foods/${id}`, "DELETE", null)
        fetch()

    } catch (error) {
        console.log('Delete Lỗi')
        alert('Delete Lỗi')

    }


}
getEle("tbodyFood").addEventListener('click', (event) => {

    const action = event.target.getAttribute('action')

    const id = event.target.getAttribute('data-id')
    if (action === "update") {

        getEle("btnThem").click()
        getEle('foodID').disabled = "true"
        showUpdate(id)

        document.querySelector(".modal-footer").innerHTML = `
    <td>
    <button class="btn btn-success" onclick="updateFood(${id})">Cập nhật</button>
    <button class="btn btn-danger" onclick="dongForm()">Đóng</button>
    </td>
    `

    }

})
window.deleteMon = deleteMon;

const showUpdate = async(id) => {
    let getIDFood = await listfood.callAPI(`foods/${id}`, "GET", null)
    getEle('foodID').value = getIDFood.data.id || "";
    getEle('tenMon').value = getIDFood.data.tenMon || "";
    getEle('loai').value = getIDFood.data.loaiMon || "";
    getEle('giaMon').value = getIDFood.data.giaMon || "";
    getEle('khuyenMai').value = getIDFood.data.khuyenMai || "";
    getEle('tinhTrang').value = getIDFood.data.tinhTrang || "";
    getEle('moTa').value = getIDFood.data.moTa || "";
    getEle('hinhMon').files.name = getIDFood.data.hinhMon || "";



}

window.showUpdate = showUpdate;


const updateFood = async(id) => {

    const tenMon = getEle('tenMon').value;
    const loaiMon = getEle('loai').value;
    const giaMon = getEle('giaMon').value;
    const khuyenMai = getEle('khuyenMai').value;
    const tinhTrang = getEle('tinhTrang').value;
    const moTa = getEle('moTa').value;

    let hinhMon = "";


    if (getEle('hinhMon').files.length > 0) {

        hinhMon = getEle('hinhMon').files[0].name;
    }

    const foods = new Food(id, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, hinhMon, moTa)



    listfood.callAPI(`foods/${id}`, "GET", null)
        .then((resp) => {

            if (!foods.hinhMon) {
                foods.hinhMon = resp.data.hinhMon;

            }
            listfood.callAPI(`foods/${id}`, "PUT", foods)
                .then(() => {

                    fetch()

                })
                .catch(() => {

                    console.log('Lỗi')

                })
        })

    showUpdate("")

}
window.updateFood = updateFood;


getEle("selLoai").addEventListener('change', (event) => {
    listfood.callAPI(`foods`, 'GET', null)
        .then((arr) => {
            let resp = arr.data
            let value = event.target.value;
            console.log(value)
            if (value === "") {

                resp = arr.data;
            }
            if (value === "loai1") {


                resp = arr.data.filter((value) => {

                    return value.loaiMon === "loai1"

                });



            }
            if (value === "loai2") {

                resp = arr.data.filter((value) => {

                    return value.loaiMon === "loai2"

                });

            }
            if (value === "all") {
                resp = arr.data;
            }

            renderHTML(resp)


        })
        .catch((error) => {
            console.log("Lỗi")

        })

});

getEle("page").addEventListener('click', (event) => {
    listfood.callAPI(`foods`, 'GET', null)
        .then((arr) => {
            let resp = arr.data
            let value = event.target.innerHTML;
            console.log(value)

            if (value === "1") {


                resp = arr.data.filter((value, index) => {
                    // for(let i=0;i<3;i+=1){
                    //     return value.loaiMon === "loai1"

                    // }
                    return index >= 0 && index < 5;

                });



            }
            if (value === "2") {

                resp = arr.data.filter((value, index) => {

                    return index >= 5 && index < 10;


                });

            }
            if (value === "3") {
                resp = arr.data.filter((value, index) => {

                    return index >= 10 && index < 15;


                });
            }

            renderHTML(resp)


        })
        .catch((error) => {
            console.log("Lỗi")

        })

});

getEle("search").addEventListener('keyup', async() => {

    let type = xoa_dau(getEle("search").value.trim().toLowerCase());


    let search = [];
    try {
        let reps = await listfood.callAPI("foods", 'GET', null)


        let searchs = reps.data.filter((value) => {
            let TM = xoa_dau(value.tenMon)
            let MT = xoa_dau(value.moTa)
            if ((TM.trim().toLowerCase().indexOf(type) !== -1) || (MT.trim().toLowerCase().indexOf(type) !== -1)) {
                return value

            }
        });


        renderHTML(searchs)


    } catch (error) {
        console.log("lỗi")

    }

})

const xoa_dau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/\s+/g, ' ');
    str = str.replace(' ', '');
    return str;
}
