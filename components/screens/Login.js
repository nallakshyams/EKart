import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOURS } from "../data/data";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../firebase/myfirebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      navigation.addListener("focus", () => {
        setEmail("");
        setPassword("");
      });
      if (user) {
        navigation.navigate("Home");
      } else {
        console.log("signed out successfully");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const validatePassword = () => {
    return password.length > 3;
  };

  const validateInput = () => {
    if (!validateEmail() && !validatePassword()) {
      return "Invalid email format and password length should be minimum 4 characters!!";
    } else if (!validateEmail()) {
      return "Invalid email format!!";
    } else if (!validatePassword()) {
      return "Password length should be minimum 4 characters!!";
    }
    return "valid";
  };

  const handleRegister = () => {
    const isValid = validateInput();
    if (!(isValid === "valid")) {
      return alert(isValid);
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log("registered user", response.user);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            alert("Email address is already in use.");
            break;
          case "auth/invalid-email":
            alert("Invalid email address.");
            break;
          case "auth/weak-password":
            alert("Password is too weak.");
            break;
          default:
            alert("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleLogin = () => {
    const isValid = validateInput();
    if (!(isValid === "valid")) {
      return alert(isValid);
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log("logged in user", response.user);
      })
      .catch((err) => {
        console.log(err.code);
        switch (err.code) {
          case "auth/invalid-email":
            alert("Invalid email address.");
            break;
          case "auth/user-disabled":
            alert("User account has been disabled.");
            break;
          case "auth/user-not-found":
            alert("Please register before sign-in.");
            break;
          case "auth/wrong-password":
            alert("Invalid password.");
            break;
          default:
            alert("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOutline]}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonText, styles.buttonOutlineText]}>
            Register
          </Text>
        </Pressable>
      </View>
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: COLOURS.white,
    marginTop: 6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "400",
  },
  buttonsContainer: {
    marginTop: 35,
    width: "60%",
  },
  button: {
    backgroundColor: COLOURS.blue,
    borderRadius: 10,
    padding: 14,
    marginTop: 5,
  },
  buttonText: { color: COLOURS.white, fontSize: 16, fontWeight: "700" },
  buttonOutline: {
    backgroundColor: COLOURS.white,
    borderColor: COLOURS.blue,
    borderWidth: 2,
  },
  buttonOutlineText: { color: COLOURS.blue },
});
