import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { RouterTestingModule } from '@angular/router/testing';

describe('Header', () => {

  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Header, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {

    expect(component.isMenuOpen).toBeFalse();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeTrue();

    component.toggleMenu();
    expect(component.isMenuOpen).toBeFalse();

  });

  it('should toggle industrial dropdown', () => {

    expect(component.isIndustrialOpen).toBeFalse();

    component.toggleIndustrialDropdown();
    expect(component.isIndustrialOpen).toBeTrue();

  });

  it('should close menu', () => {

    component.isMenuOpen = true;
    component.isIndustrialOpen = true;

    component.closeMenu();

    expect(component.isMenuOpen).toBeFalse();
    expect(component.isIndustrialOpen).toBeFalse();

  });

  it('should lock scroll when menu opens', () => {

    component.isMenuOpen = true;
    component.handleScroll();

    expect(document.body.style.overflow).toBe('hidden');

  });

  it('should unlock scroll when menu closes', () => {

    component.isMenuOpen = false;
    component.handleScroll();

    expect(document.body.style.overflow).toBe('auto');

  });

});