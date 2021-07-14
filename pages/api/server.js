// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Cors from "cors";
const stripe = require("stripe")(
  "sk_test_51IOJ4cDP76eqBtD9qoBIyjmlE1w4sYWLllruh51SM1NB5vzdbmWgrZHMVG3K1VY1TH1ptq1FN4JxMFBGbWghecDW003NxAUHGo"
);
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
const cors = Cors({
  methods: ["GET", "POST", "HEAD"],
});

export default async (req, res) => {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case "GET":
      res.status(200).send("Hello world");
      break;
    case "POST":
      const total = req.query.total;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
      });
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
};
