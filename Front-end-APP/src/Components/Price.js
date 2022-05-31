//this is like a variable or a constant, So we export it directly and not use RAFCE
export const prices = [
  //THESE PROCE VALUES WILL BE SENT TO RADIO
  {
    _id: 0,
    name: "Include All Prices", //NAME IS PRICE HERE I.E NAME OF PRICE i.e show of all price. THIS IS JUST NAMES FOR DISPLAY
    value: [], //i.e show all values
  },

  {
    _id: 1,
    name: "From Price Lowest to Thousand",
    value: [0, 1000],
  },

  {
    _id: 2,
    name: "From Price Thousand to Ten Thousand",
    value: [1001, 10000],
  },

  {
    _id: 3,
    name: "From Price Ten Thousand to Fifty Thousand",
    value: [10001, 50000],
  },

  {
    _id: 4,
    name: "From Price Fifty Thousand to One Lakhs",
    value: [50001, 100000],
  },

  {
    _id: 5,
    name: "From Price One Lakhs to Three Lakhs",
    value: [100001, 300000],
  },

  {
    _id: 6,
    name: "From Price Three Lakhs Five Lakhs",
    value: [300001, 500000],
  },

  {
    _id: 7,
    name: "From Price Five Lakhs And Above",
    value: [500001, 999999999], //For Last, Put UPPER LIMIT TO MAXIMUM CAN BE ANY BUT SHOULD BE GREATER THAN INITIAL LIMIT
  },
];
