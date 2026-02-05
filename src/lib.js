export function APIURL(city){
    return "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=31500fc6bb45cb9aeec1f2834fe8c056&units=metric";

}
export function callApi(reqMethod, url, data, responseHandler)
{   let options;
    if(reqMethod === "GET" || reqMethod === "DELETE")
        options = {method: reqMethod};
    else
        options = {method: reqMethod, headers:{'Content-Type':'application/json'}, body: data};

    fetch(url, options)
        //send request in async
        .then((response)=>{
            if(!response.ok)
                throw new Error(response.status + '-' + response.statusText);
            return response.json();
        })
        //receive response
        .then((res)=>responseHandler(res))
        //handle error
        .catch((err)=>alert(err));
}
