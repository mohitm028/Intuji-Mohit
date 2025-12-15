import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../store/cartSlice";
import { selectUser, logout } from "../store/authSlice";

const Navbar = () => {
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              Intuji Test Mohit
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                >
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="h-8 w-8 rounded-full border border-gray-200"
                  />
                  <span className="hidden sm:block font-medium">
                    {user.firstName}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
