import { version } from "../package.json";
//Message Type enumeration
let MessageType = {
  TRACK: "track",
  PAGE: "page",
  //SCREEN: "screen",
  IDENTIFY: "identify"
};

//ECommerce Parameter Names Enumeration
let ECommerceParamNames = {
  QUERY: "query",
  PRICE: "price",
  PRODUCT_ID: "product_id",
  CATEGORY: "category",
  CURRENCY: "currency",
  LIST_ID: "list_id",
  PRODUCTS: "products",
  WISHLIST_ID: "wishlist_id",
  WISHLIST_NAME: "wishlist_name",
  QUANTITY: "quantity",
  CART_ID: "cart_id",
  CHECKOUT_ID: "checkout_id",
  TOTAL: "total",
  REVENUE: "revenue",
  ORDER_ID: "order_id",
  FILTERS: "filters",
  SORTS: "sorts",
  SHARE_VIA: "share_via",
  SHARE_MESSAGE: "share_message",
  RECIPIENT: "recipient"
};
//ECommerce Events Enumeration
let ECommerceEvents = {
  PRODUCTS_SEARCHED: "Products Searched",
  PRODUCT_LIST_VIEWED: "Product List Viewed",
  PRODUCT_LIST_FILTERED: "Product List Filtered",
  PROMOTION_VIEWED: "Promotion Viewed",
  PROMOTION_CLICKED: "Promotion Clicked",
  PRODUCT_CLICKED: "Product Clicked",
  PRODUCT_VIEWED: "Product Viewed",
  PRODUCT_ADDED: "Product Added",
  PRODUCT_REMOVED: "Product Removed",
  CART_VIEWED: "Cart Viewed",
  CHECKOUT_STARTED: "Checkout Started",
  CHECKOUT_STEP_VIEWED: "Checkout Step Viewed",
  CHECKOUT_STEP_COMPLETED: "Checkout Step Completed",
  PAYMENT_INFO_ENTERED: "Payment Info Entered",
  ORDER_UPDATED: "Order Updated",
  ORDER_COMPLETED: "Order Completed",
  ORDER_REFUNDED: "Order Refunded",
  ORDER_CANCELLED: "Order Cancelled",
  COUPON_ENTERED: "Coupon Entered",
  COUPON_APPLIED: "Coupon Applied",
  COUPON_DENIED: "Coupon Denied",
  COUPON_REMOVED: "Coupon Removed",
  PRODUCT_ADDED_TO_WISHLIST: "Product Added to Wishlist",
  PRODUCT_REMOVED_FROM_WISHLIST: "Product Removed from Wishlist",
  WISH_LIST_PRODUCT_ADDED_TO_CART: "Wishlist Product Added to Cart",
  PRODUCT_SHARED: "Product Shared",
  CART_SHARED: "Cart Shared",
  PRODUCT_REVIEWED: "Product Reviewed"
};

//Enumeration for integrations supported
let RudderIntegrationPlatform = {
  RUDDERLABS: "rudderlabs",
  GA: "ga",
  AMPLITUDE: "amplitude"
};

let BASE_URL = "https://hosted-dataplane.rudderstack.com";  // default to RudderStack
let CONFIG_URL = "https://api.rudderlabs.com/sourceConfig/?p=web&v=" + version; //"https://api.rudderlabs.com/workspaceConfig";

let FLUSH_QUEUE_SIZE = 30;

let FLUSH_INTERVAL_DEFAULT = 5000;

const MAX_WAIT_FOR_INTEGRATION_LOAD = 10000;
const INTEGRATION_LOAD_CHECK_INTERVAL = 1000;

export {
  MessageType,
  ECommerceParamNames,
  ECommerceEvents,
  RudderIntegrationPlatform,
  BASE_URL,
  CONFIG_URL,
  FLUSH_QUEUE_SIZE,
  FLUSH_INTERVAL_DEFAULT,
  MAX_WAIT_FOR_INTEGRATION_LOAD,
  INTEGRATION_LOAD_CHECK_INTERVAL
};
/* module.exports = {
  MessageType: MessageType,
  ECommerceParamNames: ECommerceParamNames,
  ECommerceEvents: ECommerceEvents,
  RudderIntegrationPlatform: RudderIntegrationPlatform,
  BASE_URL: BASE_URL,
  CONFIG_URL: CONFIG_URL,
  FLUSH_QUEUE_SIZE: FLUSH_QUEUE_SIZE
}; */
