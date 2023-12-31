import { useMemo, useState, useCallback } from "react";
import md5 from "md5";

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLockOpen, faLock } from "@fortawesome/free-solid-svg-icons";

// contexts
import { useLanguage } from "../../../contexts/LanguageProvider";
import { useNotification } from "../../../contexts/NotificationProvider";

// components
import Loading from "../../../components/Loading/Loading";
import SimpleInput from "../../../components/SimpleInput/SimpleInput";

// utils
import { getUserId } from "../../../utils/auth";

// services
import { saveModel } from "../../../services/post";

function Security() {
  const { languageState } = useLanguage();
  const { setNotificationState } = useNotification();

  const showNotification = useCallback(
    (ntype, message) =>
      setNotificationState({
        type: "set",
        ntype,
        message,
      }),
    [setNotificationState]
  );

  const { settings, errors, buttons, labels, messages } = useMemo(
    () => languageState.texts,
    [languageState]
  );

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handlePassword = useCallback((e) => setPassword(e.target.value), []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const [rPassword, setRPassword] = useState("");
  const [showRPassword, setShowRPassword] = useState(false);
  const [rPasswordHelperText, setRPasswordHelperText] = useState("");

  const handleRPassword = useCallback((e) => setRPassword(e.target.value), []);

  const toggleShowRPassword = useCallback(() => {
    setShowRPassword(!showRPassword);
  }, [showRPassword]);

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      setLoading(true);
      e.preventDefault();
      // password required
      if (!password.length) {
        document.getElementById("password")?.focus();
        setPasswordHelperText(errors.passwordRequired);
        setLoading(false);
        return;
      }
      // password are not equal
      if (password !== rPassword) {
        document.getElementById("rPassword")?.focus();
        setRPasswordHelperText(errors.passwordsNotEqual);
        setLoading(false);
        return;
      }
      try {
        await saveModel("users", { id: getUserId(), pw: md5(password) });
        showNotification("success", messages.saved);
        setPassword("");
        setRPassword("");
      } catch (err) {
        console.error(err);
        if (String(err) === "AxiosError: Network Error")
          showNotification("error", errors.notConnected);
        else showNotification("error", String(err));
      }
      setLoading(false);
    },
    [password, rPassword, errors, messages, showNotification]
  );

  return (
    <form onSubmit={onSubmit} className="relative">
      {loading ? (
        <Loading className="w-full h-full absolute top-0 left-0 dark:bg-dark-background bg-light-background z-20" />
      ) : null}
      <div className="flex items-center gap-2 mb-5">
        <h3>{settings.security.title}</h3>
      </div>
      <SimpleInput
        id="password"
        className="input-control"
        label={labels.pw}
        inputProps={{
          className: "input primary !pl-8 w-full",
          value: password,
          onChange: handlePassword,
          type: !showPassword ? "password" : "string",
        }}
        leftIcon={
          <button tabIndex={-1} type="button" onClick={toggleShowPassword}>
            <FontAwesomeIcon
              name="toggle-see-password"
              icon={showPassword ? faLockOpen : faLock}
              aria-label={languageState.texts.toggleShowPassword}
              className="absolute text-white top-[50%] -translate-y-[50%] left-3"
            />
          </button>
        }
        helperText={passwordHelperText}
      />
      <SimpleInput
        id="rPassword"
        className="input-control"
        label={labels.rPassword}
        inputProps={{
          className: "input primary !pl-8 w-full",
          value: rPassword,
          onChange: handleRPassword,
          type: !showRPassword ? "password" : "string",
        }}
        leftIcon={
          <button tabIndex={-1} type="button" onClick={toggleShowRPassword}>
            <FontAwesomeIcon
              name="toggle-see-password"
              icon={showRPassword ? faLockOpen : faLock}
              aria-label={languageState.texts.ariaLabels.toggleShowPassword}
              className="absolute text-white top-[50%] -translate-y-[50%] left-3"
            />
          </button>
        }
        helperText={rPasswordHelperText}
      />
      <button
        type="submit"
        name="save-new-password"
        className="primary submit button mt-2"
        aria-label={languageState.texts.ariaLabels.saveNewPassword}
      >
        {buttons.save}
      </button>
    </form>
  );
}

export default Security;
