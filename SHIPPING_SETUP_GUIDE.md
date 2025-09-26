# 🚚 Shipping Rates Setup Guide for Nobody Clothing

## Overview
Your Stripe integration now supports dynamic shipping rates based on product weight and cart contents. Here's how to set up the shipping rates in your Stripe dashboard.

## 📦 Product Weight Categories

### Clothing Items
- **T-shirts/Tees**: 6oz (all collections: banners, cdb, remilio, dadbro, radbro, miladystation, milad, mifairy, milily, pixelady, aura, miaura, milaidy, deriv)
- **Crewnecks**: 16oz
- **Hoodies**: 24oz
- **Denim Jackets**: 32oz
- **Crop Tops**: 4oz
- **Hats**: 3oz
- **Shoes**: 48oz

### Accessories & Small Items
- **Patches**: 0.5oz
- **Stickers**: 0.1oz (including milady *CUSTOM* sticker)
- **Slides/Sandals**: 24oz

### Home Goods
- **Mugs**: 12oz
- **Bowls**: 8oz

## 🚚 Shipping Tiers

### Light Orders (0-12oz)
- 1-2 t-shirts
- Accessories (patches, stickers)
- **Shipping Options**: Standard only

### Medium Orders (12-24oz)
- 2-4 t-shirts
- 1 hoodie
- 1 crewneck
- **Shipping Options**: Standard + Express

### Heavy Orders (24-48oz)
- 4+ t-shirts
- 2+ hoodies
- 1 denim jacket
- **Shipping Options**: Standard + Express + Overnight

### Very Heavy Orders (48oz+)
- Shoes
- Multiple heavy items
- **Shipping Options**: All options + special handling alert

## 🛠️ Stripe Dashboard Setup

### Step 1: Create Shipping Rates
Go to [Stripe Dashboard → Shipping rates](https://dashboard.stripe.com/shipping-rates) and create:

1. **Standard Shipping** (your existing rate: `shr_1LY0yeFdJwjjFUnI1XDB8jdt`)
   - Name: "Standard Shipping (5-7 business days)"
   - Cost: $5.00 (or your current rate)

2. **Express Shipping** (create new)
   - Name: "Express Shipping (2-3 business days)"
   - Cost: $12.00
   - Copy the rate ID (starts with `shr_`)

3. **Overnight Shipping** (create new)
   - Name: "Overnight Shipping (1 business day)"
   - Cost: $25.00
   - Copy the rate ID (starts with `shr_`)

### Step 2: Update Rate IDs
Replace the placeholder IDs in `pages/api/stripe.js`:

```javascript
const SHIPPING_RATES = {
  domestic: {
    standard: 'shr_1LY0yeFdJwjjFUnI1XDB8jdt', // Your existing rate
    express: 'shr_YOUR_EXPRESS_RATE_ID', // Replace with actual ID
    overnight: 'shr_YOUR_OVERNIGHT_RATE_ID' // Replace with actual ID
  }
};
```

## 🧪 Testing Examples

### Test Case 1: Single T-shirt
- **Items**: 1 dadbro custom tee
- **Weight**: 6oz
- **Expected**: Standard shipping only

### Test Case 2: Multiple T-shirts
- **Items**: 3 milady tees
- **Weight**: 18oz
- **Expected**: Standard + Express shipping

### Test Case 3: Heavy Order
- **Items**: 1 hoodie + 2 tees
- **Weight**: 36oz
- **Expected**: Standard + Express + Overnight shipping

### Test Case 4: Accessories
- **Items**: 5 stickers + 2 patches
- **Weight**: 1.5oz
- **Expected**: Standard shipping only

## 📊 Console Logging

The system now logs detailed information:
- Cart weight calculation
- Individual item weights
- Number of shipping options provided
- Special alerts for very heavy orders

Check your server console to see:
```
📦 Cart weight calculation: 18oz
Cart items: ["dadbro custom (dadbro) x1", "milady tee (milady) x2"]
🚚 Shipping options provided: 2 options for 18oz order
```

## 🔧 Customization

### Adding New Product Types
1. Add weight to `PRODUCT_WEIGHTS` object
2. Add detection logic in `calculateTotalWeight` function
3. Update shipping tiers if needed

### Adjusting Weight Thresholds
Modify the thresholds in `getShippingOptions`:
- Light: 0-12oz
- Medium: 12-24oz
- Heavy: 24-48oz
- Very Heavy: 48oz+

### International Shipping
Uncomment and configure the international shipping rates in `SHIPPING_RATES.international` when ready to expand globally.

## ✅ Next Steps

1. **Create shipping rates** in Stripe dashboard
2. **Update rate IDs** in the code
3. **Test with different cart combinations**
4. **Monitor console logs** for weight calculations
5. **Adjust pricing** based on your actual shipping costs

## 🆘 Troubleshooting

### No Shipping Options Appearing
- Check that shipping rate IDs are correct
- Verify Stripe API keys are valid
- Check server console for error messages

### Incorrect Weight Calculations
- Review product name matching logic
- Check collection assignments
- Verify weight values in `PRODUCT_WEIGHTS`

### Missing Shipping Rates
- Ensure all three shipping rates are created in Stripe
- Verify rate IDs are copied correctly
- Check that rates are active in Stripe dashboard
