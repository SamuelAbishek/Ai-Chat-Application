// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// /*
// USER SCHEMA
// -----------
// Schema = blueprint that defines the structure, validation rules,
// and behavior of a User document.

// Model = uses this schema to interact with MongoDB.
// */

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       // trim removes spaces from beginning/end
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,

//       // Validates basic email format:
//       // something @ something . something
//       match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

//       /*
//       IMPORTANT:
//       type: String  → only checks that the value is a string
//       match        → checks email format
//       unique       → prevents duplicate emails
//                        (NOT email format validation)
//       */
//     },

//     password: {
//       type: String,
//       required: true,

//       /*
//       Password is finally stored as a bcrypt HASH,
//       not as plain text.

//       Hashing ≠ Encryption.
//       We don't decrypt the hash during login.
//       We use bcrypt.compare() instead.
//       */
//     },
//   },

//   {
//     /*
//     Automatically adds:
//       createdAt → when document was created
//       updatedAt → when document was last modified
//     */
//     timestamps: true,
//   }
// );


// /*
// PRE-SAVE MIDDLEWARE
// -------------------
// Runs BEFORE Mongoose saves the document to MongoDB.

// Flow:

// User.create()
//     ↓
// pre("save")
//     ↓
// hash password
//     ↓
// MongoDB

// IMPORTANT:
// MongoDB does NOT save the plain password first.
// The password is hashed BEFORE it is stored.
// */

// userSchema.pre("save", async function () {

//   // "this" = current User document being saved

//   // Don't hash again if password hasn't changed.
//   // Otherwise an existing hash would be hashed again.
//   if (!this.isModified("password")) {
//     return;
//   }

//   // Hash password before saving
//   // 10 = bcrypt salt rounds / cost factor
//   this.password = await bcrypt.hash(this.password, 10);
// });


// /*
// EXPORT MODEL
// ------------
// Creates the User model using userSchema.

// Controller can now use:

// User.create()
// User.findOne()
// User.findById()
// User.find()

// Flow:

// Controller
//     ↓
// User Model
//     ↓
// Mongoose
//     ↓
// MongoDB
// */

// export default mongoose.model("User", userSchema);


// /*
// IMPORTANT MISTAKES / CORRECTIONS
// --------------------------------

// 1. req is NOT directly sent by frontend.
//    → Frontend sends HTTP request.
//    → Express creates/provides req and res.

// 2. findOne() is NOT Mongoose middleware.
//    → It is a Mongoose query using the User model.

// 3. type: String does NOT validate @ in email.
//    → match validates the email format.

// 4. unique: true does NOT validate email format.
//    → It handles uniqueness/indexing.

// 5. Password is HASHED, not encrypted.
//    → bcrypt.hash() creates the hash.
//    → bcrypt.compare() checks the password during login.

// 6. pre("save") runs BEFORE MongoDB saves the document.

// 7. timestamps: true automatically creates
//    createdAt and updatedAt.
// */

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
    },

    // Only the hashed reset token is stored in MongoDB.
    passwordResetToken: {
      type: String,
      select: false,
    },

    // Token expires after 15 minutes.
    passwordResetExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("User", userSchema);