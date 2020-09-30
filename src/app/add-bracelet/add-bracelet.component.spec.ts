import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBraceletComponent } from './add-bracelet.component';

describe('AddBraceletComponent', () => {
  let component: AddBraceletComponent;
  let fixture: ComponentFixture<AddBraceletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBraceletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBraceletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
