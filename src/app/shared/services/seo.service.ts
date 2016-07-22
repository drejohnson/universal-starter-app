import { isNode, isBrowser } from 'angular2-universal';
import {
  Injectable,
  Inject,
  ElementRef,
  Renderer
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SeoService {
  private _document: any;
  /*
   * Angular 2 Title Service
   */
  // private titleService: Title;
  /*
   * <head> Element of the HTML document
   */
  private headElement: any; // HTMLElement;
  /**
   * <title><title/>
   */
  private title: HTMLElement;
  /**
   * <meta name="description" content="Title Here" />
   */
  private metaDescription: HTMLElement;
  /**
   * <meta property="og:title" content="Title Here" />
   */
  private ogTitle: HTMLElement;
  /**
   * <meta property="og:type" content="article" />
   */
  private ogType: HTMLElement;
  /**
   * <meta property="og:url" content="http://www.example.com/" />
   */
  private ogUrl: HTMLElement;
  /**
   * <meta property="og:image" content="http://example.com/image.jpg" />
   */
  private ogImage: HTMLElement;
  /**
   * <meta property="og:description" content="Description Here" />
   */
  private ogDescription: HTMLElement;

  /**
   * Inject the Angular 2 Title Service
   * @param titleService
   */
  constructor(
    @Inject(DOCUMENT) private document,
    private element: ElementRef,
    private renderer: Renderer
  ) {
    this._document = document;
    this.headElement = this._document.head;

    this.metaDescription = this.getOrCreateMetaElement('description');
    this.ogTitle = this.getOrCreateMetaElement('og:title', 'property');
    this.ogType = this.getOrCreateMetaElement('og:type', 'property');
    this.ogUrl = this.getOrCreateMetaElement('og:url', 'property');
    this.ogImage = this.getOrCreateMetaElement('og:image', 'property');
    this.ogDescription = this.getOrCreateMetaElement('og:description', 'property');

  }
  public setTitle(siteTitle = '', pageTitle = '', separator = ' | ') {
    let title = siteTitle;
    if (pageTitle !== '') pageTitle += separator + title;
    this._document.title = title;
  }
  public setDescription(value: string) {
    this.renderer.setElementAttribute(this.metaDescription, 'content', value);
  }
  /**
   * Open graph
   */
  public setOgTitle(value: string) {
    this.renderer.setElementAttribute(this.ogTitle, 'content', value);
  }
  public setOgType(value: string) {
    this.renderer.setElementAttribute(this.ogType, 'content', value);
  }
  public setOgUrl(value: string) {
    this.renderer.setElementAttribute(this.ogUrl, 'content', value);
  }
  public setOgImage(value: string) {
    this.renderer.setElementAttribute(this.ogImage, 'content', value);
  }
  public setOgDescription(value: string) {
    this.renderer.setElementAttribute(this.ogDescription, 'content', value);
  }
  /**
   * get the HTML Element when it is in the markup, or create it.
   * @param name
   * @returns {HTMLElement}
   */
  private getOrCreateMetaElement(name: string, attr?: string): HTMLElement {
    if (isBrowser) {
      let el: HTMLElement;
      let prop = ((attr != null) ? attr : 'name');
      el = this.renderer.createElement(this.headElement, 'meta', null);
      this.renderer.setElementAttribute(el, prop, name);
      return el;
    }
  }
}

