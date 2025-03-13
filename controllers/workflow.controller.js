import dayjs from 'dayjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscription.model.js';
const REMINDERS = [7,6,4,5,3,2,1];
export const sendReminders = serve(async (context) => {
  console.log("Context : " , context)
  const { subscriptionId } = context.requestPayload;
  console.log("Subscription id : ", subscriptionId)
  const subscription = await fetchSubscription(context, subscriptionId);
  if (!subscription || subscription.status !== "active") {
    console.log("Not active subscription")
    return;
  }

  const renewalDate = dayjs(subscription.renewalDate);

  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`
    );
    return;
  }

  for(const daysBefore of REMINDERS){
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if(reminderDate.isAfter(dayjs())){
        // sleep until ready to be fired
        await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }
    await triggerReminder(context, `Reminder ${daysBefore} days before`);
  }

});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    await context.run(label, () => {})
    console.log(`Triggering ${label} reminder`);
}