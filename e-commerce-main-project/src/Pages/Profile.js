import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddressesMapped } from "../Components/AddressComponents/AddressMapped";
import { useAddress } from "../Contexts/AddressProvider";
import { useProducts } from "../Contexts/ProductsProvider";
import { useAPI } from "../Contexts/APIProvider";

export const Profile = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  console.log(user, "user");
  const { setIsLoading } = useAPI();
  console.log("user", user?.firstName);
  const { dispatch } = useProducts();
  const { arrOfAddresses } = useAddress();
  const navigate = useNavigate();
  const location = useLocation();
  const logoutHandler = () => {
    try {
      setIsLoading(true);
      toast.error("Logged Out.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("encodedTokenTest");
      navigate("/login", { state: { from: location } });

      dispatch({ type: "CLEAR_CART" });
      dispatch({ type: "CLEAR_WISHLIST" });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  const [showProfile, setShowProfile] = useState(true);

  return (
    <>
      <div>
        <div
          className={`profile ${
            showProfile || arrOfAddresses.length < 3 ? "bottom-space" : ""
          }`}
        >
          <div className="profile-tab">
            <div
              onClick={() => setShowProfile(!showProfile)}
              className={`first-tab ${showProfile ? "active-profile" : ""}`}
            >
              Profile
            </div>

            <div
              onClick={() => setShowProfile(!showProfile)}
              className={`${showProfile ? "" : "active-profile"}`}
            >
              Addresses
            </div>
          </div>
          {showProfile ? (
            <div className="userProfile">
              <h1>Profile</h1>
              <h2>Profile Details</h2>

              <p>
                <strong>Full Name:</strong> {user?.firstName} {user?.lastName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>

              <button className="add-to-cart" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <h1>Addresses</h1>
              <AddressesMapped />
            </div>
          )}{" "}
        </div>
      </div>
    </>
  );
};
