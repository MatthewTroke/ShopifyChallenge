Welcome to your Stitch Labs frontend coding assessment! You have 24 hours to complete the assessment. Please follow the steps below, get as much done as you can, ask questions when needed, and be as creative as possible.


## Getting Started:

- Create a free test account on Shopify. [https://www.shopify.com](https://www.shopify.com)

- Create a private app to connect your store .[https://docs.shopify.com/api/authentication/creating­a­private­app#setup](https://docs.shopify.com/api/authentication/creating­a­private­app#setup)

- Create at least 3 products with variants in each product


From the credentials you received when creating your private app create a .env file in the root of the project with the following


    SHOPIFY_STORE_NAME=
    SHOPIFY_API_KEY=
    SHOPIFY_PASSWORD=

### Running the express server
- Ensure you have ran `npm install` in this repository
- To start the express server run `npm run start`
- Verify you're credentials are correct by visiting [http://localhost:3000](http://localhost:3000), you should see a JSON response of the products you have added. If you cannot get this to work please send us an email.

### Terminology
**Product vs Variant:** A parent on most channels represents top level information like a description or name. 

**Example:**

You have one product with product name: Game of
Thrones T-Shirt.

A variant under this parent may have up to three “attributes” eg Size, Color, House. 

An example of this products variants would be: 

M / Green / Targaryen, L/Black/Lannister. 

The SKU, Price, and Quantity are tracked at a variant level (in most cases).

**SKU:** Also known as stock keeping unit. This is a free form field to identify an item that you sell.

**Example: **

If you sell peanut butter it’s SKU could be *1234* or *PBNOJ*. It really doesn’t matter as long as they are unique for each listing that you sell. This is the field that you will use to link up listings across other sales channels.


## Instructions
You will use AngularJS (or equivalent JS framework) to write a mini single­ page application, to work with Shopify’s product catalogs.

In general, the layout should look like the following:


### Making API calls with the express server

Ensure the server is running with `npm run start`

All Shopify api calls can be made by sending a get, put, post or delete to `http://localhost:3000/shopify?path=SHOPIFY_API_PATH` this will allow you to use any endpoint from Shopify by simply specifying the path.

Example product list call

- Shopify Documentation
[https://help.shopify.com/en/api/reference/products/product#index](https://help.shopify.com/en/api/reference/products/product#index)
- The url for the products list call from the documentation is `/admin/products.json` the `/admin/` part of the url is already added for you in the node server so you **ONLY** need to specify `products.json`
- `http://localhost:3000/shopify?path=products.json`


### Must Haves
- The product detail should show detailed product information such as stock and variants
- A filter bar to narrow down the list of items returned from the API such as:
 - Title search
 - Selecting a start/end date range for product creation

- They ability to create, update and delete products

### Nice to haves (optional)
- Display the list of variants in a table on the product detail page
- Add in a data visualization component
- Inline add / edit
- Unit tests

### When building your application think about the following:

**Modular**

- How do you structure your architecture?
- How do you separate responsibility?

**Stateful**

- How do you separate your states / views to maintain an idea of deep linking?

**Efficient with api calls**

- Do you need to call for the admin endpoints on every product add / edit state
change?
- Do you need to recall the list endpoint on every state change to and from the list view or if the user deletes an item?

