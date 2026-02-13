#!/bin/bash

# Base URL
API_URL="http://localhost:5050/api"

# 1. Register a User and get Token
echo "Registering User..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9876543210",
    "password": "password123",
    "profile": {
        "fullName": "Test Student",
        "age": 16,
        "classLevel": "10th"
    }
  }')

TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "Login/Registration failed. Trying to login if user already exists..."
  LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{
      "identifier": "9876543210",
      "password": "password123"
    }')
  TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
fi

echo "Token: $TOKEN"

# 2. Seed Questions (Dev only)
echo "Seeding Questions..."
curl -s -X POST "$API_URL/assessment/seed"

# 3. Fetch Questions
echo "Fetching Questions..."
QUESTIONS_RESPONSE=$(curl -s -X GET "$API_URL/assessment/questions" \
  -H "Authorization: Bearer $TOKEN")
echo $QUESTIONS_RESPONSE

# Extract Question IDs (simplified for bash check, just checking if we got data)
if [[ $QUESTIONS_RESPONSE == *"questionText"* ]]; then
  echo "Questions fetched successfully."
else
  echo "Failed to fetch questions."
  exit 1
fi

# 4. Submit Assessment
# fetching the first question ID to make a semi-valid payload would be complex in bash without jq
# So we will just try to submit with a dummy ID (or if I can extract one)
# For the purpose of this test, we just want to see if the endpoint responds.

# Let's assume we have valid IDs from the seed.
# Q1: Aptitude (Logical) -> Correct is index 2
# Q2: Interest (Artistic) -> Random index 0
# Q3: Aptitude (Logical) -> Correct is index 0

# Need to parse JSON in bash? simpler to use node script for verification if complex logic needed.
# Converting this to a node script for better handling.
