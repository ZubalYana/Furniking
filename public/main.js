//get and display all the goods
axios.get('/getGoods')
.then((res)=>{
    for(let item of res.data){
        const imgSrc = item.img.replace(/\\/g, '/');
        const prices = item.prices;
        const newPrice = prices[prices.length - 1]
        const oldPrice = prices[prices.length - 2]
        $('.goodsCon').append(
            `
            <div class="good">
                <div class="pictureCon">
                    <div class="status">${item.status}</div>
                    <img src="${imgSrc}" alt="">
                </div>
                <div class="info">
                    <div class="type">${item.type}</div>
                    <div class="name">${item.title}</div>
                    <div class="info_bottom">
                        <div class="prices">
                            <div class="newPrice">${newPrice}</div>
                            <div class="oldPrice">${oldPrice}</div>
                        </div>
                        <div class="rating">${item.rating}</div>
                    </div>
                </div>
            </div>
            `
        );
    }
})
.catch((error)=>{
    console.error('Error fetching goods:', error);
});
