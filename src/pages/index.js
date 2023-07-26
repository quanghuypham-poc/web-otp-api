import { useEffect, useRef, useState } from "react";

const OTP_CODE_LENGTH = 6;

export default function Home() {
  const [otp, setOtp] = useState("");
  const [screen, setScreen] = useState("phone");

  const inputRef = useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const newValue = value.slice(-OTP_CODE_LENGTH);
    setOtp(newValue);
  };

  useEffect(() => {
    if ("OTPCredential" in window && screen === "otp") {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          if (otp && screen !== "otp") {
            return;
          }
          setOtp(otp.code);
          ac.abort;
        });
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Web Otp Example Code</h1>

      <div>Screen: {screen}</div>
      {screen === "phone" ? (
        <div>blah blah</div>
      ) : (
        <input
          id="otp-input"
          ref={inputRef}
          inputMode="numeric"
          value={otp}
          onChange={handleChange}
          autoComplete="one-time-code"
        />
      )}
      <span>OTP: {otp}</span>
      <button onClick={() => setScreen("phone")}>Back</button>
      <button onClick={() => setScreen("otp")}>Next</button>
    </div>
  );
}
