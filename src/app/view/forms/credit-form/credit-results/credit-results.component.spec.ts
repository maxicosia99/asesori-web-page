import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditResultsComponent } from './credit-results.component';

describe('CreditResultsComponent', () => {
  let component: CreditResultsComponent;
  let fixture: ComponentFixture<CreditResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
