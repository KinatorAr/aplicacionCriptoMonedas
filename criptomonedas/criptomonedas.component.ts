import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

interface CriptomonedaInfo {
  CoinInfo: {
    FullName: string;
    Name: string;
  };
}

interface Cotizacion {
  PRICE: string;
  HIGHDAY: string;
  LOWDAY: string;
  CHANGEPCT24HOUR: string;
  LASTUPDATE: string;
}

@Component({
  selector: 'app-criptomonedas',
  templateUrl: './criptomonedas.component.html',
  styleUrls: ['./criptomonedas.component.css'],
  standalone: true,
  imports: [NgFor]
})
export class CriptomonedasComponent implements OnInit {
  criptomonedas: CriptomonedaInfo[] = [];
  objBusqueda = {
    moneda: '',
    criptomoneda: ''
  };

  constructor() {}

  ngOnInit(): void {
    this.consultarCriptomonedas();
  }

  consultarCriptomonedas(): void {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url)
      .then(res => res.json())
      .then(data => this.obtenerCriptomonedas(data.Data))
      .then(criptos => this.criptomonedas = criptos)
      .catch(error => console.error(error));
  }

  obtenerCriptomonedas(criptos: CriptomonedaInfo[]): Promise<CriptomonedaInfo[]> {
    return Promise.resolve(criptos);
  }

  leerValor(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.objBusqueda[target.name as 'moneda' | 'criptomoneda'] = target.value;
  }

  submitFormulario(event: Event): void {
    event.preventDefault();

    const { moneda, criptomoneda } = this.objBusqueda;
    if (!moneda || !criptomoneda) {
      this.mostrarAlerta('Ambos campos son obligatorios');
      return;
    }

    this.consultarAPI();
  }

  mostrarAlerta(mensaje: string): void {
    const div = document.createElement('div');
    div.classList.add('error');
    div.textContent = mensaje;
    const form = document.querySelector('#formulario');
    form?.appendChild(div);

    setTimeout(() => div.remove(), 3000);
  }

  consultarAPI(): void {
    const { moneda, criptomoneda } = this.objBusqueda;
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    this.mostrarSpinner();

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const cotizacion = data.DISPLAY?.[criptomoneda]?.[moneda];
        if (cotizacion) {
          this.mostrarCotizacionHTML(cotizacion);
        }
      });
  }

  mostrarCotizacionHTML(cotizacion: Cotizacion): void {
    this.limpiarHTML();
    const resultado = document.querySelector('#resultado');
    if (!resultado) return;

    const p = (html: string, className?: string) => {
      const el = document.createElement('p');
      if (className) el.classList.add(className);
      el.innerHTML = html;
      return el;
    };

    resultado.appendChild(p(`El Precio es: <span>${cotizacion.PRICE}</span>`, 'precio'));
    resultado.appendChild(p(`Precio más alto del día: <span>${cotizacion.HIGHDAY}</span>`));
    resultado.appendChild(p(`Precio más bajo del día: <span>${cotizacion.LOWDAY}</span>`));
    resultado.appendChild(p(`Variación últimas 24 horas: <span>${cotizacion.CHANGEPCT24HOUR}%</span>`));
    resultado.appendChild(p(`Última Actualización: <span>${cotizacion.LASTUPDATE}</span>`));
  }

  mostrarSpinner(): void {
    this.limpiarHTML();
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    `;
    document.querySelector('#resultado')?.appendChild(spinner);
  }

  limpiarHTML(): void {
    const resultado = document.querySelector('#resultado');
    if (resultado) {
      while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
      }
    }
  }
}

