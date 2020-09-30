import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRapportComponent } from './edit-rapport.component';

describe('EditRapportComponent', () => {
  let component: EditRapportComponent;
  let fixture: ComponentFixture<EditRapportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRapportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
