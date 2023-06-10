import { Navbar } from "components";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Cheers } from "assets";
import { SCRIPT_API_URL } from "config";
import axios from "axios";

const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const Waitlist = () => {
  const [name, setName] = useState({
    value: "",
    error: "",
  });
  const [email, setEmail] = useState({
    value: "",
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail({ value, error: "" });
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName({ value, error: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail({ ...email, error: "" });

    if (name.value.trim() === "" || !regex.test(email.value)) {
      if (name.value.trim() === "") {
        setName({ ...email, error: "Required" });
      }
      if (!regex.test(email.value)) {
        setEmail({ ...email, error: "Enter a valid email" });
      }
      return;
    }
    sendMessage();
  };

  const sendMessage = () => {
    setLoading(true);
    const data = {
      Time: new Date(),
      Name: name.value,
      Email: email.value,
    };

    if (!SCRIPT_API_URL) return;

    axios
      .post(SCRIPT_API_URL, data)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        setTimeout(() => {
          setEmail({ value: "", error: "" });
          setName({ value: "", error: "" });
          setLoading(false);
        }, 10000);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setLoading(false);
      });
  };
  return (
    <>
      <Navbar />
      <main className={styles.containerBg}>
        <section className={`appContainer ${styles.container}`}>
          {success ? (
            <>
              <Cheers className={styles.cheers} />
              <h1>Cheers {name.value}</h1>
              <p>You’ve been added to our waitlist.</p>
            </>
          ) : (
            <>
              <h1>Join Waitlist</h1>
              <p>Be the first to know out when we go live</p>
              <form>
                <input
                  onChange={handleChangeName}
                  value={name.value}
                  placeholder="Name"
                  name="name"
                  disabled={loading}
                />
                {name.error && <p className={styles.error}>{name.error}</p>}
                <input
                  onChange={handleChangeEmail}
                  value={email.value}
                  placeholder="Email"
                  name="email"
                  disabled={loading}
                />
                {email.error && <p className={styles.error}>{email.error}</p>}

                <button onClick={handleSubmit}>
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>{" "}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export { Waitlist };
