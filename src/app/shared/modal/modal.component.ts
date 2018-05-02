import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Injector,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FullscreenOverlayContainer, Overlay, OverlayConfig, OverlayContainer } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay/typings/overlay-ref';
import { ComponentType } from '@angular/cdk/portal/typings/portal';
import { take } from 'rxjs/operators';
import { PositionStrategy } from '@angular/cdk/overlay/typings/position/position-strategy';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  exportAs: 'kaModal',
  providers: [{ provide: OverlayContainer, useClass: FullscreenOverlayContainer }]
})
export class ModalComponent {

  @ViewChild('modalContent') modalContent: TemplateRef<{}>;

  @Input() component: ComponentType<{}>;

  @Output() backdropClick = new EventEmitter<{}>();

  @Input() position: PositionStrategy;

  private subjectClose: Subject<{}>;

  private isOpen: boolean = false;

  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private viewContainer: ViewContainerRef) {
  }

  toggle(): void {
    this.open();
  }

  open(component?: ComponentType<{}>): Observable<{}> {
    if (this.isOpen) {
      throw new Error('Попытка второго открытия модального окна');
    }
    this.isOpen = true;

    if (component) {
      this.component = component;
    }

    let positionStrategy;
    if (this.position) {
      positionStrategy = this.position;
    } else {
      positionStrategy = this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
    }

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'backdrop-primary',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.backdropClick()
      .pipe(take(1))
      .subscribe(() => this.onBackdropClick());

    let portal;
    if (this.component) {
      portal = new ComponentPortal(this.component, this.viewContainer, this.injector);
    } else {
      portal = new TemplatePortal(this.modalContent, this.viewContainer, this.injector);
    }
    this.overlayRef.attach(portal);

    // Для подписки на закрытие окна
    this.subjectClose = new Subject<{}>();
    return this.subjectClose.asObservable().pipe(take(1));
  }

  onBackdropClick(): void {
    if (this.backdropClick.observers.length !== 0) {
      this.backdropClick.emit();
    } else {
      this.close();
    }
  }

  close(): void {
    if (this.overlayRef) {
      this.subjectClose.next();
      this.isOpen = false;
      this.overlayRef.dispose();
    }
  }
}
