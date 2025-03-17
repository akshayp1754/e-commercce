import React from "react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/product";

export default function Cart() {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useProduct();
  console.log(cartItems);
  

  // Helper function to calculate discounted price
  const discountedPrice = (product) => {
    return product.price * (1 - (product.discountPercentage || 0) / 100);
  };

  const handleQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateCartItemQuantity(itemId, newQuantity);
  };

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const totalAmount = cartItems.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  return (
    <>
      <div className="mx-auto bg-white max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mt-8 border-t border-gray-200 px-4 py-6 sm:px-6">
          <h2 className="text-3xl my-5">Cart</h2>
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg">Your cart is empty</p>
              <Link
                to="/"
                className="mt-6 inline-block font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          ) : (
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.category.image}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/productDetails/${item.product.id}`}>
                              {item.product.title}
                            </Link>
                          </h3>
                          <p className="ml-4">
                            ${discountedPrice(item.product).toFixed(2)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Color: {item.selectedColor}, Size: {item.selectedSize}
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
                            className="hover:cursor-pointer"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(e, item.id)}
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
