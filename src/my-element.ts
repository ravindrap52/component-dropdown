import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('my-element')
export class MyElement extends LitElement {

  render() {
    return html`
      <div>
        Welcome to Lit
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
