import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// importing dropdown menu component
import './dropdown-menu';

@customElement('example-usecases')
export class ExampleUsecases extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      gap: 1rem;
      width: 100%;
    }
  `;
  render() {
    return html`
      <dropdown-menu></dropdown-menu>
      <dropdown-menu></dropdown-menu>
      <dropdown-menu></dropdown-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-usecases': ExampleUsecases;
  }
}
