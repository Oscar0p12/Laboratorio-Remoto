%Limpiar workspace
clc;
clear;
x=0;
T=table(x);
writetable(T,'../cliente/src/components/TablaDatos.txt','Delimiter','\t');

%Leer datos 
c = 'Datos.txt';
x=importdata(c);
practica=x(1);
senal=x(2);
amplitud=x(3);
perturbacion=x(4);
kp=x(5);
ki=x(6);
kd=x(7);
kn=x(8);



%Abrir puerto serial
OP=serial('COM1');

% fileID = fopen('exptable.txt','w');
% fprintf(fileID,'si');
% fclose(fileID);

%Ejecutar sistema en simulink
sim('DiagramaBloquesLC.slx');

%Mostrar datos 
simout.data;

 Vin=round(simout1.data,2);
 Vout=round(simout.data,2);
 W=round(simout.data*pi*667/90,2);
 Tiempo=round(simout.time,2);
 
 varNames = {'Vin';'Vout';'Wout';'Tiempo'};
 T = table(Vin,Vout,W,Tiempo,'VariableNames',varNames);
 writetable(T,'../cliente/src/components/TablaDatos.txt','Delimiter','\t');

