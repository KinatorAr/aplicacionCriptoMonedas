import { Component } from '@angular/core';
import { CriptomonedasComponent } from '../components/criptomonedas/criptomonedas.component';

@Component({
  selector: 'app-root',
  imports: [CriptomonedasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aplicacionCriptoMonedas';
}
