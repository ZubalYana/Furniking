//get and display all the goods
axios.get('/getGoods')
.then((res)=>{
    console.log(res.data)
    for(let item of res.data){
        $('.goodsCon').append(
            `
            <div class="good">
                <div class="pictureCon">
                    <div class="status">${item.status}</div>
                    <img src="${item.img}" alt="">
                </div>
                <div class="info">
                    <div class="type">${item.type}</div>
                    <div class="name">${item.name}</div>
                    <div class="info_bottom">
                        <div class="prices">
                            <div class="newPrice"></div>
                            <div class="oldPrice"></div>
                        </div>
                        <div class="rating">${item.rating}</div>
                    </div>
                </div>
            </div>
            
            `
        )
    }
})