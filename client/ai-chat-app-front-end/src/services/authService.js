const API_URL = `${process.env.REACT_APP_API_URL}/api/auth`;

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const updatePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/update-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const getProfile = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
/*
JWT /me AUTHENTICATION FLOW

The frontend sends a GET /me request along with the JWT token.

Frontend
   ↓
GET /me + JWT
   ↓
API Gateway
   ↓
Auth Route
   ↓
authMiddleware

The authMiddleware handles the authentication part of the request:

1. Gets the JWT from the Authorization header
2. Extracts the actual token
3. Verifies the JWT using JWT_SECRET
4. Decodes the JWT payload
5. Stores the decoded data in req.user

Example:
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded;

After this, the middleware's job is complete.

next() means:

"My middleware's required task for this request is completed.
Continue with the remaining handler(s) for this request."

Because the /me route is:

router.get("/me", authMiddleware, authController.getProfile);

after authMiddleware calls next(), Express continues to:

authController.getProfile

The getProfile controller uses the authenticated user's ID
that was added to req.user by the middleware:

req.user.id

It then uses this ID to find the user's actual details from MongoDB:

const user = await User.findById(req.user.id)
  .select("-password");

Finally, getProfile sends those user details back to the frontend:

res.status(200).json({
  message: "Authorized",
  user,
});

COMPLETE FLOW:

Frontend
   ↓
GET /me + JWT
   ↓
API Gateway
   ↓
Auth Route
   ↓
authMiddleware
   ↓
Verify JWT
   ↓
req.user = decoded
   ↓
next()
   ↓
authController.getProfile
   ↓
Use req.user.id
   ↓
Find user in MongoDB
   ↓
Get user details
   ↓
Send response
   ↓
Frontend

CORE IDEA:

authMiddleware
→ Verifies and identifies the user.

next()
→ Tells Express to continue with the remaining work for that request.

getProfile
→ Uses the verified user's ID to get their details and sends
  those details back to the frontend.

Therefore, the frontend can know:

"This is the currently authenticated user."
*/