import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Shipping rate configuration
const SHIPPING_RATES = {
  // Domestic US shipping rates
  domestic: {
    standard: 'shr_1LY0yeFdJwjjFUnI1XDB8jdt', // Your existing rate
    express: 'shr_EXPRESS_RATE_ID', // Add this in Stripe dashboard
    overnight: 'shr_OVERNIGHT_RATE_ID' // Add this in Stripe dashboard
  },
  // International shipping rates (if you want to expand)
  international: {
    standard: 'shr_INTL_STANDARD_RATE_ID',
    express: 'shr_INTL_EXPRESS_RATE_ID'
  }
};

// Product weight configuration (in ounces)
const PRODUCT_WEIGHTS = {
  // Clothing items
  'tee': 6, // Standard t-shirt weight
  't-shirt': 6, // Standard t-shirt weight
  'crewneck': 16, // Crewneck sweater weight
  'hoodie': 24, // Hoodie weight
  'denim jacket': 32, // Denim jacket weight
  'crop top': 4, // Crop top weight (lighter than tee)
  'hat': 3, // Hat weight
  'shoes': 48, // Shoes weight (varies by size)

  // Accessories & small items
  'patch': 0.5, // Patch weight
  'sticker': 0.1, // Sticker weight
  'slides': 24, // Sandals/slides weight
  'sandals': 24, // Sandals weight

  // Home goods
  'mug': 12, // Mug weight
  'bowl': 8, // Bowl weight
};

// Collections that are all t-shirts (6oz each)
const TEE_COLLECTIONS = [
  'banners', 'cdb', 'remilio', 'dadbro', 'radbro',
  'miladystation', 'milad', 'mifairy', 'milily',
  'pixelady', 'aura', 'miaura', 'milaidy', 'deriv', 'bonkler'
];

// Collections that are all t-shirts except custom stickers
const MILADY_TEE_COLLECTIONS = [
  'milady' // All milady items are tees except milady *CUSTOM* sticker
];

// Calculate total weight of cart items
function calculateTotalWeight(items) {
  return items.reduce((total, item) => {
    let weight = 6; // Default to t-shirt weight (6oz)

    // Check if item is from a collection that's all t-shirts
    if (TEE_COLLECTIONS.includes(item.collection)) {
      weight = 6; // All items in these collections are t-shirts
    }
    // Check if item is from milady collection (all tees except custom stickers)
    else if (MILADY_TEE_COLLECTIONS.includes(item.collection)) {
      // Check if it's a custom sticker
      if (item.name.toLowerCase().includes('sticker') && item.name.toLowerCase().includes('custom')) {
        weight = PRODUCT_WEIGHTS['sticker']; // 0.1oz for stickers
      } else {
        weight = 6; // All other milady items are t-shirts
      }
    }
    // For other collections, determine weight by product name
    else {
      const productName = item.name.toLowerCase();

      // Check for specific product types in the name
      if (productName.includes('hoodie')) {
        weight = PRODUCT_WEIGHTS['hoodie'];
      } else if (productName.includes('crewneck')) {
        weight = PRODUCT_WEIGHTS['crewneck'];
      } else if (productName.includes('denim jacket') || productName.includes('jacket')) {
        weight = PRODUCT_WEIGHTS['denim jacket'];
      } else if (productName.includes('crop top')) {
        weight = PRODUCT_WEIGHTS['crop top'];
      } else if (productName.includes('hat')) {
        weight = PRODUCT_WEIGHTS['hat'];
      } else if (productName.includes('shoes')) {
        weight = PRODUCT_WEIGHTS['shoes'];
      } else if (productName.includes('patch')) {
        weight = PRODUCT_WEIGHTS['patch'];
      } else if (productName.includes('sticker')) {
        weight = PRODUCT_WEIGHTS['sticker'];
      } else if (productName.includes('slides') || productName.includes('sandals')) {
        weight = PRODUCT_WEIGHTS['slides'];
      } else if (productName.includes('mug')) {
        weight = PRODUCT_WEIGHTS['mug'];
      } else if (productName.includes('bowl')) {
        weight = PRODUCT_WEIGHTS['bowl'];
      } else if (productName.includes('tee') || productName.includes('t-shirt')) {
        weight = PRODUCT_WEIGHTS['tee'];
      }
      // Default to t-shirt weight for anything else
    }

    return total + (weight * item.quantity);
  }, 0);
}

        // Determine shipping options based on cart contents
        async function getShippingOptions(items) {
          const totalWeight = calculateTotalWeight(items);
          const shippingCost = calculateShippingCost(totalWeight);

          console.log(`📦 Cart weight calculation: ${totalWeight}oz`);
          console.log(`💰 Calculated shipping cost: $${(shippingCost / 100).toFixed(2)}`);
          console.log('Cart items:', items.map(item => `${item.name} (${item.collection}) x${item.quantity}`));

          // Create dynamic shipping option based on weight
          const options = [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: shippingCost, // Cost in cents
                  currency: 'usd',
                },
                display_name: `Ground Shipping (${totalWeight}oz)`,
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 10,
                  },
                },
                tax_behavior: 'exclusive', // Required when automatic_tax is enabled
              },
            },
          ];

          console.log(`🚚 Dynamic shipping option created: $${(shippingCost / 100).toFixed(2)} for ${totalWeight}oz order`);

          return options;
        }

// Calculate shipping cost based on weight (for dynamic rates)
function calculateShippingCost(weightInOunces) {
  const baseCost = 500; // $5.00 base shipping
  const weightCost = Math.ceil(weightInOunces / 8) * 200; // $2.00 per 8oz increment
  const totalCost = baseCost + weightCost;

  // Cap shipping at $15.00 to keep it reasonable
  return Math.min(totalCost, 1500);
}

stripe.applePayDomains.create({
  domain_name: 'www.nobody.clothing'
})

export default async function handler(req, res) {
  console.log('=== STRIPE API HANDLER CALLED ===');
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);

  if (req.method === 'POST') {
    try {
      console.log('=== STRIPE API DEBUG ===');
      console.log('Request body type:', typeof req.body);
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      console.log('Number of items:', req.body?.length);

      // Validate request body
      if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
        console.error('❌ Invalid request body - no items provided');
        return res.status(400).json({ error: 'No items provided in cart' });
      }

      // Validate each item
      req.body.forEach((item, index) => {
        console.log(`Item ${index}:`, {
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          sizeChoice: item.sizeChoice,
          colorChoice: item.colorChoice,
          collection: item.collection,
          hasImage: !!item.image,
          preview: item.preview,
          hasPreview: item.preview !== undefined && item.preview !== null,
          imageRef: item.image?.[item.preview]?.asset?._ref
        });

        if (!item.name || !item.price || !item.quantity) {
          console.error(`❌ Item ${index} missing required fields:`, item);
          throw new Error(`Item ${index} missing required fields`);
        }

        if (!item.image || item.preview === undefined || item.preview === null || !item.image[item.preview]?.asset?._ref) {
          console.error(`❌ Item ${index} missing image data:`, item);
          throw new Error(`Item ${index} missing image data`);
        }
      });

      const params = {
        submit_type: 'pay',
        mode: 'payment',
        allow_promotion_codes: true,
        // payment_method_types not specified - Stripe will automatically show all enabled payment methods
        // including cards and stablecoin payments (crypto) when enabled in the dashboard
        shipping_address_collection: {
          allowed_countries: ['US']
        },
        automatic_tax: {
          enabled: true
        },
        billing_address_collection: 'auto',
        shipping_options: await getShippingOptions(req.body),
        line_items: req.body.map((item, index) => {
          console.log(`Processing line item ${index}:`, item.name);

          const img = item.image[item.preview].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/yiekg475/production/').replace('-png', '.png').replace('-jpg', '.jpg');

          const lineItem = {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${item.name} ${item.sizeChoice} ${item.colorChoice} ${item.checked}`,
                metadata: {
                  size: item.sizeChoice,
                  color: item.colorChoice
                },
                images: [newImage],
                tax_code: 'txcd_99999999'
              },
              unit_amount: Math.round(item.price * 100), // Ensure integer
              tax_behavior: 'exclusive'
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: parseInt(item.quantity), // Ensure integer
          };

          console.log(`Line item ${index} created:`, {
            name: lineItem.price_data.product_data.name,
            unit_amount: lineItem.price_data.unit_amount,
            quantity: lineItem.quantity
          });

          return lineItem;
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      }

      console.log('=== STRIPE SESSION CREATION ===');
      console.log('Params being sent to Stripe:', JSON.stringify(params, null, 2));

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      console.log('✅ Stripe session created successfully:', session.id);
      res.status(200).json(session);
    } catch (err) {
      console.error('❌ STRIPE ERROR:', {
        message: err.message,
        type: err.type,
        code: err.code,
        statusCode: err.statusCode,
        raw: err.raw,
        stack: err.stack
      });

      // Return proper JSON error response
      res.status(err.statusCode || 500).json({
        error: err.message,
        type: err.type,
        code: err.code
      });
    }
  } else {
    console.log('❌ Method not allowed:', req.method);
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

// Add a global error handler for the module
process.on('uncaughtException', (error) => {
  console.error('❌ UNCAUGHT EXCEPTION in Stripe API:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ UNHANDLED REJECTION in Stripe API:', reason);
});
