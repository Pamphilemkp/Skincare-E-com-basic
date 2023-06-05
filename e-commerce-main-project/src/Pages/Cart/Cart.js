import { useProducts } from "../../Contexts/ProductsProvider";
import { ProductCard } from "../../Components/ProductCard";
import cartImage from "../../Images/cart.svg";
import { TotalCard } from "../../Components/Cart/TotalCard";
import { Coupon } from "../../Components/Cart/Coupon";
import { useUtils } from "../../Contexts/UtilsProvider";

import { useEffect } from "react";
import { useAPI } from "../../Contexts/APIProvider";

export const Cart = () => {
  const { state } = useProducts();
  const {
    moveToWishlistHandler,
    removefromCartHandler,
    increaseQtyHandler,
    decreaseQtyHandler,
  } = useUtils();

  const { updateCart } = useUtils();
  const { token } = useAPI();
  useEffect(() => {
    updateCart();
  }, []);
  return (
    <>
      <h1 className="header-heading">
        Cart {state?.cart?.length ? `(${state?.cart?.length})` : null}
      </h1>
      <Coupon />
      {state?.cart?.length ? (
        <div className="gridCart">
          <section className="products cart">
            {state?.cart?.map((item) => (
              <div className="productCard cartCard">
                <i
                  onClick={() => removefromCartHandler(item)}
                  className="fa-solid fa-xmark wishlist-heart remove"
                ></i>

                <ProductCard item={item} />

                <p className="cart-quantity">
                  Qty: {item?.qty >= 1 && item?.qty}
                </p>
                <div className="cart-qty-buttons">
                  <button onClick={() => increaseQtyHandler(item._id)}>
                    +
                  </button>
                  <button onClick={() => decreaseQtyHandler(item)}>-</button>
                </div>

                <div className="cart-card-btns">
                  <button
                    className="add-to-cart cart-card-btn"
                    onClick={() => moveToWishlistHandler(item)}
                  >
                    Move To Wishlist
                  </button>
                  <button
                    className="add-to-cart cart-card-btn"
                    onClick={() => removefromCartHandler(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>
          <TotalCard />
        </div>
      ) : (
        <div className="empty">
          <img src={cartImage} className="empty-img" alt="Empty cart." />
          <h2>Your cart looks rather lonely.</h2>
          <p>Add some items to show some love.</p>
        </div>
      )}
    </>
  );
};
