// Backend/Routes/UsersRouter.js
import express from "express";
import { getUsers, getUserByEmail, addUser, loginUser, upload, getUserWishlist, updateWishlist ,removeFromWishlist,} from "../Controller/UsersController.js";

const UsersRouter = express.Router();

UsersRouter.get("/", getUsers);
UsersRouter.get("/email/:emailId", getUserByEmail);
UsersRouter.post("/register", upload.single("profileImage"), addUser);
UsersRouter.post("/login", loginUser);
UsersRouter.get("/:userId/wishlist", getUserWishlist);
UsersRouter.put("/:userId/wishlist/:propertyId", updateWishlist); // 🔄 Use updateWishlist function
router.delete("/users/:userId/wishlist/:propertyId", removeFromWishlist);



// ✅ Add wishlist route
// UsersRouter.post("/wishlist/:propertyId", toggleWishlist);

export default UsersRouter;
