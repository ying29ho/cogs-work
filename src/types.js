const CheckoutLineItemInput = {
  name: "CheckoutLineItemInput",
  kind: "INPUT_OBJECT",
  inputFieldBaseTypes: {
    variantId: "ID",
    quantity: "Int",
    customAttributes: "AttributeInput",
  },
};
Object.freeze(CheckoutLineItemInput.inputFieldBaseTypes);
var CheckoutLineItemInput$1 = Object.freeze(CheckoutLineItemInput);

const Types = {
  types: {},
};
Types.types["CheckoutLineItemInput"] = CheckoutLineItemInput$1;

Object.freeze(Types.types);
var types = Object.freeze(Types);

export default types;
