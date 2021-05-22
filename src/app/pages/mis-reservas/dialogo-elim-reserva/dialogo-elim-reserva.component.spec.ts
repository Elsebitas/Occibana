import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoElimReservaComponent } from './dialogo-elim-reserva.component';

describe('DialogoElimReservaComponent', () => {
  let component: DialogoElimReservaComponent;
  let fixture: ComponentFixture<DialogoElimReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoElimReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoElimReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
