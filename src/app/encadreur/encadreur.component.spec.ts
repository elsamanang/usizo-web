import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadreurComponent } from './encadreur.component';

describe('EncadreurComponent', () => {
  let component: EncadreurComponent;
  let fixture: ComponentFixture<EncadreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncadreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncadreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
