import { Component, EventEmitter, Output } from '@angular/core';
import { ComandaserviceService } from '../comandaservice.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  title = 'front-end';
  comanda: any[] = [];
  listaMeseros: any[] = [];
  listaPlatillos: any[] = [];
  listaBebidas: any[] = [];
  listaPaquetes: any[] = [];
  listaSecuencia: any[] = [];
  listaComandaPlatillos: any[] = [];
  listaComandaBebidas: any[] = [];
  listaComandaPaquete: any[] = [];
  resumenCompra: any[] = [];
  currentDate = new Date();
  idMesero = 1;
  mostrarTicket = false;
  mostrarTicketId = false;
  subtotal = 0;
  total = 0;
  formaPago = "VISA";
  propina = "0.1";
  btnCobro = false;
  filtros = "TODO";

  @Output() regresar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private service: ComandaserviceService) {
  }

  ngOnInit(): void {
    this.service.getMeseros().then(
      (meseros) => {
        this.listaMeseros = meseros;
      }
    )
    this.service.getSecuencia().then(
      (secuencia) => {
        this.listaSecuencia = secuencia;
      }
    )
    this.getProductos();
    this.comanda = [];
    this.listaMeseros = [];
    this.listaPlatillos = [];
    this.listaBebidas = [];
    this.listaPaquetes = [];
    this.listaSecuencia = [];
    this.listaComandaPlatillos = [];
    this.listaComandaBebidas = [];
    this.listaComandaPaquete = [];
    this.resumenCompra = [];
    this.currentDate = new Date();
    this.idMesero = 1;
    this.mostrarTicket = false;
    this.mostrarTicketId = false;
    this.subtotal = 0;
    this.total = 0;
    this.formaPago = "VISA";
    this.propina = "0.1";
    this.btnCobro = false;
    this.filtros = "TODO";
  }

  guardarPedido() {
    if(this.btnCobro) {
      this.guardarOrden();
    } else {
      this.btnCobro = true;
      const comanda = {
            idComanda: this.listaSecuencia[0].Secuencia,
            idMesero: this.idMesero,
          };
      this.service.postComanda(comanda).then(
        (success) => {
          this.guardarOrden()
        }
      )
    }
    setTimeout(() => {
      this.listaComandaBebidas = [];
      this.listaComandaPaquete = [];
      this.listaComandaPlatillos = [];
      this.getProductos();
    }, 500)
  }
  meseroChange(event: any) {
    /* console.log = event.target.value; */
    this.idMesero = event.target.value;
  }
  guardarOrden() {
    this.listaComandaPlatillos.forEach(comandaPlatillos => {
      this.service.postComandaPlatillos(comandaPlatillos).then(
        (responseComandaPlatillos) => {
          console.log(responseComandaPlatillos);
        }
      )
    })
    this.listaComandaBebidas.forEach(comandaBebidas => {
      this.service.postComandaBebidas(comandaBebidas).then(
        (responseComandaBebidas) => {
          console.log(responseComandaBebidas);
        }
      )
    })
    this.listaComandaPaquete.forEach(comandaPaquete => {
      this.service.postComandaPaquetes(comandaPaquete).then(
        (responseComandaPaquetes) => {
          console.log(responseComandaPaquetes);
        }
      )
    })
    setTimeout(() => {
      this.service.resumenCompra({idComanda: this.listaSecuencia[0].Secuencia}).then(
        (success) => {
          this.resumenCompra = success
        }
      )
    }, 1700)
  }
    /**
   *PLATILLOS
   */
  changeCantidadPlatillo(event: any, idPlatillo: number) {
    const cantidad = event.target.value;
    const indice = this.listaComandaPlatillos.findIndex(f => f.idPlatillo == idPlatillo);
    const platillo = {
      "idPlatillo": idPlatillo,
      "cantidad": cantidad,
      "idComanda": this.listaSecuencia[0].Secuencia
    };
    if (indice != -1) {
      this.listaComandaPlatillos.splice(indice, 1, platillo)
    } else {
      this.listaComandaPlatillos.push(platillo)
    }
    /* console.log(this.listaComandaPlatillos) */
  }
  /**
   *FIN PLATILLOS
   */
  /**
   *BEBIDAS
   */
    changeCantidadBebida(event: any, idBebida: number) {
    const cantidad = event.target.value;
    const indice = this.listaComandaBebidas.findIndex(f => f.idBebida == idBebida);
    const bebida = {
      "idBebida": idBebida,
      "cantidad": cantidad,
      "idComanda": this.listaSecuencia[0].Secuencia
    };
    if (indice != -1) {
      this.listaComandaBebidas.splice(indice, 1, bebida)
    } else {
      this.listaComandaBebidas.push(bebida)
    }
    /* console.log(this.listaComandaBebidas) */
  }
    /**
    *FIN BEBIDAS
   */
    /**
   *PAQUETES
   */
  changeCantidadPaquete(event: any, idPaquete: number) {
    const cantidad = event.target.value;
    const indice = this.listaComandaPaquete.findIndex(f => f.idPaquete == idPaquete);
    const paquete = {
      "idPaquete": idPaquete,
      "cantidad": cantidad,
      "idComanda": this.listaSecuencia[0].Secuencia
    };
    if (indice != -1) {
      this.listaComandaPaquete.splice(indice, 1, paquete)
    } else {
      this.listaComandaPaquete.push(paquete)
    }
    /* console.log(this.listaComandaPaquete) */
  }
      /**
   *FIN PAQUETES
   */
  ordenTicket() {
    this.mostrarTicket = true;
    /**
     * Obtener ticket
     */
    this.service.obtenerTicket({
      idComanda: this.listaSecuencia[0].Secuencia
    }).then(
      (success) => {
        this.subtotal=success[0].subtotal
      }
    )
  }
  pagar() {
    const comanda = {
      idComanda: this.listaSecuencia[0].Secuencia,
      formaPago: this.formaPago,
      propina: this.propina,
      total: this.total
    }
    this.service.putComanda(comanda).then(
      (success) => {
        console.log(success)
        this.service.postComandaById(this.listaSecuencia[0].Secuencia).then(
          (comandaId) => {
            this.comanda = comandaId;
            this.mostrarTicketId = true;
          }
        )
      }
    )
  }
  calcularPropina(event: any) {
    console.log(event.target.value)
    this.propina = event.target.value;
    this.total = this.subtotal*(1+parseFloat(this.propina));
  }
  changePago(event: any) {
    console.log(event.target.value)
    this.formaPago = event.target.value;
  }

  getProductos(): void {
    this.service.getPlatillos().then(
      (platillos) => {
        this.listaPlatillos = platillos;
      }
    )
    this.service.getBebidas().then(
      (bebidas) => {
        this.listaBebidas = bebidas;
      }
    )
    this.service.getPaquetes().then(
      (paquete) => {
        this.listaPaquetes = paquete;
      }
    )
  }

  cerrarModalTicket(): void {
    this.mostrarTicket=false;
    if(this.mostrarTicketId) {
      this.ngOnInit();
    }
  }
}
