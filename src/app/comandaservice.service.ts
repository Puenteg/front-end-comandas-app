import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComandaserviceService {
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', 'localhost:4200');
    this.headers.append('Referrer-Policy', 'unsafe-url');
    this.headers.append('Header-Ejemplo', 'value');
  }
  postComanda(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/comanda`, datos,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  putComanda(datos: any) {
    const retorno = firstValueFrom(
      this.httpClient.put<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/comanda`, datos, {headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaById(idComanda:number): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/comandaId`,{idComanda},{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  getMeseros(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/mesero`,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  getPlatillos(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/Platillos`,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  getBebidas(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/Bebidas`,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  getPaquetes(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/Paquete`,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  getSecuencia(): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.get<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/idComanda`,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaPlatillos(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/ComandaPlatillos`, datos, {headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaBebidas(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/ComandaBebidas`,datos,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  postComandaPaquetes(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/ComandaPaquetes`,datos,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }
  obtenerTicket(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/obtenerTicket`,datos,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }

  resumenCompra(datos: any): Promise<any> {
    const retorno = firstValueFrom(
      this.httpClient.post<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/resumenCompra`,datos,{headers: this.headers})
    );
    console.info(retorno);
    return retorno;
  }

  getProductos(): Promise<any> {
    return firstValueFrom(
      this.httpClient.get<any>(`http://ec2-18-234-141-185.compute-1.amazonaws.com:8080/comandaRoute/productos`,{headers: this.headers})
    );
  }

}

