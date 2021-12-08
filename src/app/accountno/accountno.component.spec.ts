import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountnoComponent } from './accountno.component';

describe('AccountnoComponent', () => {
  let component: AccountnoComponent;
  let fixture: ComponentFixture<AccountnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
