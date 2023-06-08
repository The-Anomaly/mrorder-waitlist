import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  SCOPE,
  SHEETS_API_KEY,
  SHEETS_API_URL,
  SPREADSHEET_ID,
} from "config";
import { KJUR } from "jsrsasign";

const sheetNo = "Sheet1";

interface FormData {
  name: string;
  email: string;
}

export const useSheet = ({
  closeForm,
  message,
}: {
  closeForm: () => void;
  message: { success: string; error: string };
}) => {
  const [toast, setToast] = React.useState({
    show: false,
    heading: "",
    text: "",
    type: true,
  });
  const [loading, setLoading] = React.useState(false);
  const [jwt, setJwt] = React.useState("");

  const getJWT = () => {
    if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL) return;
    const jwtHeader = { alg: "RS256", typ: "JWT" };
    const jwtClaim = {
      aud: "https://oauth2.googleapis.com/token",
      scope: SCOPE,
      iss: GOOGLE_CLIENT_EMAIL,
      exp: KJUR.jws.IntDate.get("now + 1hour"),
      iat: KJUR.jws.IntDate.get("now"),
    };

    const jwtHeaderString = JSON.stringify(jwtHeader);
    const jwtClaimString = JSON.stringify(jwtClaim);

    const signedJWT = KJUR.jws.JWS.sign(
      null,
      jwtHeaderString,
      jwtClaimString,
      GOOGLE_PRIVATE_KEY
    );
    return signedJWT;
  };

  React.useEffect(() => {
    const signedJWT = getJWT();
    setJwt(signedJWT);
  }, []);

  const getTokenRequestData = () => {
    if (jwt) {
      let urlEncodedData = "";
      let urlEncodedDataPairs: any[] = [];

      urlEncodedDataPairs.push(
        encodeURIComponent("grant_type") +
          "=" +
          encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer")
      );
      urlEncodedDataPairs.push(
        encodeURIComponent("assertion") + "=" + encodeURIComponent(jwt)
      );
      urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
      return urlEncodedData;
    }
  };

  const getAccessToken = async (sheetData) => {
    const data = getTokenRequestData();

    if (data) {
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      await axios
        .post(`https://www.googleapis.com/oauth2/v3/token`, data, config)
        .then((response) => {
          sendToSheet(sheetData, response.data.access_token);
        })
        .catch((err) => {
          errorResponse(message.error);
          setLoading(false)
        })
    } else {
      setLoading(false);
      errorResponse(message.error);
    }
  };

  const sendToSheet = async (sheetData, access_token) => {
    if (!SHEETS_API_KEY || !SHEETS_API_URL) return;

    const range = sheetNo;
    const params = {
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      key: SHEETS_API_KEY,
    };

    const body = {
      majorDimension: "ROWS",
      range: range,
      values: [sheetData],
    };

    const config: AxiosRequestConfig = {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios
      .post(
        `${SHEETS_API_URL}/${SPREADSHEET_ID}/values/${range}:append`,
        body,
        config
      )
      .then((res) => {
        if (res.status === 200) {
          closeForm();
          setToast({
            show: true,
            heading: "Great",
            text: message.success,
            type: true,
          });
          setTimeout(() => {
            setToast({ ...toast, show: false });
          }, 5000);
        } else {
          errorResponse(message.error);
        }
      })
      .catch((err) => {
        errorResponse(message.error);
      })
      .finally(() => setLoading(false));
  };

  const errorResponse = (message: string) => {
    setToast({
      show: true,
      heading: "Sorry",
      text: message,
      type: false,
    });

    setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 5000);
  };

  const sendMessage = (data: FormData) => {
    const formData = Object.values(data);
    const sheetData = [new Date().toUTCString(), ...formData];
    setLoading(true);
    getAccessToken(sheetData);
  };

  const closeSurveyToast = () => {
    setToast({
      ...toast,
      show: false,
    });
  };

  return {
    toast,
    closeSurveyToast,
    loading,
    sendMessage,
  };
};
