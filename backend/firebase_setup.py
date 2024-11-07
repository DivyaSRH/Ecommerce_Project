# Import Firebase libraries
import firebase_admin
from firebase_admin import credentials, firestore, auth

# Replace 'path/to/serviceAccountKey.json' with the actual path to your downloaded JSON file.
cred = credentials.Certificate("C:/Users/divya/OneDrive/Documents/Ecommerce_Project/backend/electronics-e-commerce-project-firebase-adminsdk-sb0vb-c1450a8a6e.json")
firebase_admin.initialize_app(cred)

# Initialize Firestore for database access
db = firestore.client()

# Function to add a user to the Firestore database
def add_user_to_firestore(user_id, email, role):
    # Create a reference to the "users" collection and specify the document with user_id
    user_ref = db.collection("users").document(user_id)
    user_ref.set({
        "email": email,
        "role": role  # e.g., "customer" or "seller"
    })
    print(f"User {email} added to Firestore with role {role}")

# Test data to add a user
add_user_to_firestore("user123", "user@example.com", "customer")
