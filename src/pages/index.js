import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [otp, setOtp] = useState("");
  const [text, setText] = useState("");

  const inputRef = useRef(null);

  const handleChange = (event) => {
    setOtp(event.target.value);
    if (event.target.value.length === 6) {
      setText("submit");
    }
  };

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();

      setTimeout(() => ac.abort(), 2 * 60 * 1000);

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          setOtp(otp.code);
          ac.abort();
        });
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Web Otp Example Code</h1>
      <input
        ref={inputRef}
        inputMode="numeric"
        value={otp}
        autoComplete="one-time-code"
        onChange={handleChange}
      />
      <span>OTP: {otp}</span>
      <span>Text: {text}</span>
    </div>
  );
}
