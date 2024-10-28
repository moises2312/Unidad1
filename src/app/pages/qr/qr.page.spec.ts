import { ComponentFixture, TestBed } from '@angular/core/testing';
import { qrPage } from './qr.page';

describe('QrPage', () => {
  let component: qrPage;
  let fixture: ComponentFixture<qrPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(qrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
