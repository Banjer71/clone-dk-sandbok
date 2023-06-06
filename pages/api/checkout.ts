import { callShopify, createCheckout } from '../../app/helpers/shopify';

export default async function Subscribe(req: any, res: any) {
  const { variantId } = req?.body;

  try {
    const response = await callShopify(createCheckout, {
      variantId,
    });

    const { webUrl } = response.data.checkoutCreate.checkout;

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error generating the checkoutURL. Please try again.`,
      });
    }
    return res.status(201).json({ checkoutURL: webUrl });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      error: `There was an error generating the checkoutURL. Please try again.`,
    });
  }
}