import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }



  onNewCard(){
    console.log("Agregando nueva tarjeta");
  }

  isFlipped: boolean = false;

  cardTransform: string = ''; 


  ngOnInit(): void {

    // Obtener los datos de la tarjeta guardada en el LocalStorage
    const cardData = localStorage.getItem('cardData');

    // Si existen datos de tarjeta guardados en el LocalStorage
    if (cardData) {
      // Convertir los datos de tipo string a JSON
      const cardDataJson = JSON.parse(cardData);

      // Guardar los datos de la tarjeta en la variable cardData
      this.cardData = cardDataJson;
    }
  }



  cardName: string = '';
  cardNumber: string = '';
  cardExpiry: string = '';
  cardCvv: string = '';
  cardType: string = '';
  cardTypes: string = '';

  cardData: any = null; // Variable para almacenar los datos de la tarjeta guardada

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  rotateCard(event: MouseEvent): void {
    const container = event.currentTarget as HTMLElement;
    const boundingRect = container.getBoundingClientRect();

    // Obtener la posición relativa del puntero dentro del contenedor
    const relX = event.clientX - boundingRect.left;
    const relY = event.clientY - boundingRect.top;

    // Calcular la rotación en función de la posición relativa
    const rotateY = (relX / container.clientWidth - 0.5) * 30; // Ajusta el factor de rotación en Y
    const rotateX = (0.5 - relY / container.clientHeight) * 30; // Ajusta el factor de rotación en X

    // Actualizar la propiedad cardTransform con la rotación calculada
    this.cardTransform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  

  onSubmit(): void {
    //agregar validaciones con regex
    const cardNumberRegex = /^[0-9]{16}$/;
  
    const cardCvvRegex = /^[0-9]{3}$/;
    const cardNameRegex = /^[a-zA-Z ]{3,}$/;
    const cardTypeRegex = /^[a-zA-Z ]{3,}$/;

    if (!cardNameRegex.test(this.cardName)) {
      alert('Por favor, ingresa un nombre válido');
      return;
    }

    if (!cardNumberRegex.test(this.cardNumber)) {
      alert('Por favor, ingresa un número de tarjeta válido');
      return;
    }

    if (!cardCvvRegex.test(this.cardCvv)) {
      alert('Por favor, ingresa un CVV válido');
      return;
    }

    if (!cardTypeRegex.test(this.cardType)) {
      alert('Por favor, ingresa un tipo de tarjeta válido');
      return;
    }

    //transformar fecha de expiracion a formato mm/aa
    





    if (this.cardName && this.cardNumber && this.cardExpiry && this.cardCvv && this.cardType) {
      // Crear un objeto con los datos de la tarjeta
      const cardData = {
        name: this.cardName,
        number: this.cardNumber,
        expiry: this.cardExpiry,
        cvv: this.cardCvv,
        type: this.cardType,
        types: this.cardTypes
      };

      // Guardar los datos de la tarjeta en la variable cardData
      this.cardData = cardData;

      if(this.cardData.number.startsWith('4')){
        this.cardData.types = 'Visa';
      }
      else if(this.cardData.number.startsWith('5')){
        this.cardData.types = 'Mastercard';
      }
      else if(this.cardData.number.startsWith('3')){
        this.cardData.types = 'American Express';
      }
      else if(this.cardData.number.startsWith('6')){
        this.cardData.types = 'Discover';
      }
      else if(this.cardData.number.startsWith('0') || this.cardData.number.startsWith('1') || this.cardData.number.startsWith('2') || this.cardData.number.startsWith('7') || this.cardData.number.startsWith('8') || this.cardData.number.startsWith('9')){
        this.cardData.types = 'Otra';
      }

      
      this.cardData.number = this.cardData.number.toString().slice(0, 4) + ' ' + this.cardData.number.toString().slice(4, 8) + ' ' + this.cardData.number.toString().slice(8, 12) + ' ' + this.cardData.number.toString().slice(12, 16);
      //solo mostrar mes y año de expiracion
      this.cardData.expiry = transformarFecha(this.cardData.expiry);
      localStorage.setItem('cardData', JSON.stringify(cardData));

      // Limpiar los campos del formulario después de guardar los datos
      this.cardName = '';
      this.cardNumber = '';
      this.cardExpiry = '';
      this.cardCvv = '';
      this.cardType = '';
      this.cardTypes = '';

      console.log('Tarjeta guardada:', this.cardData);
    }
    else {
      alert('Por favor, completa todos los campos');
    }

    function transformarFecha(fecha: string): string {
      // Expresión regular para extraer el mes y el año de la fecha en formato "YYYY-MM-DD"
      const regex = /^(\d{4})-(\d{2})-\d{2}$/;
      const match = fecha.match(regex);
    
      if (match) {
        const año = match[1];
        const mes = match[2];
        return `${mes}/${año}`;
      } else {
        // Si la fecha no tiene el formato esperado, devolver la fecha original
        return fecha;
      }
    }
  }

  
}



