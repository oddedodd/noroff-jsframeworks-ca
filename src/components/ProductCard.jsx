const ProductCard = ({ product }) => (
  console.log(product),
  <div className="p-4 border rounded-md shadow-md bg-white">
    <img src={product.image.url} alt={product.image.alt} className="w-full h-48 object-cover rounded-md" />
    <h2 className="text-xl font-bold mt-2">{product.title}</h2>
    <p className="text-gray-700">{product.description}</p>
    <p className="text-green-500 font-semibold mt-2">${product.price}</p>
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Add to Cart
    </button>
  </div>
);

export default ProductCard;