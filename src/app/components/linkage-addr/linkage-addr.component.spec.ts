import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkageAddrComponent } from './linkage-addr.component';

describe('LinkageAddrComponent', () => {
  let component: LinkageAddrComponent;
  let fixture: ComponentFixture<LinkageAddrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkageAddrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkageAddrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
