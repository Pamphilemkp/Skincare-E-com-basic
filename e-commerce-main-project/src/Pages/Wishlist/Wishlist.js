import { useContext } from "react";
import { ProductsContext } from "../../Contexts/ProductsProvider";

import { EmptyWishlist } from "./Components/EmptyWishlist";
import { WishlistListing } from "./Components/WishlistListing";

export const Wishlist = () => {
  const { state } = useContext(ProductsContext);
  //console.log(state.wishlist);
  return (
    <>
      <h1 className="header-heading">
        Wishlist{" "}
        {state?.wishlist?.length ? null : `(${state?.wishlist?.length})`}
      </h1>
      <section className="products">
        {state?.wishlist?.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <WishlistListing />
        )}
      </section>
    </>
  );
};
