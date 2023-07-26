import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [otp, setOtp] = useState("");

  const inputRef = useRef(null);

  const handleChange = (event) => {
    event.preventDefault();
    console.log("change event.data", event.data);
    setOtp(event.target.value);
  };

  const handleInput = (event) => {
    console.log("event", event);
    event.preventDefault();
    event.target.value = event.data;
    console.log("input", event.data);
    setOtp(event.target.value);
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
        onInput={handleInput}
        autoComplete="one-time-code"
        maxLength={6}
      />

      <span>OTP: {otp}</span>
    </div>
  );
}
