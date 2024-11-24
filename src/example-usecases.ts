import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { dataAsStringArray, dataAsArrayObjects } from './data';

// importing dropdown menu component
import './dropdown-menu';
import { DropdownItem } from './types';

@customElement('example-usecases')
export class ExampleUsecases extends LitElement {
  @state()
  protected currentSelectedValue: string = '';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      padding: 1rem;
    }
  `;
  private handleSelectedItem(event: CustomEvent<DropdownItem>) {
    this.currentSelectedValue = event.detail.value;
  }

  render() {
    return html`
      <div>
        <p>Use the displayName property to set the default label for the dropdown button</p>
        <dropdown-menu displayName="Select an option"></dropdown-menu>
      </div>
      <div>
        <p>Set the <code>disableDropdownButton</code> property to disable the dropdown and prevent user interaction</p>
        <dropdown-menu disableDropdownButton=""></dropdown-menu>
      </div>
      <div>
        <p>By passing the <code>primary</code> class, you apply the primary styling to the dropdown</p>
        <dropdown-menu class="primary" .data="${dataAsStringArray}"></dropdown-menu>
      </div>
      <div>
        <p>By passing the <code>secondary</code> class, you apply the secondary styling to the dropdown</p>
        <dropdown-menu class="secondary" .data="${dataAsArrayObjects}"></dropdown-menu>
      </div>
      <div>
        <p>
        You can pass the <code>selected value</code>  property to set a default selected option in the dropdown
        </p>
        <dropdown-menu
          class="secondary"
          .data="${dataAsArrayObjects}"
          selectedValue="option-4"
        ></dropdown-menu>
      </div>
      <div>
        <p>Select an item from the dropdown, and the selected value will be displayed here</p>
        <p>Selected Value: ${this.currentSelectedValue}</p>
        <dropdown-menu
          class="secondary"
          .data="${dataAsArrayObjects}"
          @selectedItem="${this.handleSelectedItem}"
        ></dropdown-menu>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-usecases': ExampleUsecases;
  }
}
