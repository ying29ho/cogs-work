import React, { useState } from "react";
import PropTypes from "prop-types";
// import Client from "shopify-buy";

const LineItemContext = React.createContext([]);
const CheckoutIdContext = React.createContext();
const ThemeContext = React.createContext("light");


// const [CheckoutIdContext, setCheckoutIdContext] = useState();
// const ShopContext = React.createContext();
// const StoreFrontAPIContext = React.createContext();

// const client = Client.buildClient({
//   domain: "https://cogs-work.myshopify.com",
//   storefrontAccessToken: "3895fab55b392eba0cb70d2381319aea",
// });

// class ShopProvider extends Component {
//   state = {
//     lineItem: [],
//     product: {},
//     //initialise checkout and save to browser
//     checkoutId: {},
//   };

//   componentDidMount() {
//     this.createCheckout();
//   }
//   createCheckout = async () => {
//     const checkout = await client.checkout.create()
//     // .then((checkout) => {
//       // console.log("checkout", checkout);
//       // localStorage.setItem("checkoutId", checkout.id);
//       this.setState({ checkoutId: checkout });
//     // });
//   };

//   fetchAllProducts = async () => {
//     const products = await client.product.fetchAll();
//   };
//   addItemtoCart = async (variantId, quantity) => {};

//   render() {
//     return (
//       <ShopContext.Provider value={{ ...this.state }}>
//         {this.props.children}
//       </ShopContext.Provider>
//     );
//   }
// }

// const ShopConsumer = ShopContext.Consumer;
// export { ShopConsumer, ShopContext, LineItemContext, ThemeContext };
// export default ShopProvider;
export { LineItemContext, ThemeContext, CheckoutIdContext };
