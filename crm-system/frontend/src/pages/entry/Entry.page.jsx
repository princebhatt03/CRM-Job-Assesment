import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./Entry.style.css";
import { Login } from "../../components/login/Login.comp";
import { PasswordReset } from "../../components/password-reset/PasswordReset.comp";

export const Entry = () => {
  const [formLoad, setFormLoad] = useState("login");

  const formSwitcher = (formType) => {
    setFormLoad(formType);
  };

  return (
    <div className="entry-page bg-info">
      {formLoad === "login" ? (
        <Container className="form-box w-50">
          <Login formSwitcher={formSwitcher} />
        </Container>
      ) : (
        <Container className="form-box w-50">
          <PasswordReset
            handleOnChange={handleOnChange}
            email={email}
            handleOnResetSubmit={handleOnResetSubmit}
            formSwitcher={formSwitcher}
          />
        </Container>
      )}
    </div>
  );
};

export default Entry;
