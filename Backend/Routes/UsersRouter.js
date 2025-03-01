// just_home/Backend/Routes/UsersRouter.js
// Backend/Routes/UsersRouter.js
import express from "express";
import { getUsers, getUserByEmail, addUser, loginUser, getUserWishlist, updateWishlist,updateUserProfile,upload ,removeFromWishlist,} from "../Controller/UsersController.js";

const UsersRouter = express.Router();

UsersRouter.get("/", getUsers);
UsersRouter.get("/email/:emailId", getUserByEmail);
UsersRouter.post("/register", upload.single("profileImage"), addUser);
UsersRouter.post("/login", loginUser);
UsersRouter.get("/:userId/wishlist", getUserWishlist);
UsersRouter.put("/:userId/wishlist/:propertyId", updateWishlist); // 🔄 Use updateWishlist function
UsersRouter.delete("/users/:userId/wishlist/:propertyId", removeFromWishlist);
UsersRouter.put("/update/:userId", upload.single("profileImage"), updateUserProfile);




// ✅ Add wishlist route
// UsersRouter.post("/wishlist/:propertyId", toggleWishlist);

export default UsersRouter;
