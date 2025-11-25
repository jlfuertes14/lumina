# 🇵🇭 Philippine Phone Number & Form Validation

## Overview
We have implemented strict validation rules for the checkout form to ensure data accuracy, specifically tailored for Philippine formats.

## ✅ Validation Rules

### 1. Phone Number (Strict)
- **Format:** Must start with `09` followed by 9 digits.
- **Length:** Exactly 11 digits.
- **Allowed Characters:** Numbers only.
- **Example:** `09171234567` (Valid) / `0917-123-4567` (Invalid - no dashes)
- **Implementation:**
  - **Input:** Prevents typing non-numeric characters.
  - **Submit:** Checks for `^09\d{9}$` regex.

### 2. Full Name, City, & Province
- **Allowed Characters:** Letters (`a-z`, `A-Z`) and spaces only.
- **Restricted:** No numbers or special characters allowed.
- **Reasoning:** Philippine cities and provinces do not contain numbers.
- **Implementation:**
  - **Input:** Real-time filtering of invalid characters.
  - **Submit:** Regex check `^[a-zA-Z\s]+$`.

### 3. Postal Code
- **Allowed Characters:** Numbers only.
- **Implementation:**
  - **Input:** Prevents typing letters or symbols.
  - **Submit:** Regex check `^\d+$`.

### 4. Required Fields
- **UI:** All required fields are marked with a **red asterisk (*)**.
- **Fields:** Full Name, Phone Number, Address, City, Province, Payment Method.

## 🛠️ Code Changes

### `main.js`

#### New Input Handlers:
```javascript
// Restricts input to letters and spaces
window.handleNameInput = (input) => { ... }
window.handleLocationInput = (input, field) => { ... }

// Restricts input to numbers only
window.handlePhoneInput = (input) => { ... }
window.handlePostalInput = (input) => { ... }
```

#### Updated `CheckoutPage`:
- Added `oninput` event listeners to all relevant fields.
- Added `<span style="color: red;">*</span>` to labels.
- Added helper text (e.g., "Must start with 09...").

#### Updated `placeOrder`:
- Added strict regex validation before processing payment.
- Shows specific toast error messages for each validation failure.

## 🧪 How to Test

1. **Phone Number:**
   - Try typing letters -> Should not appear.
   - Try typing `08...` -> Submit -> Error: "Phone number must start with 09..."
   - Try typing 10 digits -> Submit -> Error: "...contain exactly 11 digits"
   - Type `09123456789` -> Submit -> Success.

2. **Name/City/Province:**
   - Try typing numbers (e.g., "Makati 123") -> Numbers should not appear or be removed immediately.

3. **Postal Code:**
   - Try typing letters -> Should not appear.

This ensures that all customer data collected is clean, valid, and formatted correctly for Philippine logistics.
