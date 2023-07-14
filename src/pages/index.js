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

  const handleKeyDown = (event) => {
    setKeycode(event.keyCode);
  };

  const handleBlur = () => {
    // setSubmit("blur");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(document.getElementById("otp-input"));

      document.getElementById("otp-input")?.addEventListener("focusout", () => {
        console.log("focusout");
        setSubmit("focusout");
      });
    }

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
          setText("android submit");
          ac.abort();
        });
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Web Otp Example Code</h1>
      <form>
        <input
          id="otp-input"
          ref={inputRef}
          inputMode="numeric"
          value={otp}
          autoComplete="one-time-code"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </form>
      <span>OTP: {otp}</span>
      <span>Text: {text}</span>
      <span>Submit: {submit}</span>
      <span>Keycode: {keycode}</span>
    </div>
  );
}
