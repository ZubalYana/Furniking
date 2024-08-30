axios.get('/getGoods')
.then((res)=>{
    for(let item of res.data){
        const imgSrc = item.img.replace(/\\/g, '/');
        const prices = item.prices;
        const newPrice = prices[prices.length - 1];
        const oldPrice = prices[prices.length - 2];
        
        const $good = $(`
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
                            <div class="newPrice">$${newPrice}</div>
                            <div class="oldPrice"><s>$${oldPrice}</s></div>
                        </div>
                        <div class="rating">${generateStars(item.rating)}</div>
                    </div>
                </div>
            </div>
        `);

        //set the status color
        const $status = $good.find('.status');
        if (item.status === "New") {
            $status.css('background-color', '#00B7F1');
        } else if (item.status === "Sale") {
            $status.css('background-color', '#7AC751');
        }

        //append the element to the container
        $('.goodsCon').append($good);
    }
})
.catch((error)=>{
    console.error('Error fetching goods:', error);
});

//function to generate star ratings
function generateStars(rating) {
    const totalStars = 5;
    let starsHtml = '';

    const filledStarSvg = `
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.62609 3.85757L3.93345 3.81496L4.07632 3.5395L5.36119 1.06219C5.36121 1.06215 5.36123 1.06211 5.36125 1.06207C5.3628 1.0591 5.36356 1.05854 5.36316 1.05896C5.36289 1.05924 5.36309 1.05891 5.36449 1.05812C5.368 1.05615 5.37763 1.05235 5.39231 1.05239C5.40705 1.05244 5.41757 1.05634 5.42225 1.05899L5.42422 1.06025L5.42465 1.06062L5.42469 1.06066L5.42486 1.06088L5.42616 1.06306L5.42618 1.06309L6.71058 3.5395L6.85344 3.81496L7.16081 3.85757L10.0358 4.25615L10.0362 4.2562C10.039 4.25659 10.0414 4.25703 10.0435 4.25748L7.97869 6.17083L7.73763 6.3942L7.79607 6.71761L8.28531 9.42531C8.27796 9.42979 8.26911 9.43276 8.2608 9.43348C8.25365 9.43411 8.24541 9.43341 8.23374 9.42757L8.23365 9.42752L5.66171 8.14197L5.39345 8.00789L5.12519 8.14197L2.55325 9.42752L2.5514 9.42845C2.53995 9.43422 2.53219 9.4348 2.52564 9.43423C2.51763 9.43354 2.50884 9.43059 2.50146 9.42597L2.99083 6.71761L3.04927 6.3942L2.8082 6.17083L0.74338 4.25748C0.745483 4.25703 0.747909 4.25659 0.750685 4.2562L0.751103 4.25615L3.62609 3.85757ZM8.28804 9.44028L8.87846 9.3336C8.96701 9.82574 8.42193 10.1925 7.96539 9.96421L8.28804 9.44028Z" fill="white" stroke="#7AC751" stroke-width="1.2"/>
      </svg>
    `;

    const emptyStarSvg = `
      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.04296 3.85733L4.35032 3.81471L4.49319 3.53926L5.77806 1.06195C5.77808 1.06191 5.7781 1.06187 5.77812 1.06183C5.77967 1.05886 5.78044 1.0583 5.78003 1.05872C5.77976 1.05899 5.77996 1.05866 5.78136 1.05787C5.78487 1.0559 5.7945 1.0521 5.80918 1.05215C5.82392 1.05219 5.83444 1.0561 5.83912 1.05874L5.84109 1.06001L5.84152 1.06037L5.84156 1.06042L5.84173 1.06064L5.84303 1.06282L5.84305 1.06284L7.12745 3.53926L7.27031 3.81471L7.57768 3.85733L10.4527 4.2559L10.4531 4.25596C10.4559 4.25634 10.4583 4.25678 10.4604 4.25724L8.39556 6.17058L8.1545 6.39396L8.21294 6.71737L8.70218 9.42506C8.69483 9.42955 8.68598 9.43251 8.67767 9.43324C8.67052 9.43387 8.66228 9.43316 8.65061 9.42733L8.65052 9.42728L6.07858 8.14173L5.81032 8.00764L5.54206 8.14173L2.97012 9.42728L2.96827 9.42821C2.95682 9.43398 2.94906 9.43456 2.94251 9.43399C2.9345 9.43329 2.92571 9.43035 2.91833 9.42572L3.4077 6.71737L3.46614 6.39396L3.22507 6.17058L1.16025 4.25724C1.16235 4.25678 1.16478 4.25634 1.16756 4.25596L1.16797 4.2559L4.04296 3.85733ZM8.70491 9.44004L9.29533 9.33336C9.38388 9.8255 8.8388 10.1923 8.38226 9.96397L8.70491 9.44004Z" fill="white" stroke="#CCCCCC" stroke-width="1.2"/>
      </svg>
    `;

    for (let i = 0; i < totalStars; i++) {
        if (i < rating) {
            starsHtml += filledStarSvg;
        } else {
            starsHtml += emptyStarSvg;
        }
    }

    return starsHtml;
}
