// console.log("Hello world");


const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_DllZjidqY02suyfowecBMM7hffG63InG887OPIvXOqDsJluPzvY5Os5Rfg5FKIHa';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?&api_key=live_DllZjidqY02suyfowecBMM7hffG63InG887OPIvXOqDsJluPzvY5Os5Rfg5FKIHa';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?&api_key=live_DllZjidqY02suyfowecBMM7hffG63InG887OPIvXOqDsJluPzvY5Os5Rfg5FKIHa`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload?&api_key=live_DllZjidqY02suyfowecBMM7hffG63InG887OPIvXOqDsJluPzvY5Os5Rfg5FKIHa';
// 

const spanError = document.getElementById('error');


async function loadRandomMichis(){
    const res = await fetch(API_URL_RANDOM);
    // Get the response from API in res
    const data = await res.json();
    // Transform res into a .json
    console.log("Random");
    console.log("Data: " , data);
    console.log("Status: " , res.status);
    console.log("___________________")
    //Check it

    if (res.status !== 200){
        spanError.innerHTML="Error: " +  res.status +  data.message;
        console.log("status error");
        //Error handling

    }else {
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        const btn1 = document.getElementById("btn1");
        const btn2 = document.getElementById("btn2");

        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavoriteMichis(data[0].id);
        btn2.onclick = () => saveFavoriteMichis(data[1].id);
    }
};

async function loadFavoriteMichis(){
    
        const res = await fetch(API_URL_FAVORITES, 
        //     {
        //     method:'GET',
        //     headers:{
        //         //'x-api-key': 'live_uYSOpwOOQnSI64snRYGC4zXPGy89grHw6LIeEw5GgWvhf7q0hkU81fVLc4R0xWyQ',
        //     },
        // As an optional way, we could use the API-KEY in the header. 
        // Const API_URL_FAVORITES should be manipulated in order to getting a correct URL 
        // Check the API requirements in https://thecatapi.com/ 
        // }
        );
        
        const data = await res.json();


    
        console.log("Favorites");
        console.log("Data: " , data);
        console.log("Status: " , res.status);
        console.log("___________________")

        if (res.status !== 200){
            spanError.innerHTML="Error " + res.status + data.message;
            console.log("status error");
        } else {
            const section = document.getElementById('favoriteMichis');
            section.innerHTML="";
            const h2 = document.createElement('h2');
            const h2text = document.createTextNode('Favorites michis');
            section.appendChild(h2);
            h2.appendChild(h2text);
            
            data.forEach(michi => {
               
               const article = document.createElement('article');
               const img = document.createElement('img');
               const btn = document.createElement('button');
               const btnText = document.createTextNode('Remove the michi from favorites');
             
               btn.appendChild(btnText);
               img.src = michi.image.url;
               img.width = 150;
               btn.onclick = () => deleteFavoriteMichis(michi.id);
               article.appendChild(img);
               article.appendChild(btn);
               section.appendChild(article);
            
            }) 
            
            
        }
}

async function saveFavoriteMichis(id){
    const res = await fetch(API_URL_FAVORITES, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            image_id: id
            // API doc demands the body as string to mantain the compatibility with other languages
            
        }),
    });

    const data =await res.json();

    console.log('SAVE:');
    console.log(res);
    console.log("Data: " , data);
    console.log("Status: " , res.status);
    console.log("___________________")

    if (res.status !== 200){
        spanError.innerHTML="Error: " +  res.status +  data.message;
        console.log("status error");
    } else {
        console.log("Michi saved in favorites");
        loadFavoriteMichis();

    }
}

async function deleteFavoriteMichis(id){
    const res = await fetch(API_URL_FAVORITES_DELETE(id),{
        method: 'DELETE'    
    });
    const data = await res.json();

    if (res.status !== 200){
        spanError.innerHTML="Hubo un error " +  res.status +  data.message;
        console.log("status error");
    } else {
        console.log("Michi eliminado de favoritos");
        loadFavoriteMichis();
    }
    
}

async function uploadMichiPhoto(){
    const form = document.getElementById('uploadingform');
    const formData = new FormData(form);
    // Add the form from HTML to FormData class and handdle it as an object 

    console.log(formData.get('file')); //name of the form

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers:{
            // 'Content-Type':'multipart/formdata'
        },
        body: formData,
    })
    const data = await res.json();

    if ( res.status  !== 201 ){
        spanError.innerText = "Hubo un error: " + res.status + " "  + data.message
    }else{
        console.log("Michi cargado correctamente");
        console.log({data});
        console.log(data.url);
        console.log(loadFavoriteMichis());
        loadFavoriteMichis()
    }

    // We could add a function that adds the id to the favorites michis list.
    // So the uploaded pic is shown in screen
}       



loadRandomMichis();
loadFavoriteMichis();



//Axios library example:

// const api =axios.create({
//     baseURL: 'https://api.thecatapi.com/v1/'
// });
// api.defaults.headers.common['X-API-KEY'] = 'your-api-key'

//Axios offers a simpler way to stablish CRUD operations with API

// async function saveFavoriteMichis(id){
//     const {data, status} = await api.post('/favourites',{
//         image_id: id,
//     })
// }
