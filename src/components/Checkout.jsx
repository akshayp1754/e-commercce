import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../context/product";

function Checkout() {

    const { cartItems } = useProduct()
    console.log(cartItems);
    const navigate = useNavigate()

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
const totalAmount = cartItems
  .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  .toFixed(2);

  const handleOrder = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    navigate(`/order-success/${randomId}`);
  };
    
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* Address Form */}
            <form className="bg-white px-5 py-12 mt-12" noValidate>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>

            {/* Address Selection */}
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing addresses
              </p>
              <ul>
                <li className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
                    <input
                      name="address"
                      type="radio"
                      value="0"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        John Doe
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        123 Main Street
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        12345
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: 555-123-4567
                    </p>
                    <p className="text-sm leading-6 text-gray-500">New York</p>
                  </div>
                </li>
              </ul>

              {/* Payment Methods */}
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        value="cash"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="payments"
                        value="card"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-2">
    <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
      <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          Cart
        </h1>
        <div className="flow-root">
          <ul className="-my-6 divide-y divide-gray-200">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.category.image || "https://placehold.co/100"}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.product.title}</h3>
                        <p className="ml-4">${item.product.price.toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.selectedColor}, {item.selectedSize}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor={`quantity-${item.id}`}
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          id={`quantity-${item.id}`}
                          defaultValue={item.quantity}
                          className="border rounded px-2 py-1"
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <option key={qty} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            )}
          </ul>
        </div>
      </div>

      {/* ✅ Order Summary Section */}
      <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>$ {totalAmount}</p>
        </div>
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Total Items in Cart</p>
          <p>{totalItems} items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <div
          onClick={handleOrder}
            className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Order Now
          </div>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>
    </>
  );
}

export default Checkout
