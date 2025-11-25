# Philippine Phone Number Validation

## ✅ Enhanced Phone Number Validation

The phone number field now enforces **Philippine mobile number format**!

---

## 📱 **Philippine Mobile Format:**

```
09XXXXXXXXX
```

**Requirements:**
- ✅ Must start with **09**
- ✅ Must be exactly **11 digits** total
- ✅ Only numbers allowed
- ❌ No letters
- ❌ No spaces
- ❌ No special characters (-, +, (), etc.)

---

## 🎨 **Visual Feedback (Real-Time)**

As you type, the phone input field changes color to show validity:

### **🔴 Red (Invalid Start)**
- Appears when number doesn't start with "09"
- Example: `"63917"` → Red border + light red background
- Message: Number must start with 09

### **🟠 Orange (Incomplete)**
- Appears when number starts with "09" but isn't 11 digits yet
- Example: `"0917123"` → Orange border + light yellow background
- Message: Need more digits

### **🟢 Green (Valid!)**
- Appears when format is perfect!
- Example: `"09171234567"` → Green border + light green background
- Message: Format is correct! ✓

### **⚪ Default (Empty)**
- When field is empty
- Normal border color

---

## 🎯 **Validation Rules:**

### **1. Real-Time Input Filtering:**
```javascript
// As you type:
"0917-abc-1234" → Instantly becomes "09171234"
"09 17 123 4567" → Instantly becomes "09171234567"
"+639171234567" → Instantly becomes "639171234567" (Red - doesn't start with 09)
```

### **2. Length Limit:**
```javascript
// Maximum 11 digits
"091712345678901" → Stops at "09171234567" (11 digits)
```

### **3. Submit Validation:**

When clicking "Place Order", checks:

✅ **Starts with 09?**
```
"63917XXXXX" → ❌ Error: "Phone number must start with 09"
"09171234567" → ✅ Valid
```

✅ **Exactly 11 digits?**
```
"0917123" → ❌ Error: "Phone number must be exactly 11 digits"
"09171234567" → ✅ Valid
```

✅ **Correct format?**
```
"09XXXXXXXXX" → ✅ Valid format
```

---

## 📋 **Examples:**

### ✅ **Valid Numbers:**
```
09171234567
09281234567
09191234567
09051234567
09991234567
```

### ❌ **Invalid Numbers:**

| Input | Why Invalid | What Happens |
|-------|-------------|--------------|
| `0917-123-4567` | Has dashes | Dashes removed → `09171234567` ✅ |
| `0917 123 4567` | Has spaces | Spaces removed → `09171234567` ✅ |
| `+639171234567` | Has + and wrong prefix | + removed but starts with 63 → ❌ Red |
| `09171` | Too short | Orange border, can't submit |
| `639171234567` | Doesn't start with 09 | Red border, can't submit |
| `09abc123456` | Has letters | Letters removed as you type |

---

## 🎬 **User Experience Flow:**

```
1. User clicks phone field
2. User types: "0"
   → Orange (needs more digits)

3. User types: "09"
   → Orange (still needs more)

4. User types: "0917"
   → Orange (still needs more)

5. User continues: "09171234567"
   → GREEN! ✓ Perfect format

6. User tries to type more: "091712345678"
   → Stops at 11 digits automatically

7. User clicks "Place Order"
   → ✅ Form submits successfully
```

---

## 🔧 **Technical Implementation:**

### **Function: `handlePhoneInput()`**

```javascript
// Remove non-numeric characters
let value = input.value.replace(/[^0-9]/g, '');

// Limit to 11 digits
if (value.length > 11) {
    value = value.substring(0, 11);
}

// Visual feedback
if (!value.startsWith('09')) {
    // Red border
} else if (value.length < 11) {
    // Orange border
} else {
    // Green border
}
```

### **Submit Validation in `placeOrder()`**

```javascript
// Check starts with 09
if (!shipping.phone.startsWith('09')) {
    showToast('Phone number must start with 09');
    return;
}

// Check length
if (shipping.phone.length !== 11) {
    showToast('Phone number must be exactly 11 digits');
    return;
}

// Final format check
const phoneRegex = /^09[0-9]{9}$/;
if (!phoneRegex.test(shipping.phone)) {
    showToast('Invalid phone number format');
    return;
}
```

---

## 🚀 **Testing Instructions:**

### **Test 1: Valid Number**
1. Go to checkout
2. Type in phone field: `09171234567`
3. Watch it turn **green** ✓
4. Submit form → Should work!

### **Test 2: Invalid Start**
1. Type: `63917123456`
2. Watch it turn **red** (doesn't start with 09)
3. Try to submit → Error: "Phone number must start with 09"

### **Test 3: Too Short**
1. Type: `0917123`
2. Watch it turn **orange** (incomplete)
3. Try to submit → Error: "Phone number must be exactly 11 digits"

### **Test 4: Special Characters**
1. Type: `0917-123-4567`
2. Watch dashes disappear automatically
3. Result: `09171234567` (green) ✓

### **Test 5: Character Limit**
1. Type: `091712345678901234567`
2. Watch it stop at: `09171234567` (11 digits max)
3. Field is green ✓

### **Test 6: Letters**
1. Type: `0917abc1234`
2. Watch letters disappear as you type
3. Result: `09171234` (orange - needs more digits)

---

## 📊 **Common Philippine Mobile Prefixes:**

All these are valid (as long as 11 digits total):

```
Smart: 0813, 0907, 0908, 0909, 0910, 0911, 0912, 0913, 0914, 0918, 0919, 0920, 0921, 0928, 0929, 0939, 0946, 0947, 0948, 0949, 0950, 0951, 0961, 0968, 0969, 0970, 0981, 0989, 0992, 0998, 0999

Globe: 0817, 0904, 0905, 0906, 0915, 0916, 0917, 0926, 0927, 0935, 0936, 0937, 0945, 0953, 0954, 0955, 0956, 0965, 0966, 0967, 0975, 0976, 0977, 0978, 0979, 0995, 0996, 0997

Sun: 0922, 0923, 0924, 0925, 0932, 0933, 0934, 0940, 0941, 0942, 0943, 0944

DITO: 0895, 0896, 0897, 0898, 0991, 0992, 0993, 0994
```

All follow the format: **09XXXXXXXXX** (11 digits)

---

## ✨ **Benefits:**

✅ **Prevents Invalid Numbers** - Can't submit wrong format  
✅ **Real-Time Feedback** - See validation as you type  
✅ **Color-Coded** - Red/Orange/Green shows status clearly  
✅ **Philippine Standard** - Matches actual PH mobile format  
✅ **User-Friendly** - Auto-removes invalid characters  
✅ **11-Digit Limit** - Can't enter too many digits  
✅ **Professional** - Looks polished and well-validated  

---

## 🎯 **Error Messages:**

Users will see these toast messages if they try to submit invalid numbers:

| Condition | Toast Message |
|-----------|--------------|
| Doesn't start with 09 | "Phone number must start with 09" |
| Less than 11 digits | "Phone number must be exactly 11 digits (09XXXXXXXXX)" |
| More than 11 digits | (Prevented - can't type more) |
| Wrong format | "Invalid phone number format. Use: 09XXXXXXXXX" |

---

## ✅ **Complete!**

The phone number validation is now **Philippines-compliant**!

- ✅ Must start with 09
- ✅ Must be 11 digits
- ✅ Real-time visual feedback (Red/Orange/Green)
- ✅ Auto-removes invalid characters
- ✅ Can't exceed 11 digits
- ✅ Clear error messages

**Refresh and test it!** Try typing an invalid number - watch the colors change and see how it prevents bad data! 🎉🇵🇭
