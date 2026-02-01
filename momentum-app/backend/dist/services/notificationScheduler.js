"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const web_push_1 = __importDefault(require("web-push"));
const Task_1 = __importDefault(require("../models/Task"));
const Subscription_1 = __importDefault(require("../models/Subscription"));
web_push_1.default.setVapidDetails(`mailto:${process.env.VAPID_EMAIL}`, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
// Hər 1 dəqiqə check et
node_cron_1.default.schedule("* * * * *", async () => {
    const now = new Date();
    const fiveMinutesLater = new Date(now.getTime() + 5 * 60 * 1000);
    // 5 dəqiqə sonra silinəcək tasks tapar
    const tasks = await Task_1.default.find({
        expiresAt: { $gte: now, $lte: fiveMinutesLater },
        notified: false,
    });
    for (const task of tasks) {
        // Bu task-ın user-ının subscription tapar
        const subscription = await Subscription_1.default.findOne({
            userId: task.userId,
        });
        if (!subscription)
            continue;
        try {
            // Telefona notification göndər
            await web_push_1.default.sendNotification({
                endpoint: subscription.endpoint,
                keys: {
                    p256dh: subscription.keys.p256dh,
                    auth: subscription.keys.auth,
                },
            }, JSON.stringify({
                title: "⚡ Task Silinmə Vaxtı Yaxın",
                body: `"${task.title}" 5 dəqiqə sonra silinəcək`,
            }));
            console.log(`✅ Notification sent to user ${task.userId} for task: ${task.title}`);
            // Notification verildi, tekrar göndərmasın
            task.notified = true;
            await task.save();
        }
        catch (err) {
            console.error("Notification failed:", err);
        }
    }
    // Expire olmuş tasks sil
    await Task_1.default.deleteMany({ expiresAt: { $lte: now } });
});
