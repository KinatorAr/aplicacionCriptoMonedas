import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriptomonedasComponent } from './criptomonedas.component';

describe('CriptomonedasComponent', () => {
  let component: CriptomonedasComponent;
  let fixture: ComponentFixture<CriptomonedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriptomonedasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriptomonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
