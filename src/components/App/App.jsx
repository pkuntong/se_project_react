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

  const handleRegisterModal = () => {
    setActiveModal("signup");
  };

  const handleLogInModal = () => {
    setActiveModal("login");
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenDelete = () => {
    setActiveModal("confirm");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = (data) => {
    register(data)
      .then(() => {
        handleLogIn({ email: data.email, password: data.password });
      })
      .catch(console.error);
  };

  const handleLogIn = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    logIn({ email, password })
      .then((data) => {
        if (!data.token) console.error("No JWT token found in the response.");
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
      .catch((err) => {
        console.error("Error logging in: ", err);
      });
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    removeToken();
    navigate("/");
  };

  const handleEditUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editUserInfo({ name, avatar }, token)
      .then((newData) => {
        setCurrentUser(newData);
        closeActiveModal();
      })
      .catch((err) => console.error("Edit profile error:", err));
  };

  const handleAddItem = ({ name, imageUrl, weather }) => {
    const token = getToken();
    if (!token) {
      console.error("No token found, user might not be authenticated");
      return;
    }
    addClothingItems({ name, imageUrl, weather }, token)
      .then((item) => {
        setClothingItems((clothingItems) => [item.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    const token = getToken();
    if (!token) {
      console.error("No token found, user might not be authenticated");
      return;
    }
    deleteClothingItems(selectedCard, token)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== selectedCard._id
        );
        setClothingItems(updatedClothingItems);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data.data.reverse());
      })
      .catch(console.error);
  }, []);

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
    } else {
      setIsLoggedInLoading(false);
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
                      handleEditProfileModal={handleEditProfileModal}
                      handleLogOut={handleLogOut}
                      onCardLike={handleCardLike}
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
              onRegister={handleRegistration}
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
              onEdit={handleEditUser}
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
              onOpenDelete={handleOpenDelete}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;