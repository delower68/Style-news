// categories API here 
const loadAllProducts = async ()=> {
    try{
        const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
    // console.log(res);
    const data = await res.json();
    return data ;
    }
    catch(error){
        console.log(error);
    }
    
}
// display the all categories here

const dispalyProduct =async () => {
    const myProducts =await loadAllProducts(); 
    const myProduct = myProducts.data.news_category ;
     
    const menu = document.getElementById('all-menu');

    for (const news of myProduct) {
     
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="loadCategoryDetails('${news.category_id}')" class= "text-black-50 text-decoration-none px-4 " type="button" >${news.category_name}</a>
        `
        menu.appendChild(li);

    }
}

// load category data here 
       
const loadCategoryDetails = (idCat)=> {

    // remove spinner 
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none'); 
        
        
// category details API 
    const url = `https://openapi.programming-hero.com/api/news/category/${idCat}`;

    try{
        fetch(url)
        .then(res => res.json())
        .then(data => displayCatDetails(data.data))
        
        
    }
    catch(error){
        console.log(error);
    }  
}
    
    
const displayCatDetails = cat =>{

    // top most view category got first priority 
cat.sort(function(a,b){
    return b.total_view - a.total_view
});


const catCountElemnet = document.getElementById('category_count_container');

//no data found 

if (cat.length===0) {
    catCountElemnet.innerText = ('Sorry! No data found')
}
else{
catCountElemnet.innerText = (cat.length + "  " + "items found ");

}


const categoryDetails = document.getElementById('cat-details');

// spinner stop here 
spinner.classList.add('d-none');


categoryDetails.innerHTML=`` ;
cat.forEach(cat => {
    const catDiv = document.createElement('div');
    
    catDiv.classList.add('col');


catDiv.innerHTML=`
    <div class="card mb-3 mt-4" style="max-width: 1200px;">
        <div class="row g-0 col" >
        
            <div class="col-lg-4 col-sm-4 ">
                <img src="${cat.image_url? cat.image_url: 'Here got no image'}" class=" img-fluid rounded-start me-4 " alt="...">
            </div>

        <div class="col-md-8">
                <h5 class="card-title ms-3 mt-3">${cat.title ? cat.title: 'No Title here'}</h5>
            <div class="card-body">
                    <p class="card-text" >${cat.details.slice(0 , 70)? cat.details.slice(0 , 70): 'No Details'}...</p>
                <div class="card_footer col-lg-4 col-sm-4 d-lg-flex d-sm-block ">
                    <div>
                        <img src="${cat.author.img? cat.author.img: 'No img here'}"  class=" thumbnail-img  " alt="...">
                    </div
                    <div>
                        <span class="">${cat.author.name? cat.author.name: 'null'}</span>
                        <span class="ms-4" >View:${cat.total_view? cat.total_view:'null'}'</span>
                        <button id="modal-btn" onclick="modalDetails('${cat._id}')" type="button" class="btn btn-success ms-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Details
                        </button>
                    </div>
                </div>


            </div>
        </div>
    </div>    
                `;

categoryDetails.appendChild(catDiv);

    }); 
           
}


// modal here ----------



const modalDetails = cat_id =>{

    // modal API 
    const url = `https://openapi.programming-hero.com/api/news/${cat_id}`
   
      fetch(url)
      .then(Response => Response.json())
      .then(data => showModalDetails(data.data[0]))
  }
 
  

  const showModalDetails = modalInfo =>{
    const modaltitle = document.getElementById('modal-tittle')
    modaltitle.innerText = `${modalInfo.title}` 

    const modal = document.getElementById('modal-body');
    modal.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
        <img src="${modalInfo.image_url? modalInfo.image_url: 'Here got no image'}" class=" img-fluid rounded-start me-4 " alt="...">
        <p>Publish-Date: ${modalInfo.author.published_date} </p>

        <img src="${modalInfo.author.img? modalInfo.author.img: 'No img here'}"  class=" thumbnail-img  " alt="...">
        <p>Author Name: ${modalInfo.author.name} </p>
      
    `;
    modal.appendChild(div)
  }

//   modal function call 
  modalDetails()

  
// display category function call  
  dispalyProduct();

// all category function call   
  loadAllProducts();


// blog post details here 

document.getElementById('blog-post').addEventListener('click', function(){
    const blog = document.getElementById('question-show');
    blog.textContent="";
    const div = document.createElement('div')
    div.classList.add('div')
    div.innerHTML = `
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Differences between var, let, and const?
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <strong>Var VS Let VS Const </strong>Differences between var, let, and const.

                
                The scope of a var variable is functional scope.	The scope of a let variable is block scope.	The scope of a const variable is block scope.
                It can be updated and re-declared into the scope.	It can be updated but cannot be re-declared into the scope.	It cannot be updated or re-declared into the scope.
                It can be declared without initialization.	It can be declared without initialization.	It cannot be declared without initialization.
                It can be accessed without initialization as its default value is “undefined”.	It cannot be accessed without initialization otherwise it will give ‘referenceError’.	It cannot be accessed without initialization, as it cannot be declared without initialization.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Difference between regular functions and arrow functions?
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <strong>Arrow function VS Regular function</strong> This discusses the major differences between the regular functions and the arrow functions.

                Arrow functions – a new feature introduced in ES6 – enable writing concise functions in JavaScript. While both regular and arrow functions work in a similar manner, yet there are certain interesting differences between them.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Why do we use Template String?
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <strong>All about Template String</strong> Template Literal in ES6 provides new features to create a string that gives more control over dynamic strings. Traditionally, String is created using single quotes (‘) or double quotes (“) quotes. Template literal is created using the backtick. Multiline Strings: In-order to create a multiline string an escape sequence \n was used to give new line character. However, Template Literals there is no need to add \n string ends only when it gets backtick.
                </div>
            </div>
        </div>
    </div>
    `
    blog.appendChild(div);
 });