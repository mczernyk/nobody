import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

stripe.applePayDomains.create({
  domain_name: 'www.nobody.clothing'
})

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        allow_promotion_codes: true,
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['US','SE','GB', 'HU', 'FR']
        },
        automatic_tax: {
          enabled: true
        },
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1LY0yeFdJwjjFUnI1XDB8jdt' },
          { shipping_rate: 'shr_1Lz6FpFdJwjjFUnIBBR61dIn' },
          { shipping_rate: 'shr_1Lzxo7FdJwjjFUnIPo3Ajggr' },
          { shipping_rate: 'shr_1MW3vPFdJwjjFUnIazYWy281' },
          { shipping_rate: 'shr_1N9FxiFdJwjjFUnIQVrwvxQY' }
        ],
        line_items: req.body.map((item) => {
          const img = item.image[item.preview].asset._ref;

          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/yiekg475/production/').replace('-png', '.png').replace('-jpg', '.jpg');

          return {
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
              unit_amount: item.price * 100,
              tax_behavior: 'exclusive'
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity,
            // tax_rates: ['txr_1La4CxFdJwjjFUnI6X4besxN']
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
