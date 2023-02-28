
    let cerotareas = document.getElementById("notareas")
    let tarea = document.getElementById("taskboard")
    let primerapag = document.getElementById("firstpage")
    let btn  = document.getElementById ("boton")
    let btnsalir  =document.getElementById ("btnsalir")
    
    
    let titulo = document.getElementById('saludo')
    let entradaLoca = document.getElementById ('entrada')
    let botoncito = document.getElementById ('botoncito')
    let contenedor = document.getElementById('saludos')

    let flag =0
  



    botoncito. addEventListener('click', function () {
        let tipo = entradaLoca.value
        let saludito = tipo
        var sal = document.createElement ('h1')
        var txt = document.createTextNode (saludito)
        sal.appendChild (txt)
        contenedor.appendChild(sal)

        //primerapag.classList.toggle('firstpage')
       // tarea.classList.toggle('tareitasnone')
       
       primerapag.style.display = 'none'
       tarea.style.display = 'none'
       btn.style.display='block'
       entradaLoca.value =""
       primerapag.style.display='none'
       contenedor.style.display='block'
       flag++
        })



        btn.addEventListener("click", function() {
            

            if (tarea.classList == "tareitasnone"){
                
                primerapag.style.display = 'none'
                tarea.style.display = 'block'
                btn.style.display='none'
                entradaLoca.value =""
               primerapag.style.display='none'
                contenedor.style.display='none'
            }
           
         
           
            else{
              
                primerapag.style.display = 'none'
                tarea.style.display = 'none'
                contenedor.style.display='none'
                
            }
    
        })


        btnsalir.addEventListener("click",function(){

            
            
            tarea.style.display = 'none'
            btn.style.display='block'
            

            if (flag ==0)

            {
                primerapag.style.display='block'

            }
            else{
                contenedor.style.display='block'
            }

        })
  


