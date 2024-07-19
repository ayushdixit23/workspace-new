import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { changelaoding, sendData } from "../redux/slice/userData";
import { useGetRefreshTokenMutation } from "../redux/apiroutes/userLoginAndSetting";
import { checkToken } from "./Useful";
import Cookies from "js-cookie";

const useTokenAndData = () => {
  const [isValid, setIsValid] = useState(false);
  const token = Cookies.get(`excktn`);
  const path = useSelector((state) => state.userData.path);
  const router = useRouter();
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const [refreshedtokenAgain] = useGetRefreshTokenMutation();

  const refreshAccessToken = useCallback(
    async (refreshToken) => {
      try {
        const res = await refreshedtokenAgain({ refresh_token: refreshToken });
        const { access_token, success } = res.data;

        if (success) {
          return { access_token, refresh_token: refreshToken };
        } else {
          console.error("Failed to refresh token");
          return Promise.reject("Failed to refresh token");
        }
      } catch (err) {
        console.error(err);
        return Promise.reject("Failed to refresh token");
      }
    },
    [refreshedtokenAgain]
  );

  const checkRefreshTokenValidity = useCallback(() => {
    try {
      const refreshToken = Cookies.get(`frhktn`);
      // const refreshToken = Cookies.get(`frhktn${sessionId}`)
      if (!refreshToken) {
        console.error("No refresh token found");
        return false;
      }
      const decodedRefreshToken = jwt.decode(refreshToken);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expiration = decodedRefreshToken.exp;

      const isValid = currentTimestamp <= expiration;
      return isValid;
    } catch (error) {
      console.error("Error checking refresh token validity:", error);
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    const refreshToken = Cookies.get(`frhktn`);
    // const refreshToken = Cookies.get(`frhktn${sessionId}`)
    if (!refreshToken) {
      console.error("No refresh token found");
      return Promise.reject("No refresh token found");
    }
    try {
      const newToken = await refreshAccessToken(refreshToken);
      if (newToken) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);

        Cookies.set(`excktn`, newToken.access_token, {
          expires: expirationDate,
        });
        Cookies.set(`frhktn`, newToken.refresh_token, {
          expires: expirationDate,
        });

        // Cookies.set(`excktn${sessionId}`, newToken.access_token)
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
    }
  }, [refreshAccessToken]);

  const generateData = useCallback(
    async (qrtoken) => {
      try {
        const tokentoInclude = token || qrtoken;

        if (tokentoInclude) {
          const { isValid, payload } = await checkToken(tokentoInclude);
          if (isValid) {
            setIsValid(true);
            dispatch(changelaoding({ loading: false }));
            setData(payload);
            dispatch(sendData(payload));

            if (path) {
              router.push(`${path}`);
            }
          } else if (checkRefreshTokenValidity()) {
            await refresh();
          } else {
            setIsValid(false);
            Cookies.remove(`excktn`);
            Cookies.remove(`frhktn`);
            // Cookies.remove(`excktn${sessionId}`)
            // Cookies.remove(`frhktn${sessionId}`)
          }
        }
      } catch (e) {
        console.error(e);
        setIsValid(false);
        Cookies.remove(`excktn`);
        Cookies.remove(`frhktn`);
        // Cookies.remove(`excktn${sessionId}`)
        // Cookies.remove(`frhktn${sessionId}`)
      }
    },
    [token]
  );

  useEffect(() => {
    generateData();
  }, [token]);

  return { isValid, data, generateData };
};

export default useTokenAndData;
