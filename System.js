/// html varaibles
const tableBody = document.getElementById('tablebody');
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxs');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.querySelector('.total');
const create = document.getElementById('Creat');
const category = document.getElementById('category');
const RemoveAll = document.getElementById('deleteAll');
const btnRemovAll = document.getElementById('delet');
const updateclass = document.getElementById('update');
const updateElemetn = document.getElementById('updateElement');
const cancel = document.getElementById('cancel');
const quantity = document.getElementById('quantity');
const search = document.getElementById('search');
const searchId = document.getElementById('searchId');
const searchCategory = document.getElementById('searchCategory');
/// using variables
let updatedElement;
let id = 1;
let totalprices = 0;
let products = [];
let searchby = -1;
let count = 1;

if(localStorage.length != 0){
    pro = JSON.parse(localStorage.getItem('products'));
    products = pro;
    CREATEELEMENT(products);
}


create.addEventListener('click' , function(){
    let product={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totalprice:parseFloat(total.textContent),
        category:category.value,
    }
    if(products.title != '' & product.price != ''){
        if(quantity.value != ''){
            for(let i = 0; i < +quantity.value; ++i){
                products.push(product);
            }
        }else{
            //let val = createrow(product); 
            //console.log(product)
            products.push(product);

        }
        localStorage.setItem('products', JSON.stringify(products));
        CREATEELEMENT(products);

    }
  
    ClearInputsFields();
   
})


function totalprice(){
        if(price.value!=''){
            let p  = price.value == '' ? 0:parseFloat(price.value);
            let t  = taxes.value== ''?0:parseFloat(taxes.value);
            let a  = ads.value == ''?0:parseFloat(ads.value);
            let d  = discount.value== ''?0:parseFloat(discount.value);
            totalprices = p-d+a+t
            total.textContent = totalprices;
            total.classList.add('gr');
        }else{
            total.classList.remove('gr');
            total.innerHTML = 0;
        }

}


function deletElement(element){
    products.splice(element-1,1);
    CREATEELEMENT(products);
    localStorage.products = JSON.stringify(products);
}

function ClearInputsFields(){
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.value='';
    category.value='';
    title.value='';
    total.classList.remove('gr');
    total.innerHTML = 0;
    quantity.value = '';
}

function createrow(product,id){
    return `
        <tr>
            <td>${id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.totalprice}</td>
            <td>${product.category}</td>
            <td><button class="dynamicbutton" onclick="update(${id})">updata</button></td>
            <td><button class="dynamicbutton" onclick="deletElement(${id})">delete</button></td>

        </tr>
        
        `;
}
function CREATEELEMENT(products){
    if(products.length > 0){
      RemoveAll.classList.remove('delete');
      btnRemovAll.value = `Delete All (${products.length})`

    }else{
        RemoveAll.classList.add('delete');
    }
    let element = []
    for(let i = 0; i < products.length; ++i){
         element.push(createrow(products[i],i + 1));
        

    }
    tableBody.innerHTML = element.join('');

}


/// remove all 
btnRemovAll.addEventListener('click',DeleteALL);
function DeleteALL(){
    products.splice(0);
    localStorage.clear();
    CREATEELEMENT(products);
}
/// update function
function update(index){
    updatedElement = index;
    updateclass.classList.remove('delete');
    create.classList.add('delete');
    quantity.classList.add('delete');
    
}

cancel.addEventListener('click',function(){
    updateclass.classList.add('delete')
    create.classList.remove('delete');
    quantity.classList.remove('delete');
    
})

updateElemetn.addEventListener('click',()=>{
    updatedElement--;
    console.log(updatedElement);    
    products[updatedElement].title = title.value != ''? title.value:products[updatedElement].title;
    products[updatedElement].price = price.value != ''? price.value:products[updatedElement].price;
    products[updatedElement].ads = ads.value != ''? ads.value:products[updatedElement].ads;
    products[updatedElement].taxes = taxes.value != ''? taxes.value:products[updatedElement].taxes;
    products[updatedElement].discount = discount.value != ''? discount.value:products[updatedElement].discount;
    products[updatedElement].totalprice = totalprices != ''? totalprices:products[updatedElement].totalprice;
    products[updatedElement].category = category.value != ''? category.value:products[updatedElement].category;
    localStorage.products = JSON.stringify(products);
    CREATEELEMENT(products);
    updateclass.classList.add('delete')
    create.classList.remove('delete');
    quantity.classList.remove('delete');
    ClearInputsFields();
    
})



//  function search by id 

function showbyId(){
    let id = search.value;
    let arr = [];
    console.log("id is " , id);
    console.log("searchby is " ,searchby);
    if(id != '' & searchby == 1){
        console.log('search by id')
        for(let i = 0; i < products.length; ++i){
            if(parseInt(id) === i+1){
                console.log(id);
                tableBody.innerHTML = createrow(products[i],i+1);
            }
        }
    }
    else if(id != '' & searchby == 0){
        
        let result = [];
        for(let i = 0; i < products.length; ++i){
            if(products[i].title.toLowerCase().includes(id.toLowerCase())){
                
                result.push(createrow(products[i],i+1));
            }
        }
        tableBody.innerHTML=result.join('');
    }else if(id == ''){
        CREATEELEMENT(products);
    }
}

//  function search by name 
searchId.addEventListener("click",function(){
    searchby = 1
});
searchCategory.addEventListener("click",function(){
    searchby = 0
});
