const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// এটি লেমন স্কুইজি থেকে পেমেন্টের সিগন্যাল রিসিভ করবে
exports.memoMamaPaymentWebhook = functions.https.onRequest(async (req, res) => {
  const event = req.body;

  // চেক করা এটি পেমেন্ট সফল হওয়ার ইভেন্ট কি না
  if (event.meta.event_name === 'order_created') {
    const userId = event.meta.custom_data.user_id; // আমাদের পাঠানো ইউজার আইডি
    const planName = event.data.attributes.variant_name; // কোন প্ল্যান কিনেছে

    const db = admin.firestore();

    try {
      // ডাটাবেসে ওই ইউজারের প্রোফাইল 'Pro' করে দেওয়া
      await db.collection("users").doc(userId).update({
        isPro: true,
        subscriptionStatus: 'active',
        planName: planName,
        lastPaymentDate: admin.firestore.FieldValue.serverTimestamp(),
        expiryDate: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) // আপাতত ৩০ দিন
      });

      console.log(`User ${userId} is now PRO!`);
      return res.status(200).send("Success");
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).send("Database Update Failed");
    }
  }

  res.status(200).send("Event ignored");
});