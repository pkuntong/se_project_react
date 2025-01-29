import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  addCardLike,
  addClothingItems,
  deleteClothingItems,
  getClothingItems,
  removeCardLike,
} from "../../utils/api";
import { logIn, register, getUserInfo, editUserInfo } from "../../utils/auth";
import { getToken, removeToken, setToken } from "../../utils/token";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegisterModal = () => setActiveModal("signup");
  const handleLogInModal = () => setActiveModal("login");
  const handleEditProfileModal = () => setActiveModal("edit");
  const handleAddClick = () => setActiveModal("add-garment");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => setActiveModal("");

  const handleLogIn = ({ email, password }) => {
    if (!email || !password) return;
    logIn({ email, password })
      .then((data) => {
        if (!data.token) console.error("No JWT token found.");
        setToken(data.token);
        return getUserInfo(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from?.pathname || "/profile";
        navigate(redirectPath);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    removeToken();
    navigate("/");
  };

  const handleAddItem = ({ name, imageUrl, weather }) => {
    const token = getToken();
    if (!token) return console.error("No token found.");
    addClothingItems({ name, imageUrl, weather }, token)
      .then((item) => {
        setClothingItems((prevItems) => [item.data, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    if (!token) return console.error("No token found.");

    const action = !isLiked ? addCardLike : removeCardLike;
    action(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard.data : item))
        );
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) =>
      prevUnit === "F" ? "C" : "F"
    );
  };

  // Fetch weather data on initial load
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        setWeatherData({
          type: "error",
          temp: { F: 999 },
          city: "Unable to fetch weather data",
        });
      });
  }, []);

  // Fetch clothing items on initial load
  useEffect(() => {
    getClothingItems()
      .then((data) => setClothingItems(data.data))
      .catch(console.error);
  }, []);

  // Check if user is logged in with token on initial load
  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      getUserInfo(jwt)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedInLoading(false);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Invalid token: ", err);
          removeToken();
          setIsLoggedInLoading(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleRegisterModal={handleRegisterModal}
              handleLogInModal={handleLogInModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    weatherTemp={weatherData.temp}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isLoggedInLoading={isLoggedInLoading}
                  >
                    <Profile
                      handleAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                      handleLogOut={handleLogOut}
                      handleEditProfileModal={handleEditProfileModal}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <div>
            <RegisterModal
              onClose={closeActiveModal}
              isOpen={activeModal === "signup"}
              onRegister={handleAddItem}
              handleLogInModal={handleLogInModal}
            />
            <LoginModal
              onClose={closeActiveModal}
              isOpen={activeModal === "login"}
              onLogIn={handleLogIn}
              handleRegisterModal={handleRegisterModal}
            />
            <EditProfileModal
              onClose={closeActiveModal}
              isOpen={activeModal === "edit"}
              onEdit={handleAddItem}
            />
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItem}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
