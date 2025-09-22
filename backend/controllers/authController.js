// controllers/authController.js
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import * as jose from "jose";
import axios from "axios";

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only https in prod
    sameSite: "none",
    maxAge: 60 * 60 * 1000 // 7 days
  });
};

const verifyAuth0Token = async (credential) => {
  const JWKS = jose.createRemoteJWKSet(
    new URL(`https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`),
    { timeoutDuration: 10000 } // 10s instead of default 5s
  );

  const { payload } = await jose.jwtVerify(credential, JWKS, {
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    audience: process.env.AUTH0_CLIENT_ID,
  });

  return payload;
};

//-----------------------GET USER---------------------



export const getCurrentUser = async (req, res) => {
  try {
    console.log("here");
    
    const token = req.cookies.token;
    
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    const needsPhone = !user.phone;
    res.json({user, needsPhone});
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// -------------------- LOCAL AUTH --------------------

// Signup with email + phone + password
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      provider: "local",
    });
    await user.save();

    const token = generateToken(user);
    setAuthCookie(res, token);
    res.status(201).json({ user, needsPhone: false });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// Login with email + password
export const loginWithEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    setAuthCookie(res, token);
    res.json({ user, needsPhone: false });
  } catch (err) {
    res.status(500).json({ message: "Email login failed", error: err.message });
  }
};

// Login with phone + password
export const loginWithPhone = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password required" });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);
    setAuthCookie(res, token);
    res.json({ user, needsPhone: false });
  } catch (err) {
    res.status(500).json({ message: "Phone login failed", error: err.message });
  }
};


//-----------------------LOGOUT------------------------

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
  });
  res.json({ message: "Logged out successfully" });
};



// -------------------- SOCIAL AUTH --------------------


export const socialSignin = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: "Auth0 ID Token required" });
    }

    // 1. Verify Auth0-issued ID token
    const payload = await verifyAuth0Token(credential);
    const { sub, email, name } = payload;
    console.log(payload);
    

    if (!sub) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // 2. Try to find user by auth0Id OR email
    let user = await User.findOne({
      $or: [{ auth0Id: sub }, { email }],
    });

    if (user) {
      // Attach missing auth0Id/provider if needed
      if (!user.auth0Id) {
        user.auth0Id = sub;
        user.provider = sub.split("|")[0]; // "google-oauth2", "facebook", "linkedin"
        await user.save();
      }
    } else {
      // If no user found, create a new one
      user = new User({
        auth0Id: sub,
        email: email || null,
        name: name || "Anonymous",
        provider: sub.split("|")[0],
      });
      await user.save();
    }

    console.log("Final user:", user);

    // 3. Issue app JWT
    const token = generateToken(user);
    setAuthCookie(res, token);
    res.json({ user, needsPhone: !user.phone });
  } catch (err) {
    console.error("Auth0 social login failed:", err);
    res.status(401).json({ message: "Invalid social login", error: err.message });
  }
};

//-------------------------------UPDATE USER--------------------------------

