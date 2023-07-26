import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [otp, setOtp] = useState("");

  const inputRef = useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    console.log("change", event.data);
    setOtp(event.target.value);
  };

  const handleInput = (event) => {
    event.preventDefault();
    console.log("input", event.data);
  };

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOtp(otp.code);
          ac.abort;
        });
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Web Otp Example Code</h1>

      <input
        id="otp-input"
        ref={inputRef}
        inputMode="numeric"
        value={otp}
        autoComplete="one-time-code"
        onChange={handleChange}
        onInput={handleInput}
        maxLength={6}
      />

      <span>OTP: {otp}</span>
    </div>
  );
}
