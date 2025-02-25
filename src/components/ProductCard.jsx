import { Link } from "react-router-dom";

const ProductCard = ({
  id = 1,
  name = "Sample Product",
  price = 99.99,
  image = "https://placehold.co/600x400",
  description = "This is a sample product description. It showcases the product's features and benefits.",
}) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-info">
        <h3>{name}</h3>
        <p className="price">${price}</p>
        <p className="description">{description}</p>
        <Link to={`/product/${id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
