import React,{ useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../context/product";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const colors = [
  { name: "Black", class: "bg-black", selectedClass: "ring-gray-900" },
  { name: "Gray", class: "bg-gray-500", selectedClass: "ring-gray-500" },
  { name: "Brown", class: "bg-amber-800", selectedClass: "ring-amber-800" },
];

const sizes = [
  { name: "XXS", inStock: false },
  { name: "XS", inStock: true },
  { name: "S", inStock: true },
  { name: "M", inStock: true },
  { name: "L", inStock: true },
  { name: "XL", inStock: true },
  { name: "2XL", inStock: true },
  { name: "3XL", inStock: false },
];

const highlights = [
  "Premium genuine leather material",
  "Durable, water-resistant finish",
  "Classic design that never goes out of style",
  "Multiple pockets for functionality",
  "Available in three elegant colors",
];



export default function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart } = useProduct();
  console.log(products);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [selectedSize, setSelectedSize] = useState("M");

  const navigate = useNavigate()

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found!</div>;

  const breadcrumbs = [
    { id: 1, name: product.category?.name || "Category", href: "#" },
    { id: 2, name: product.brand || "Brand", href: "#" },
  ];
  
  const calculateDiscountedPrice = (price, discountPercentage) => {
    if (!price) return "$0.00"; // Handle missing price
    if (!discountPercentage) return `$${price.toFixed(2)}`;
    return `$${(price - price * (discountPercentage / 100)).toFixed(2)}`;
  };

  const handleAddToCart = () => {
    addToCart(product, 1, selectedColor, selectedSize);
    navigate("/cart");
  };

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
  };
  

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        {product.images.slice(0, 3).map((img, index) => (
  <div key={index} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
    <img src={img} alt={product.title} className="h-full w-full object-cover object-center" />
  </div>
))}

        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            {product.discountPercentage ? (
              <>
                <p className="text-xl line-through tracking-tight text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  {calculateDiscountedPrice(
                    product.price,
                    product.discountPercentage
                  )}
                </p>
              </>
            ) : (
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            )}

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
  <svg
    key={index}
    className={classNames(
      index < Math.round(product.rating) ? "text-gray-900" : "text-gray-200",
      "h-5 w-5 flex-shrink-0"
    )}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"/>
  </svg>
))}

                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <div className="mt-4">
                  <div className="flex items-center space-x-3">
                    {colors.map((color) => (
                      <div
  key={color.name}
  onClick={() => handleColorSelect(color.name)}
  className={classNames(
    color.name === selectedColor ? "ring-2 ring-offset-1" : "",
    color.selectedClass,
    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
  )}
>

                        <span className="sr-only">{color.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <div className="mt-4">
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                  {sizes.map((size) => (
                      <div
                        key={size.name}
                        onClick={() => {
                          if (size.inStock) setSelectedSize(size.name);
                        }}
                        className={classNames(
                          size.inStock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          selectedSize === size.name && size.inStock ? "ring-2 ring-indigo-500" : "",
                          "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                        )}
                      >
                        <span>{size.name}</span>
                        {!size.inStock && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1={0}
                                y1={100}
                                x2={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
