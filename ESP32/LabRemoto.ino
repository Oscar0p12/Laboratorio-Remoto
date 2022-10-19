float c;       ////Variable aux
float g;       // Valor digital (0-255)

float x;       //voltaje de salida quamser (0 - 3.3v)
float k;       //Voltaje  de entrada Vi (+-5V)
float v;       //Variable aux
float y=0;

float salida;  //voltaje de salida  (+-5V)
float entrada; //Voltaje  de entrada Vi (0 - 3.3V)

void setup() {
  Serial.begin(9600);
  Serial2.begin(9600,SERIAL_8N1,16,17);
  Serial2.setTimeout(10);
  Serial.setTimeout(10);
  c=1.65;
}

void loop() {  


    if (Serial.available()>0){    
      k=Serial.parseFloat();         //K voltaje de entrada de +-5V dado por el usuario
      Serial2.println(salida);
      if (k!=0 && k!=-0){
      v=k;
 
      entrada=(v+4.96)/2.9325;   //Escalando el valor del voltaje de entrada (0-3.3V)
      c=entrada;
      }
      }
      
  g=255*c/5;                    //Conversion de la entrada a digital (0 - 255)
  if (g>255){g=255;}    
  dacWrite(26,g);               //Entrega el voltaje a el equipo quamser

  x=analogRead(36);             //lectura de la salida del sistema (0-3.3V)
  x=x*6.1/4095;       
  salida= x/0.3404-4.7;         //Escalando el valor entre (+-5V)

  if(k>=0 && salida<0.3){
    salida=0;
    }

  if(k<0 && salida>-0.15){
    salida=0;
    }
    
  Serial.println(salida);
     

  delay(100);

 }
