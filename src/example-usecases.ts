import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { dataAsStringArray, dataAsArrayObjects } from './data';

// importing dropdown menu component
import './dropdown-menu';

@customElement('example-usecases')
export class ExampleUsecases extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      padding: 1rem;
    }
  `;
  render() {
    return html`
      <div>
        <p>Passing a display name as a property</p>
        <dropdown-menu nameToDisplay="Select an option"></dropdown-menu>
      </div>
      <div>
        <p>Passing the <code>disableDropdownButton</code> property will disable the dropdown</p>
        <dropdown-menu disableDropdownButton=""></dropdown-menu>
      </div>
      <div>
        <p>Passing the <code>primary</code> class will apply primary styles to the dropdown</p>
        <dropdown-menu class="primary" .data="${dataAsStringArray}"></dropdown-menu>
      </div>
      <div>
        <p>Passing the <code>secondary</code> class will apply secondary styles to the dropdown</p>
        <dropdown-menu class="secondary" .data="${dataAsArrayObjects}"></dropdown-menu>
      </div>
      <div>
        <p>Passing the <code>selected value</code> so that we can set the default value in the dropdown</p>
        <dropdown-menu class="secondary" .data="${dataAsArrayObjects}" selectedValue="option-4"></dropdown-menu>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-usecases': ExampleUsecases;
  }
}
