const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar') ;
btnEmpezar.addEventListener("click", empezarJuego )
const score = document.getElementById("score")

const ULTIMO_NIVEL= 10

class Juego {
  constructor() {
   
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()

   
    setTimeout(() =>{
    this.siguienteNivel()

    } , 500 ) }

  inicializar() {
    this.siguienteNivel =this.siguienteNivel.bind(this)//de esta manera this siempre estara atada al juego y no poodra cambiar de dueño como pasaria si no lo pusieramos que window se convertiria en dueño del this
    this.elegirColor = this.elegirColor.bind(this)// lo que hacemos al ponerle bind(this) es atar ese this al juego que creamos,para que al disparar el evento nossalga relacionado con lo nuestro
    this.toggleBtnEmpezar() //toogle es un encendido  o apagado para mostrar el boton Empezar a  jugar
  
    this.nivel = 1
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
     
    }
  }

  toggleBtnEmpezar()
  {
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else
    {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia()
  {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() * 4 ) )  //multiplica un valor entre 0 y 4 pero nunca llegara a 4
  }

  
  siguienteNivel(){
    this.subnivel = 0
    setTimeout(() =>
    this.iluminarSecuencia(),1000)
    this.agregarEventosClick()

  }

  transformarNumeroAColor(numero){
    switch (numero){
      case 0:
        return 'celeste' // no hace falta poner el break
        case 1:
        return 'violeta'
        case 2:
        return 'naranja'
        case 3:
        return 'verde'
    }
  }
  
  apagarColor(color) 
{
  this.colores[color].classList.remove('light')
}
  
  iluminarColor(color)
  {
    this.colores[color].classList.add('light')
    setTimeout( ()=> this.apagarColor(color),350)//se pone apagar color con el parametro color y 350 milisegundos para apagarlo
  }


  //aca recibimos el color del ususario
  transformarColorANumero(color){
    switch (color){
      case 'celeste':
        return 0 
        case 'violeta':
        return 1
        case 'naranja':
        return 2
        case  'verde':
        return 3
    }
  }


  iluminarSecuencia(){
    for(let i = 0; i < this.nivel; i++)//con esto obtenemos el color que vamos a iluminar y llamar a la funcion que lo ilumine
  {
    //al for en vez de  var i = 0 se pone let i = 0 y luego el color const para q no repita el mismo color 
    //en vez de var color se pone const color porq en var se estaria pisando siempre el mismo color en todos los niveles
   
    const color = this.transformarNumeroAColor(this.secuencia[i])//de esta manera por cada uno de los numero lo transformara a  color
   setTimeout (() => this.iluminarColor(color), 1000 * i )//esto es para distanciar la iluminacion de los colores en secuencia
  }
  

  //esta funcion ya es la que nos hace participe del juego agregando otra funcion "elegirColor" como parametro de esta
 

  

}
agregarEventosClick()
   {
    this.colores.celeste.addEventListener('click', this.elegirColor)// lo que hacemos al ponerle bind(this) es atar ese this al juego que creamos,para que al disparar el evento nossalga relacionado con lo nuestro
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)

  }
  eliminarEventosClick()
  {
    this.colores.celeste.removeEventListener('click', this.elegirColor)// lo que hacemos al ponerle bind(this) es atar ese this al juego que creamos,para que al disparar el evento nossalga relacionado con lo nuestro
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

//el parametro ev es para que aparezca en consola algun evento
  elegirColor(ev)
  {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    this.iluminarColor(nombreColor)
   
    if(numeroColor === this.secuencia[this.subnivel]) //si los datos que recibimos son iguales ala secuencia aumenta el subnivel y el nivel
  
   {
    this.subnivel++
    if(this.subnivel === this.nivel)//si el subnivel es igual al nivel,se aumenta el nivel y pasa otra secuencia
    {
      this.nivel++
      this.eliminarEventosClick()
      if(this.nivel ===( ULTIMO_NIVEL + 1))

      {
        //gano

        this.ganoElJuego()
      }

      else

      {
       setTimeout(this.siguienteNivel(), 1500)
      }

    }

   }

   else
   {
   //perdio

   this.perdioElJuego()
   }
  }
  

  ganoElJuego()
{
  swal ('Platzi','Omedetou,Ganaste el juego', 'success')
  .then(() => {
    this.eliminarEventosClick()
    this.inicializar()
  })
}
perdioElJuego()
{
  swal('Platzi','Que lastima,lo rompiste wey','error')
  .then(() => {
    this.eliminarEventosClick()
    this.inicializar()
  })
}
}


function empezarJuego() {
  window.juego = new Juego()
 
}