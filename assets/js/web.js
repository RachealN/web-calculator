var SERVER_PATH = "https://web-calculator-api.herokuapp.com/"
var url = SERVER_PATH+"operations";
fetch(url, {
    method: 'get',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    },
    cache: 'no-cache'
    
})
    .then((res) => res.json())
    .then(result => {     
            var results = `<table>
            <thead>
              <tr>
                <th>Number1</th>
                <th>Number2</th>
                <th>Response</th>
                <th>Expected</th>
                <th>Passed</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>          
            </tbody>`;
                var i = 0;
                console.log(JSON.stringify(result.data[0]['number1']))
                for(i=0; i < result.data.length; i++){
                    results +=  ` <tr>
                    <td data-column="Numb1">${result.data[i]['number1']}</td>
                    <td data-column="Numb2">${result.data[i]['number2']}</td>
                    <td data-column="Res">${result.data[i]['response']}</td>
                    <td data-column="Expect">${result.data[i]['expected']}</td>
                    <td data-column="Pass">${result.data[i]['passed']}</td>
                    <td data-column="Rmv"><span style="cursor:pointer;" onclick="deleteRecord(${result.data[i]['id']})">x</span/td>
                  </tr>`;
                }
                document.getElementById("results_table").innerHTML = results+"<tbody></table>";
            //    +
            //     
            } );


          //method for deleting a record
          function deleteRecord(num){
            var id = num.toString()
            fetch(url+'/'+id, {
              method: 'delete',
              headers: {
                  'Accept': 'application/json',
                  'Content-type': 'application/json',
              },
              cache: 'no-cache'
              
          })
              .then((res) => res.json())
              .then(result => { 
                  alert(JSON.stringify(result.message));
                  window.location.href="index.html";
                })
        }

          //method for performing mathematical operations
          function performOperation(){
              var number1 = document.getElementById('number1').value;
              var number2 = document.getElementById('number2').value;
              var operator = document.getElementById('operation').value;

              const data = {"expr": number1+operator+number2}

              fetch(url, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                cache: 'no-cache',
                body: JSON.stringify(data)
                
            })
                .then((res) => res.json())
                .then(result => { 
                      if(result.error === null){
                        window.location.href="index.html";
                      }
                      else{
                        alert(JSON.stringify(result.error));
                        window.location.href="index.html";
                      }
                    });
          }