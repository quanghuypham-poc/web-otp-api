import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [otp, setOtp] = useState("");
  const [text, setText] = useState("");
  const [submit, setSubmit] = useState("");
  const [keycode, setKeycode] = useState("");

  const inputRef = useRef(null);

  const handleChange = (event) => {
    setOtp(event.target.value);
    if (inputRef.current.value.length === 6) {
      setText("ios submit");
    }
  };

  const handleBlur = () => {
    setSubmit("blur");
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
          setText("android submit");
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
        onBlur={handleBlur}
      />

      <span>OTP: {otp}</span>
      <span>Text: {text}</span>
      <span>Submit: {submit}</span>
    </div>
  );
}
