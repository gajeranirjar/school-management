import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { ROLES } from "../constants/roles";
import { logAction } from "./logService";


export const registerUser = async (name, email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  let credential;
  try {
    credential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", credential.user.uid), {
      name,
      email,
      role: ROLES.USER,
      isActive: true,
      createdAt: Timestamp.now(),
    });

    await logAction(credential.user.uid, "Student Registered", ROLES.USER);
  } catch (error) {
    if (credential?.user) await credential.user.delete();
    if (error.code === "auth/email-already-in-use") {
      throw new Error("This email is already registered");
    }
    throw new Error(error.message || "Registration failed");
  }
};

export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const {user} = userCredential;

    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      throw new Error("User Profile not found.");
    }

    const userData = userDoc.data();

    if (!userData.isActive) {
      throw new Error("Your account is Disabled.");
    }

    await logAction(user.uid, "User Logged In", userData.role);

    return {
      success: true,
      data: {
        uid: user.uid,
        ...userData
      }
    };
  } catch (error) {
    throw new Error(error.message || "Login Failed.");
  }
};

export const logoutUser = async (uid, role) => {
  try {
    await logAction(uid, "User Logged Out", role);
    await signOut(auth);
    return { success: true };
  } catch (error) {
    throw new Error(error.message || "Logout failed");
  }
};

// export const updateUserPassword = async (currentPassword, newPassword) => {
//   if (!newPassword || newPassword.length < 6) {
//     throw new Error("Password must be at least 6 characters");
//   }

//   const user = auth.currentUser;

//   if (!user) {
//     throw new Error("No authenticated user.");
//   }

//   try {
//     if (currentPassword) {
//       const credential = EmailAuthProvider.credential(
//         user.email,
//         currentPassword
//       );
//       await reauthenticateWithCredential(user, credential);
//     }

//     await updatePassword(user, newPassword);

//     await logAction(user.uid, "Password Updated", "AUTH");

//     return { success: true };
//   } catch (error) {
//     throw new Error(error.message || "Password update failed");
//   }
// };