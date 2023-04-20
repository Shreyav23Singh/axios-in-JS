//AXIOS GLOBAL - create a global fdr token
//here we are getting real token by jwt.io
axios.defaults.headers.common['X-Auth-Token']='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; //what if uou have whole baunch of protective routs -we don't have to do this(custom headers ) for every single once

// GET REQUEST
function getTodos() {
  //   axios({ // this is going to return a promise
  //       method :'get' ,
  //       url : 'https://jsonplaceholder.typicode.com/todos' ,
  //       params{   //By this way we can limit data , here we will be able to see only 5 data
  //         _limit: 5
  //       }
  //   })
  //   .then(res =>showOutput(res)) // res.data = it gives all the data // Instead of console.log we will use function i.e, showOutput  "then(res =>console.log(res.data)) "
  //   .catch(err=>console.error(err))
  // }
  //-------------------This one is long process , let's try short one --------------------------------------------
  axios
  .get('https://jsonplaceholder.typicode.com/todos',{timeout :5000} ,{
    params: {_limit: 5 } //we got limited data i.e, 5
  })
  .then(res =>showOutput(res))
  .catch(err=>console.error(err))
}



  
  // POST REQUEST - It involves in sendi9ng data
  function addTodo() {
//     axios({ 
//       method :'post' ,
//       url : 'https://jsonplaceholder.typicode.com/todos' ,
//       data:{  //here we are sending data
//         title :'New Todo',
//         completed :false // It is false because it is given in data
//       }
      
//   })
//   .then(res =>showOutput(res)) // res.data = it gives all the data // Instead of console.log we will use function i.e, showOutput  "then(res =>console.log(res.data)) "
//   .catch(err=>console.error(err))
//------------------------------------------Above one is long process -------------------------
axios.post('https://jsonplaceholder.typicode.com/todos',{
  title :'New Todo',
  completed :false

})
.then(res =>showOutput(res))
.catch(err=>console.error(err))
 }
   
  
  //Diffrence between PUT & PATCH Request
 

 //--------------------------*************************---------------------------------
  // PUT/PATCH REQUEST
  function updateTodo() {
//     axios.put('https://jsonplaceholder.typicode.com/todos/2',{ //Here 2 is id , in which you want  updation
//   title :'Updated Todo',//In put userid gone
//   completed :true

// })
// .then(res =>showOutput(res))
// .catch(err=>console.error(err))
axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
  title :'Updated Todo', //In patch userid is there
  completed :true

})
.then(res =>showOutput(res))
.catch(err=>console.error(err))
    
  }
  
  // DELETE REQUEST -In delete we should not pass any data , because we should only need to delete it . It returns just an empty object
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1',)
.then(res =>showOutput(res))
.catch(err=>console.error(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    // axios.all(
    //   [
    //   axios.get('https://jsonplaceholder.typicode.com/todos'),
    //   axios.get('https://jsonplaceholder.typicode.com/todos')
    // ])
    // .then(res =>{
    //   console.log(res[0]);
    //   console.log(res[1]);
    //   showOutput(res[1]);

    // })
    // .catch(err=>console.error(err));
    
    //---------------------------* * * * In more easir way we can do like this * * * ___________________________
    axios.all(
      [
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),  //here we have set limit of 5 
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    ])
    .then(axios.spread((todos , posts)=>showOutput(posts)))
    .catch(err=>console.error(err));
    
  }

  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config =>{
      console.log(`${config.method.toUpperCase()} request sent to ${
        config.url
      }at ${new Date().getTime()}`);
      return config;

    },error=>{return Promise.reject(error);
    }
  );

  
  // CUSTOM HEADERS
  function customHeaders() {
    const config ={
      headers: {
        'Content-Type' : 'application/json' ,
        Authorization :'sometoken'

      }
    };
    axios.post('https://jsonplaceholder.typicode.com/todos',{
  title :'New Todo',
  completed :false

}, config)
.then(res =>showOutput(res))
.catch(err=>console.error(err))
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options ={ // set a variable called option
      method :'post',
      url :'https://jsonplaceholder.typicode.com/todos',
      data :{
        title:'Hello World'
      },
      transformResponse : axios.defaults.transformResponse.concat(data =>{
        data.title=data.title.toUpperCase();
        return data;
      })
    };
    axios(options).then(res => showOutput(res));
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
  .get('https://jsonplaceholder.typicode.com/todos',{
    validateStatus :function(status){
      return status<500 //Reject only if status is greater than 500 or equals to
    }
  } )
  .then(res =>showOutput(res))
  .catch(err=>{
    if(err.response){
      //server responded with a status other than 200 range which is a success range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
      if(err.response.status === 404){
        alert('Error : Page not found')
      }else if(err.request){
        //Request was made but no response
        console.error(err.request);
      }else{console.error(err.message);

      }

    }
    
  });
  }
  
  
  // CANCEL TOKEN
  function cancelToken() {
    const source=axios.CancelToken.source();
    axios
  .get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  } )
  .then(res =>showOutput(res))
  .catch(thrown =>{
    if(axios.isCancel(thrown)){
      console.log('Request canceled ' ,thrown.message);
    }
  });
  if(true){
    source.cancel('Request Canceled ! ');
  }
    
  }
  
  
  
  // AXIOS INSTANCES
  const axiosInstance =axios.create({
    //other customs settings
    baseURL : 'https://jsonplaceholder.typicode.com'
  });
  axiosInstance.get('/comments').then(res=>showOutput(res));
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);
