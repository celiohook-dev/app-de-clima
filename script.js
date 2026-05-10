const inputCidade = document.querySelector("#cidade")
const buscar = document.querySelector("#bnt")
const resultado = document.querySelector("#resul")

const API_KEY = '6b779ff701464cf2ad3f45b86d6ea0b3'

buscar.addEventListener('click', buscarClima)
inputCidade.addEventListener('keypress', e =>{
    if(e.key === 'Enter')
        buscarClima()
})

async function  buscarClima() {
     const cidade = inputCidade.value
        if(!cidade) {
        
            alert("Digite uma cidade")
        return 
     
        }
       resultado.innerHTML=`<div class="loader"></div>`

         const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=6b779ff701464cf2ad3f45b86d6ea0b3&units=metric&lang=pt_br`

        console.log("URL que vou buscar:", url);
   
        try {
   const resposta = await fetch(url)
   const dados = await resposta.json()


   if(dados.cod === 200) {
    mostrarClima(dados)
   }

   
   else{
    resultado.innerHTML=`<p  style="color:#ff4444"> Cidade não encontrada 🥲<P/>`

   }

    }catch (erro) {
        console.log('erro detalhado',erro);
        
        resultado.innerHTML=`<p  style="color:#ff4444"> Erro na conexão<P/> `
    }

    function mostrarClima (dados) {
        console.log("dados recebidos",dados)
        const html =`

        <div class="clima-card">
         <h2>${dados.name}</h2>
         <img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@4x.png" alt ="Icone do clima">
         <h1> ${Math.round(dados.main.temp)} °C</h1>

         <h2 class="desc"> ${dados.weather[0].description} </h2> 


         <div class="detalhes">
        <p> Sensação: ${Math.round(dados.main.feels_like)} °C </p>
          <p> Umidade: ${dados.main.humidity} % </p>
          <p> Vento: ${dados.wind.speed} m/s</p>
        </div>
        </div>

         




       
 
        `

        resultado.innerHTML=html
    
      
    }
      
}

  