import cron from "node-cron";
import webPush from "web-push";
import Task from "../models/Task";
import Subscription from "../models/Subscription";

webPush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL}`,
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

// Hər 1 dəqiqə check et
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);

  console.log("🔍 Checking tasks...", {
    now: now.toISOString(),
    checkUntil: fiveMinutesLater.toISOString(),
  });

  // 5 dəqiqə sonra silinəcək tasks tapar
  const tasks = await Task.find({
    expiresAt: { $gte: now, $lte: fiveMinutesLater },
    notified: false,
  });

  console.log(`📦 Found ${tasks.length} tasks`);

  for (const task of tasks) {
    // Bu task-ın user-ının subscription tapar
    const subscription = await Subscription.findOne({
      userId: task.userId,
    });

    if (!subscription) continue;

    try {
      // Telefona notification göndər
      await webPush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
          },
        },
        JSON.stringify({
          title: "⚡ Task Silinmə Vaxtı Yaxın",
          body: `"${task.title}" 5 dəqiqə sonra silinəcək`,
        }),
      );

      console.log(
        `✅ Notification sent to user ${task.userId} for task: ${task.title}`,
      );

      // Notification verildi, tekrar göndərmasın
      task.notified = true;
      await task.save();
    } catch (err) {
      console.error("Notification failed:", err);
    }
  }

  // Expire olmuş tasks sil
  await Task.deleteMany({ expiresAt: { $lte: now } });
});
