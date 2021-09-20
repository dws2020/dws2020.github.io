async function callApi(){
    const zipCode = document.getElementById('search-word').value;
    const uri = "https://zipcloud.ibsnet.co.jp/api/search" + "?zipcode=" + zipCode;
    const res = await window.fetch(uri);
    const result = await res.json();
    console.log(result);
}

// async function callApi(){
//     const res = await window.fetch("https://jsonplaceholder.typicode.com/users");
//     const users = await res.json();
//     console.log(users);
// }

let searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', function(){
    callApi();
})
