import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ShoppingList from "../ShoppingList/ShoppingList";
import CustomInput from "../CustomInput/CustomInput";
import "./Sidebar.css";

const LOGIN_URL = `http://localhost:3001/login`;
const SIGNUP_URL = `http://localhost:3001/signup`;
const RECEIPTS_URL = `http://localhost:3001/receipts`;

export default function Sidebar({
  cart,
  setCart,
  loggedIn,
  setLoggedIn,
  userData,
  setUserData,
}) {
  const [isOpen, setOpen] = useState(false);
  const [isShowingLogin, setIsShowingLogin] = useState(true);

  const arrowAddress = "https://cdn-icons-png.flaticon.com/512/32/32542.png";
  const cartAddress =
    "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";

  const submitUserData = async (type) => {
    const url = type === "login" ? LOGIN_URL : SIGNUP_URL;

    try {
      const response = await axios.post(url, userData);
      setLoggedIn(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const checkout = async () => {
    const data = { ...userData, newReceipt: cart };

    try {
      await axios.post(RECEIPTS_URL, data);
      const responseTwo = await axios.post(LOGIN_URL, userData);
      setLoggedIn(responseTwo.data);
      setCart([]);
    } catch (error) {
      alert("Error during checkout.");
    }
  };

  return (
    <section className="sidebar" style={{ width: isOpen ? "25%" : "7.5%" }}>
      <div>
        <img
          onClick={() => setOpen(!isOpen)}
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          src={arrowAddress}
          alt="Open sidebar button"
        />
        <img
          onClick={() => setOpen(!isOpen)}
          src={cartAddress}
          alt="Open sidebar button"
        />

        {isOpen && (
          <>
            <h1>Shopping Cart</h1>
            <div>
              <ShoppingList cart={cart} setCart={setCart} />
            </div>
            {loggedIn != null ? (
              <>
                <button
                  style={{ display: cart.length > 0 ? "" : "none" }}
                  onClick={checkout}
                >
                  Checkout
                </button>
                <h1>Welcome {loggedIn?.data?.name}!</h1>
                <h2>Your Receipts</h2>
                <div style={{ maxHeight: "40vh", overflow: "scroll" }}>
                  {Array.isArray(loggedIn?.data?.receipts) &&
                    loggedIn.data.receipts.map((receiptObj, index) => {
                      const receiptId = Object.keys(receiptObj)[0];
                      const receiptItems = receiptObj
                        ? Object.values(receiptObj)[0]
                        : null;

                      return (
                        <Link key={index} to={`receipt/${receiptId}`}>
                          <button className="receipt-button">
                            View Receipt: {receiptItems?.date} $
                            {(
                              receiptItems?.total +
                              receiptItems?.total * 0.0875
                            ).toFixed(2)}
                          </button>
                        </Link>
                      );
                    })}
                </div>
              </>
            ) : (
              <div
                style={{ textAlign: "left", width: "90%", marginLeft: "10%" }}
              >
                {!isShowingLogin && (
                  <CustomInput
                    placeholder="your name"
                    onChange={(event) =>
                      setUserData({ ...userData, name: event.target.value })
                    }
                    title="Name"
                  />
                )}
                <CustomInput
                  placeholder="your-email@email.com"
                  onChange={(event) =>
                    setUserData({ ...userData, email: event.target.value })
                  }
                  title="Email"
                />
                <CustomInput
                  type="password"
                  placeholder="password"
                  onChange={(event) =>
                    setUserData({ ...userData, password: event.target.value })
                  }
                  title="Password"
                />
                <button
                  onClick={() =>
                    submitUserData(isShowingLogin ? "login" : "signup")
                  }
                >
                  {isShowingLogin ? "Log in" : "Sign up"}
                </button>
                <div
                  className="slider"
                  onClick={() => setIsShowingLogin(!isShowingLogin)}
                >
                  <h2>
                    {isShowingLogin
                      ? "Need to sign up?"
                      : "Already have an account?"}
                  </h2>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
