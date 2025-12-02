import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerPage } from './reseller-page';

describe('ResellerPage', () => {
  let component: ResellerPage;
  let fixture: ComponentFixture<ResellerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResellerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResellerPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
