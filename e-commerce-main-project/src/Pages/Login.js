import { useAuth } from "../Contexts/AuthProvider";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAPI } from "../Contexts/APIProvider";
import { toast } from "react-toastify";
import { useState } from "react";
import { useUtils } from "../Contexts/UtilsProvider";

export const Login = () => {
  const { encodedToken, setEncodedToken } = useAuth();
  const { fetchLoginData, fetchLoginAsGuest, setIsLoading } = useAPI();
  const location = useLocation();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { updateWishlist, updateCart } = useUtils();

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      if (loginData.email.length && loginData.password.length) {
        if (encodedToken) {
          toast.success("Logged In", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });

          const { encodedToken } = await fetchLoginData({
            email: loginData.email,
            password: loginData.password,
          });
          setEncodedToken(encodedToken);

          navigate(location?.state?.from?.pathname);
          updateWishlist();
          updateCart();
        } else {
          toast.error("Wrong Password Or Email.", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      } else {
        toast.warn("Please Fill All Fields", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsGuestHandler = async () => {
    try {
      setIsLoading(true);
      toast.success("Logged In", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      const { encodedToken } = await fetchLoginAsGuest();
      setEncodedToken(encodedToken);

      navigate(location?.state?.from?.pathname);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login">
          <h1>Sign In</h1>
          <div className="login-input-div">
            <label>
              Email address:
              <input
                type="email"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                placeholder={"test@gmail.com"}
              />
            </label>
          </div>
          <div className="login-input-div">
            <label>
              Password:{" "}
              <input
                type="password"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                placeholder={"*******"}
              />
            </label>
          </div>
          <button className="add-to-cart login-btn" onClick={loginHandler}>
            Login
          </button>
          <button
            className="add-to-cart login-btn"
            onClick={loginAsGuestHandler}
          >
            Login as a Guest
          </button>
          <NavLink
            className="form-navigator"
            to="/signUp"
            state={{
              from: {
                ...location,
                pathname: location?.state?.from?.pathname,
              },
            }}
          >
            Create a new account <span>&#8250;</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
