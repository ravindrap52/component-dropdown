# Dropdown

A web compoent build by using Lit.

# Dropdown API Documentation

## Props


| Name | Type | Default | Description
| --- | --- | --- | --- | 
| displayName | string | Select | The default label displayed on the dropdown button when no item is selected. You can set this to any string value to change the default label.
| disableDropdownButton | boolean | false | Add attribute `disableDropdownButton` when you want to disable the dropdown.
| noItemsMessage | string | No items available | Message displayed when the dropdown has no items available.
| selectedValue | string | ' ' | Sets the default selected value of the dropdown. 
| selectedItem | function | -  | The event is fired when a user selects an item, and it contains the selected item's details.
| data | Array | []  | An array of items that populate the dropdown. This can either be an array of strings or an array of objects. <br> eg:  ['Option1', 'Option2', 'Option3', 'Option4'] <br> [{ label: 'Option 1', value: 'option-1' }, { label: 'Option 2', value: 'option-2' }]
   
## How to use
```
<dropdown-menu
  .data=${[{ label: 'Option 1', value: 'option-1' }, { label: 'Option 2', value: 'option-2' }]}
  displayName="Select an option"
  selectedValue="option-2"
  noItemsMessage="No options available"
  @selectedItem=${(e) => console.log('Selected:', e.detail)}>
</dropdown-menu>
```

## Libraries Used

### Zod

I used Zod for validations.

## Project Setup

### Cloning the Repository

To clone the repository, use the following command:

```bash
git https://github.com/ravindrap52/component-dropdown.git
```

### Installation

To install the dependencies, navigate into the project directory and run:

```bash
cd component-dropdown
npm install
```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

#### This will open the browser and navigate to http://localhost:5173.

### Building for Production

To build the project for production, use:

```bash
npm run build
```
