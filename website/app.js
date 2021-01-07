/* Global Variables */
const baseUrl   = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key       = '8c6b0f0e60a130d3491dd90292ba94f5';

const generate  = document.getElementById('generate');
const date      = document.getElementById('date');
const temp      = document.getElementById('temp');
const content   = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
let newDate = d.toLocaleString('en-US',({month: 'numeric' , day: 'numeric' , year: 'numeric'}));

let eventFunc = () =>{
    const  zipCode   = document.getElementById('zip').value;
    const feelings  = document.getElementById('feelings').value;
    getData(baseUrl, zipCode, key)
        .then((data)=>{
            postData('/addingData',{
                temp    : data.main.temp,
                date    : newDate,
                feelings: feelings
            })
            .then(()=>{
                updateUI();
            })
        })
        .catch(err=>{
            console.log(err);
        });
}
generate.addEventListener('click',eventFunc);



// get data
const getData = async(baseUrl, zipCode, key) =>{
    const req = await fetch(`${baseUrl}${zipCode}&appid=${key}&units=metric`);
    try{
        const reqResult = await req.json();
        return reqResult;
    }
    catch(err){
        console.log(err);
    }
}

// post data
const postData = async(url = '', data = {}) => {
    const req = await fetch(url,{
        method      : "POST",
        credentials : "same-origin",
        headers     : {
            "Content-Type": "application/json"
        },
        body        :JSON.stringify(data)
    });

    try{
        const reqResult = await req.json();
        return reqResult;
    }
    catch(err){
        console.log(err);
    }
}

// update UI
const updateUI = async() =>{
    const req = await fetch('/all');
    try{
        const reqResult     = await req.json();
        date.innerHTML      = reqResult.date;
        temp.innerHTML      = reqResult.temp;
    content.innerHTML       = reqResult.feelings; 
    }
    catch(err){
        console.log(err);
    }
}