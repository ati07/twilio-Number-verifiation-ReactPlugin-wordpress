import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import CURRENCIE from "./currencies.js";
import AreaCode from "./AreaCode.js";
import AmericanAreaCode from "./AmericanAreaCode.js";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";

const theme = createTheme();

export default function App() {
  // const a =
  // console.log('Ara Code',AreaCode[39])
  const [state, setState] = useState({
    mobile: "",
    otp: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNumberErr("");
    setState({
      ...state,
      [name]: value,
    });
  };

  const [countryCode, setCountryCode] = useState("");
  const handleCode = (e) => {
    e.preventDefault();
    setCountryCode(e.target.value);
  };
  const [otp, setOtp] = useState(false);
  const [numberErr, setNumberErr] = useState("");
  const [mobile_Number, setMobile_Number] = useState("");
  const [aCodeV, setACodeV] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);


// twilio verification

  const onVerify = async (e) => {
    e.preventDefault();
    // configureCaptcha();
    console.log("mobile", state.mobile);
    const mobileNumber = "+" + countryCode + state.mobile;
    // console.log("dataexcel",data)
    const excelMobileNumber = [];
    data.map(async (i) => await excelMobileNumber.push(i.MobileNumber));
    if (state.mobile !== "") {
      if (!excelMobileNumber.includes(countryCode + state.mobile)) {
        if (countryCode !== "") {
          if (countryCode !== "1" || AreaValid) {
            // if(AreaValid){
            //   onSubmitAreaCode(e)
            // }
            setMobile_Number(mobileNumber);
            console.log(mobileNumber);
            setLoading(true);

            try {
              await axios
                .post("https://develop.poq.gg/api/login", { mobileNumber })
                .then((response) => {
                  try {
                    if (response.data.data.lookup.carrier.type === "mobile") {
                      console.log(
                        "type:",
                        response.data.data.lookup.carrier.type
                      );
                      setOtp(true);
                      setACodeV(false);

                      setLoading(false);
                    } else {
                      console.log("resk", response);
                      console.log(
                        "type:",
                        response.data.data.lookup.carrier.type
                      );
                      setNumberErr(
                        "Fake or simulated number, please enter a valid number"
                      );
                      setLoading(false);

                    }
                  } catch {
                    setLoading(false);
                    console.log("res", response);
                    if (
                      response.data.message === "Wrong phone number or code :("
                    ) {
                      setOtp(false);
                      alert("Wrong phone number or code :(. Please try again");
                    }
                    if (response.data.message.status === 429) {
                    }
                    setNumberErr("Too many requests, try later");
                    if (response.data.message.status === 403) {
                      setNumberErr(
                        "SMS is not supported by landline phone number or Fake number,please enter a valid number"
                      );
                    }
                    if (
                      response.data.message.status === 200 ||
                      response.data.message.status === 400
                    ) {
                      setNumberErr(
                        "Invalid parameter, Please enter valid Number"
                      );
                    }
                    if (response.data.message.status === 203) {
                      setNumberErr(
                        "maximum send attempt reached, try again later"
                      );
                    }
                    if (response.data.message.status === 500) {
                      setNumberErr(
                        "We are temporarily unable to return the representation. Please wait for a bit and try again."
                      );
                    }
                    if (response.data.message.status === 500) {
                      setNumberErr(
                        "We are temporarily unable to return the representation. Please wait for a bit and try again."
                      );
                    }
                  }
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            setACodeV(true);
            
          }
        } else {
          // alert("You are not allowed, Only for Outside of USA");
          alert("please Enter Countery Code");
        }
      } else {
        alert("This number has already verified");
        setCountryCode("");
        setState({ mobile: "" });
      }
    } else {
      alert("Please Fill Mobile Number");
    }
  };
  //AreaCode Verification
  const ToVaerify = () => {
    onVerify();
  };
  const [AreaC, setAreaC] = useState({ Code: "" });
  const onHandleAreaCode = (e) => {
    e.preventDefault();
    setAreaCodeErr(false);

    setAreaC({
      Code: e.target.value,
    });
  };
  const [AreaValid, setAreaValid] = useState(false);
  const [areaCodeErr, setAreaCodeErr] = useState(false);
  const onSubmitAreaCode = (e) => {
    e.preventDefault();
    console.log("AC", AreaC);
    // if(AmericanAreaCode.includes(parseInt(AreaC.Code))){

    // }
    if (AreaCode.includes(parseInt(AreaC.Code))) {
      setAreaValid(true);
      setACodeV(false);
      // ToVaerify();
      // onVerify(e);
      // document.getElementById('verifybtn').click()
      console.log("ACIN", AreaC);
        // return true
      // setOtp(true);
    } else {
      setAreaCodeErr(true);
    }
  };
useEffect(()=>{
  // console.log('inside')
if(AreaValid){
  document.getElementById('verifybtn').click()
  // console.log('insideA')

}
},[AreaValid])
  const [check, setCheck] = useState(false);
  const [err, setErr] = useState(false);
  //onsubmitOTP
  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const code = state.otp;
    console.log(code);
    try {
      await axios
        .post("https://develop.poq.gg/api/verify", { mobile_Number, code })
        .then((response) => {
          // console.log('res',(response.data.data.lookup.carrier.type))
          console.log("res", response);
          if (response.data.message === "User is Verified!!") {
            setCheck(true);
            setOtp(false);
            setNumberErr("");
            setAreaValid(false);
          } else {
            setErr(true);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  //GoogleSheet Crud operations are
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const res = await fetch(
        // "https://sheet.best/api/sheets/8896bf24-2d24-4d96-8178-4b539202fd6c"
        "https://sheet.best/api/sheets/212d7226-4c28-4d52-bfcb-80974a7ea180"
      );
      const data = await res.json();
      // console.log(data);
      setData(Object.keys(data).map((key) => data[key]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  // CrptoAddress Verification
  const options = [""];
  const [curr, setCurr] = useState({
    Currency: "",
  });
  const onChangeCurrency = (e) => {
    e.preventDefault();
    setCurr({
      Currency: e.target.value,
    });
  };
  const [CryValid, setcryValid] = useState(false);
  const [CryAddError, setCryAddError] = useState(false);

  function CryptoValidator(e) {
    e.preventDefault();
    // console.log('cry',cryptoaddress)
    // var WAValidator = require('walletAddressValidatorMinJs');
    const WAValidator = require("@swyftx/api-crypto-address-validator");
    // const cc = "0x8E727A24CBfdF320f5E668F8a6f80f68A647A723";
    console.log("dc", developDetail.CryptoAddress);
    console.log("curr", curr);
    //get cryptoaddress from GoogleSheet
    const savedAdress = [];
    const Currecnies = [];
    data.map(async (i) => await savedAdress.push(i.CryptoAddress));
    CURRENCIE.map(async (i) => await Currecnies.push(i.symbol));
    if (developDetail.CryptoAddress !== "") {
      if (!savedAdress.includes(developDetail.CryptoAddress)) {
        console.log("sa", savedAdress);
        if (curr.Currency !== "") {
          if (Currecnies.includes(curr.Currency)) {
            var valid = WAValidator.validate(
              `${developDetail.CryptoAddress}`,
              `${curr.Currency}`
            );
            if (valid) {
              setcryValid(true);
              setCryAddError(false);

              console.log("This is a valid address");
              return true;
            } else {
              setCryAddError(true);
              // setCurr({Currency:""});
              console.log("Address INVALID");
              return false;
            }
          } else {
            alert("please enter Valid Crypto Currency");
            setCurr({
              Currency: "",
            });
          }
        } else {
          alert("Please Enter Relative Crypto Currency");
        }
      } else {
        alert(
          "Crypto address Already in Used, Please Enter another Crypto Address"
        );
      }
    } else {
      alert("Please fill Crypto Address");
    }
  }

  // After submit button
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log('data',data);
    const Fullname = data.get("FullName");
    const email = data.get("Email");
    const number = data.get("mobile");
    const GithubHandle = data.get("GithubHandle");
    const CryptoAdress = data.get("CryptoAdress");
    const GitHubReferrer = data.get("GitHubReferrer");
    console.log({
      Fullname: data.get("FullName"),
      email: data.get("Email"),
      number: mobile_Number,
      GithubHandle: data.get("GithubHandle"),
      CryptoAdress: data.get("CryptoAdress"),
      GitHubReferrer: data.get("GitHubReferrer"),
    });
    if (
      Fullname !== "" &&
      email !== "" &&
      number !== "" &&
      GithubHandle !== "" &&
      CryptoAdress !== "" &&
      GitHubReferrer !== ""
    ) {
      //  CryptoValidator()
      if (check) {
        const detail = {
          FullName: developDetail.FullName,
          Email: developDetail.Email,
          MobileNumber: mobile_Number,
          GithubHandle: developDetail.GithubHandle,
          CryptoAddress: developDetail.CryptoAddress,
          GitHubReferrer: developDetail.GitHubReferrer,
        };
        // console.log('detail',detail)
        setSubmitLoading(true);
        try {
          const res = await fetch(
            // "https://sheet.best/api/sheets/8896bf24-2d24-4d96-8178-4b539202fd6c",
            "https://sheet.best/api/sheets/212d7226-4c28-4d52-bfcb-80974a7ea180",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(detail),
            }
          );
          if (res.ok) {
            alert("Congratulation: Your Data has been saved");
            setDeveloperDetail({
              FullName: "",
              Email: "",
              MobileNumber: "",
              GithubHandle: "",
              CryptoAddress: "",
              GitHubReferrer: "",
            });
            setCheck(false);
            setCountryCode("");
            setState({ mobile: "" });
            setcryValid(false);
            setCurr({ Currency: "" });
            // setLoading(false)
            setSubmitLoading(false);
            // history.replace("/");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("Please verify the Number first");
      }
    } else {
      alert("Please filled all Field. Or remaining Field");
    }
  };
  const [en, setEn] = useState("");
  const [developDetail, setDeveloperDetail] = useState({
    FullName: "",
    Email: "",
    MobileNumber: "",
    GithubHandle: "",
    CryptoAddress: "",
    GitHubReferrer: "",
  });
  const onHandlechange = (e) => {
    setCryAddError(false);
    setDeveloperDetail({
      ...developDetail,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography> */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <div id="sign-in-button"></div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="FullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  value={developDetail.FullName}
                  autoFocus
                  onChange={onHandlechange}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="Email"
                  autoComplete="email"
                  value={developDetail.Email}
                  onChange={onHandlechange}
                />
              </Grid>
              {otp ? (
                ""
              ) : (
                <>
                  <Grid item sm={3}>
                    {check ? (
                      <TextField
                        size="small"
                        required
                        fullWidth
                        name="countrycode"
                        label="+Country Code"
                        type="number"
                        id="number"
                        value={countryCode}
                        onChange={handleCode}
                        disabled
                      />
                    ) : (
                      <TextField
                        size="small"
                        required
                        fullWidth
                        name="countrycode"
                        label="+Country Code"
                        type="number"
                        id="number"
                        value={countryCode}
                        onChange={handleCode}
                      />
                    )}
                  </Grid>
                  <Grid item sm={6}>
                    {check ? (
                      <TextField
                        size="small"
                        required
                        fullWidth
                        name="mobile"
                        label="Phone Number"
                        type="number"
                        id="number"
                        autoComplete="new-number"
                        onChange={handleChange}
                        value={state.mobile}
                        disabled
                      />
                    ) : (
                      <TextField
                        size="small"
                        required
                        fullWidth
                        name="mobile"
                        label="Phone Number"
                        type="number"
                        id="number"
                        autoComplete="new-number"
                        onChange={handleChange}
                        value={state.mobile}
                      />
                    )}
                    {numberErr !== "" ? (
                      <p style={{ color: "red", fontSize: "10px" }}>
                        {numberErr}
                      </p>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item sm={3}>
                    {check ? (
                      <Button
                        // type="submit"

                        // variant="contained"
                        sx={{ mt: 0, mb: 2 }}
                        // onClck={onClick}
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        Verified
                      </Button>
                    ) : (
                      <>
                        {loading ? (
                          <LoadingButton loading variant="outlined">
                            Submit
                          </LoadingButton>
                        ) : (
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 0, mb: 2 }}
                            onClick={onVerify}
                            id='verifybtn'
                          >
                            {otp ? "Verifying..." : "Verify"}
                          </Button>
                        )}
                      </>
                    )}
                  </Grid>
                </>
              )}
              {/* AreaCode verification */}
              {aCodeV ? (
                <Grid item xs={12}>
                  {aCodeV ? (
                    <p style={{ color: "green", fontSize: "10px" }}>
                      Please Enter your Area Code where you belong to verify
                    </p>
                  ) : (
                    ""
                  )}

                  <TextField
                    size="small"
                    required
                    fullWidth
                    name="code"
                    label="Area Code"
                    type="number"
                    id="code"
                    autoComplete="new-code"
                    onChange={onHandleAreaCode}
                  />

                  {areaCodeErr ? (
                    <p style={{ color: "red", fontSize: "10px" }}>
                      This is Only for Non-USA. Please Enter your correct Area
                      Code where you belong to verify.If you have not then
                      Refresh the page
                    </p>
                  ) : (
                    ""
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onSubmitAreaCode}
                  >
                    Submit Area Code
                  </Button>
                </Grid>
              ) : (
                ""
              )}
              {/* AreaCode Verifacion End */}
              {otp ? (
                <Grid item xs={12}>
                  {otp ? (
                    <p style={{ color: "green", fontSize: "10px" }}>
                      OTP has been sent
                    </p>
                  ) : (
                    ""
                  )}

                  <TextField
                    size="small"
                    required
                    fullWidth
                    name="otp"
                    label="OTP Number"
                    type="number"
                    id="otp"
                    autoComplete="new-otp"
                    onChange={handleChange}
                  />

                  {err ? (
                    <p style={{ color: "red", fontSize: "10px" }}>
                      Please Enter Correct OTP
                    </p>
                  ) : (
                    ""
                  )}

                  {loading ? (
                    <LoadingButton loading variant="outlined">
                      Submit
                    </LoadingButton>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={onSubmitOtp}
                    >
                      Submit OTP
                    </Button>
                  )}
                </Grid>
              ) : (
                ""
              )}
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="GithubHandle"
                  required
                  fullWidth
                  id="github"
                  label="Enter GitHub handle"
                  value={developDetail.GithubHandle}
                  onChange={onHandlechange}
                />
              </Grid>
              <Grid item sm={6}>
                {CryValid ? (
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name="CryptoAddress"
                    required
                    fullWidth
                    id="crypto"
                    label="Enter your crypto address"
                    value={developDetail.CryptoAddress}
                    onChange={onHandlechange}
                    disabled
                  />
                ) : (
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name="CryptoAddress"
                    required
                    fullWidth
                    id="crypto"
                    label="Enter your crypto address"
                    value={developDetail.CryptoAddress}
                    onChange={onHandlechange}
                  />
                )}
                {/* <button >check</button> */}
                {CryAddError ? (
                  <p style={{ color: "red", fontSize: "10px" }}>
                    Please Enter Valid CryptoAddress and relative Currency again
                  </p>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item sm={3}>
                {CryValid ? (
                  <TextField
                    size="small"
                    required
                    fullWidth
                    name="cryptocurrency"
                    label="CryptoCurrency"
                    type="text"
                    id="Currency"
                    value={curr.Currency}
                    onChange={onChangeCurrency}
                    disabled
                  />
                ) : (
                  <TextField
                    size="small"
                    required
                    fullWidth
                    name="Currency"
                    label="CryptoCurrency"
                    type="text"
                    id="Currency"
                    value={curr.Currency}
                    onChange={onChangeCurrency}
                  />
                )}
                {/* {CryValid ? (
                  <Autocomplete
                    disabled
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    options={CURRENCIE.map((option) => option.symbol)}
                    onChange={(e, value) => setCurr(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Crypto Currency"
                        value={curr}
                      />
                    )}
                  />
                ) : (
                  <Autocomplete
                    size="small"
                    id="free-solo-demo"
                    freeSolo
                    options={CURRENCIE.map((option) => option.symbol)}
                    onChange={(e, value) => setCurr(value)}
                    renderInput={(params) => (
                      <TextField {...params} label="Crypto Currency" />
                    )}
                  />
                )} */}
              </Grid>
              <Grid item sm={3}>
                {CryValid ? (
                  <Button
                    // type="submit"

                    // variant="contained"
                    sx={{ mt: 0, mb: 2 }}
                    // onClck={onClick}
                    style={{ backgroundColor: "green", color: "white" }}
                  >
                    Verified
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 0, mb: 2 }}
                    onClick={CryptoValidator}
                  >
                    Verify
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="GitHubReferrer"
                  required
                  fullWidth
                  id="referrer"
                  label="GitHub of referrer"
                  value={developDetail.GitHubReferrer}
                  onChange={onHandlechange}
                />
              </Grid>
            </Grid>

            {submitLoading ? (
              <LoadingButton loading variant="outlined" fullWidth>
                Submit
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
